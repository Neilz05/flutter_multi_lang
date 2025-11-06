import Component from '@glimmer/component';
import { get, set } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { max } from '@ember/object/computed';
import { parse } from 'uuid';

export default class NetworkHomeNetworkComponent extends Component {
    @service store;
    @service intl;
    @service eaactrl;
    @tracked octet3 = '';
    @tracked lanIP = '';
    @tracked serverOne = '';
    @tracked serverTwo = '';
    @tracked originalServers = '';
    @tracked ipcp = this.store.peekRecord('dhcpv4-server-pool', 'DHCPv4.Server.Pool.1.');
    lowerLayersId = '';
    @tracked originalDhcpServerEnable = 0;

    componentId = this.eaactrl.getRandomString(16);

    get componentId() {
        return this.componentId;
    }
    
    @action
    getDnsProxyStatus() {
        this.originalServers = this.ipcp.DNSServers;
    }

    get componentId() {
        return this.componentId;
    }
    get dnsProxyEnable() {
        return this.ipcp.DNSServers === this.lanIP;
    }
    
    set dnsProxyEnable(enable) {
        if (!this.ipcp.get('hasDirtyAttributes')) {
            this.originalServers = this.ipcp.DNSServers;
        }
        if (enable) {
            set(this.ipcp, 'DNSServers', this.lanIP);
        } else {
            set(this.ipcp, 'DNSServers', this.originalServers+',');
            if (this.ipcp.get('hasDirtyAttributes')) {
                set(this.ipcp, 'DNSServers', this.originalServers.includes(',') ? this.originalServers : this.originalServers+',');
            }
        }
    }

    get dhcpServerEnable() {
        return this.args.server.get('Pool').findBy('Alias', 'lan').get('Enable') == 1 ? true : false;
    }

    set dhcpServerEnable(enable) {
        this.args.server.get('Pool').then((pool) => {
            if (enable) {
                this.args.server.set('Enable', 1);
            } else {
                if (!this.args.server.get('hasDiryAttributes')) this.originalDhcpServerEnable = this.store.peekRecord('dhcpv4-server', 'DHCPv4.Server.').Enable;
                if (!this.originalDhcpServerEnable) this.args.server.set('Enable', 0);
            }
            pool.findBy('Alias', 'lan').set('Enable', enable ? 1 : 0);
        });
    }

    @action
    loadDhcpServer() {
        this.originalDhcpServerEnable = this.store.peekRecord('dhcpv4-server', 'DHCPv4.Server.').Enable;
    }

    @action
    getIpAddressFromLogical(lowerlayers) {
        let id = lowerlayers.replace("Device.", "");
        this.lowerLayersId = id;
        let ipIface = this.store.peekRecord('ip-interface', id);
        let ipv4Addr = ipIface.IPv4Address.find(ipv4 => {
            if (ipv4.Alias === 'lan') {
                return ipv4;
            }
        });
        if (ipv4Addr) {
            this.lanIP = ipv4Addr.IPAddress;
            return ipv4Addr.IPAddress;
        }
        return '';
    }

    @action
    getSubnetMaskFromLogical(lowerlayers) {
        let id = lowerlayers.replace("Device.", "");
        let ipIface = this.store.peekRecord('ip-interface', id);
        let ipv4Addr = ipIface.IPv4Address.find(ipv4 => {
            if (ipv4.Alias === 'lan') {
                return ipv4;
            }
        });
        if (ipv4Addr) {
            return ipv4Addr.SubnetMask;
        }
        return '';
    }

    @action
    inputIsNumber(input) {
        const regex = /^\d+$/;
        return regex.test(input);
    }

    @action
    setIpAddr(id, index) {
        let invalidIp = false;
        let conflictGuestIp = false;
        let ipAddr = "";
        
        for (let i = 0; i < 4; i++) {
            let input = document.getElementById(`${id}-${i + 1}`);
            if (input && ((parseInt(input.value) > 255) || (parseInt(input.value) < 0) || !this.inputIsNumber(input.value))) {
                invalidIp = true;
                input.classList.add('is-invalid');
                input.style.backgroundImage = 'none';
            }
            if (i < 3) ipAddr += input.value + '.';
            else ipAddr += input.value;
        }
        
        if(ipAddr.split('.').at(-1) == 0){
            invalidIp = true;
        }
        // Check if the IP address conflicts with the guest network
        if (ipAddr.includes("192.168.2.")) {
            conflictGuestIp = true;
        }

        if (invalidIp) {
            document.getElementById(`${id}ErrMsg`).innerText = this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_IP_ADDRESS_INVALID");
        } else if (conflictGuestIp) {
            document.getElementById(`${id}ErrMsg`).innerText = this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_IP_ADDRESS_CONFLICT"); 
        } else {
            // if there was previous error, remove it
            for (let i = 0; i < 4; i++) {
                let input = document.getElementById(`${id}-${i + 1}`);
                if (input) input.classList.remove('is-invalid');
            }
            document.getElementById(`${id}ErrMsg`).innerText = "";
        }

        // modify the IP address in the store
        let ipIface = this.store.peekRecord('ip-interface', this.lowerLayersId);
        if (ipIface) {
            let ipv4Addr = ipIface.IPv4Address.find(ipv4 => ipv4.Alias === 'lan');
            if (ipv4Addr) {
                set(ipv4Addr, 'IPAddress', ipAddr);
            } else {
                console.error("IPv4 address with alias 'lan' not found.");
            }
        }

        /*
            If octets 1 to 3 are modified, update the corresponding octet in
            Local DNS server, IP router, Address Pool Start IP and End IP
        */
        if (index < 4) {
            let ind = parseInt(index, 10) - 1;
            let octet = ipAddr.split('.')[ind];

            let localDns = this.args.server.get('Pool').findBy('Alias', 'lan').get('DNSServers');
            localDns = localDns.split('.');
            localDns[ind] = octet;
            localDns = localDns.join('.');
            this.args.server.get('Pool').findBy('Alias', 'lan').set('DNSServers', localDns);

            let ipRouter = this.args.server.get('Pool').findBy('Alias', 'lan').get('IPRouters');
            ipRouter = ipRouter.split('.');
            ipRouter[ind] = octet;
            ipRouter = ipRouter.join('.');
            this.args.server.get('Pool').findBy('Alias', 'lan').set('IPRouters', ipRouter);

            let minAddress = this.args.server.get('Pool').findBy('Alias', 'lan').get('MinAddress');
            minAddress = minAddress.split('.');
            minAddress[ind] = octet;
            minAddress = minAddress.join('.');
            this.args.server.get('Pool').findBy('Alias', 'lan').set('MinAddress', minAddress);

            let maxAddress = this.args.server.get('Pool').findBy('Alias', 'lan').get('MaxAddress');
            maxAddress = maxAddress.split('.');
            maxAddress[ind] = octet;
            maxAddress = maxAddress.join('.');
            this.args.server.get('Pool').findBy('Alias', 'lan').set('MaxAddress', maxAddress);
        }
    }

    @action
    setWanServer(id, index, event) {
        let invalidIp = false;
        let ipAddr = '';
				let isAbleToBlank = (id == 'wanServer-2');
				
				for (let i = 0; i < 4; i++) {
            let input = document.getElementById(`${id}-${i + 1}`);
            if (input && ((parseInt(input.value) > 255) || (parseInt(input.value) < 0) || !this.inputIsNumber(input.value))) {
                invalidIp = true;
                input.classList.add('is-invalid');
                input.style.backgroundImage = 'none';
            }
            if (i < 3) ipAddr += input.value + '.';
            else ipAddr += input.value;
        }
				if (ipAddr == '...') ipAddr = '';

        /* Should NOT match router's IP */
        if (ipAddr === this.lanIP) {
            invalidIp = true;
            for (let i = 0; i < 4; i++) {
                let input = document.getElementById(`${id}-${i + 1}`);
                input.classList.add('is-invalid');
                input.style.backgroundImage = 'none';
            }
        } 
				if (ipAddr === '') {
					if (isAbleToBlank){	
							invalidIp = false;
					}else{
            invalidIp = true;
            for (let i = 0; i < 4; i++) {
                let input = document.getElementById(`${id}-${i + 1}`);
                input.classList.add('is-invalid');
                input.style.backgroundImage = 'none';
            }
					}
        } 

        /* All octets should be complete */


        if (invalidIp) {
            document.getElementById(`${id}ErrMsg`).innerText = this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_WAN_SERVER_INVALID");
        } else {
            // if there was previous error, remove it
            for (let i = 0; i < 4; i++) {
                let input = document.getElementById(`${id}-${i + 1}`);
                if (input) input.classList.remove('is-invalid');
            }
            document.getElementById(`${id}ErrMsg`).innerText = "";
        }
				
        const ipcp = this.store.peekRecord('dhcpv4-server-pool', 'DHCPv4.Server.Pool.1.');
        const servers = this.ipcp.DNSServers?.split(',').map(ws => ws.trim());
				
				let ipStr = '';

        if (id === 'wanServer-1') {
            this.serverOne = ipAddr;
						
						ipStr = (this.serverOne ? this.serverOne : servers[0] ? servers[0] : '') + ',' + (this.serverTwo ? this.serverTwo : servers[1] ? servers[1] : '');
        } else if (id === 'wanServer-2') {
            this.serverTwo = ipAddr;
						
						ipStr = servers[0] + ',' + this.serverTwo;
        }

        //const splitServerOne = this.serverOne.split('.');
        //const splitServerTwo = this.serverTwo.split('.');
        // if (splitServerOne.length === 4 && splitServerTwo.length === 4 && this.checkIpAddrComplete(splitServerOne) && this.checkIpAddrComplete(splitServerTwo)) {
            set(ipcp, 'DNSServers', ipStr);
        // }
    }

    checkIpAddrComplete(arr) {
        let isNotEmpty = true;
        arr.forEach((elem) => {
            if (elem === '') isNotEmpty = false;
        })
        return isNotEmpty;
    }

    get getWanServerIpAddressOne() {
        if (!this.ipcp) return '';
        const servers = this.ipcp.DNSServers?.split(',').map(ws => ws.trim());
        this.serverOne = servers[0] || ''
        return servers[0] || '';
    }

    get getWanServerIpAddressTwo() {
        if (!this.ipcp) return '';
        const servers = this.ipcp.DNSServers?.split(',').map(ws => ws.trim());
        this.serverTwo = servers[1] || ''
        return servers[1] || '';
    }

    @action
    setSubnetMask(id, index) {
        let invalidIp = false;
        let ipAddr = "";
        
        for (let i = 0; i < 4; i++) {
            let input = document.getElementById(`${id}-${i + 1}`);
            if (input && ((parseInt(input.value) > 255) || (parseInt(input.value) < 0) || !this.inputIsNumber(input.value))) {
                invalidIp = true;
                input.classList.add('is-invalid');
                input.style.backgroundImage = 'none';
            }
            if (i < 3) ipAddr += input.value + '.';
            else ipAddr += input.value;
        }

        if (invalidIp) {
            document.getElementById(`${id}ErrMsg`).innerText = this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_SUBNET_MASK_INVALID");
        } else {
            // if there was previous error, remove it
            for (let i = 0; i < 4; i++) {
                let input = document.getElementById(`${id}-${i + 1}`);
                if (input) input.classList.remove('is-invalid');
            }
            document.getElementById(`${id}ErrMsg`).innerText = "";
        }

        // modify the IP address in the store
        let ipIface = this.store.peekRecord('ip-interface', this.lowerLayersId); 
        if (ipIface) {
            let ipv4Addr = ipIface.IPv4Address.find(ipv4 => ipv4.Alias === 'lan');
            if (ipv4Addr) {
                set(ipv4Addr, 'SubnetMask', ipAddr);
            } else {
                console.error("IPv4 address with alias 'lan' not found.");
            }
        }
    }
}
