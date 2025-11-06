import Component from '@glimmer/component';
import { get, set } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NetworkGuestNetworkComponent extends Component {
    @service store;
    @service intl;
    @service eaactrl;
    @tracked octet3 = '';
    @tracked originalDhcpServerEnable = 0;

    componentId = this.eaactrl.getRandomString(16);

    get componentId() {
        return this.componentId;
    }
    
    get dhcpServerEnable() {
        return this.args.server.get('Pool').findBy('Alias', 'guest').get('Enable') == 1 ? true : false;
    }

    set dhcpServerEnable(enable) {
        this.args.server.get('Pool').then((pool) => {
            if (enable) {
                this.args.server.set('Enable', 1);
            } else {
                if (!this.args.server.get('hasDiryAttributes')) this.originalDhcpServerEnable = this.store.peekRecord('dhcpv4-server', 'DHCPv4.Server.').Enable;
                if (!this.originalDhcpServerEnable) this.args.server.set('Enable', 0);
            }
            pool.findBy('Alias', 'guest').set('Enable', enable ? 1 : 0);
        });
    }

    @action
    loadDhcpServer() {
        this.originalDhcpServerEnable = this.store.peekRecord('dhcpv4-server', 'DHCPv4.Server.').Enable;
    }

    @action
    inputIsNumber(input) {
        const regex = /^\d+$/;
        return regex.test(input);
    }

    @action
    setIpAddr(id, index) {
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
        if(ipAddr.split('.').at(-1) == 0){
            invalidIp = true;
        }

        if (invalidIp) {
            document.getElementById(`${id}ErrMsg`).innerText = this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_IP_ADDRESS_INVALID");
        } else {
            // if there was previous error, remove it
            for (let i = 0; i < 4; i++) {
                let input = document.getElementById(`${id}-${i + 1}`);
                if (input) input.classList.remove('is-invalid');
            }
            document.getElementById(`${id}ErrMsg`).innerText = "";
        }

        // modify the IP address in the store
        let ipIface = this.store.peekAll('ip-interface').findBy('Alias', 'guest');
        if (ipIface) {
            ipIface.IPv4Address.forEach(ipv4 => {
                if (ipv4.Alias === 'guest') {
                    set(ipv4, 'IPAddress', ipAddr);
                }
            });
        }

        /*
            If octets 1 to 3 are modified, update the corresponding octet in
            Local DNS server, IP router, Address Pool Start IP and End IP
        */
        if (index < 4) {
            let ind = parseInt(index, 10) - 1;
            let octet = ipAddr.split('.')[ind];

            let localDns = this.args.server.get('Pool').findBy('Alias', 'guest').get('DNSServers');
            localDns = localDns.split('.');
            localDns[ind] = octet;
            localDns = localDns.join('.');
            this.args.server.get('Pool').findBy('Alias', 'guest').set('DNSServers', localDns);

            let ipRouter = this.args.server.get('Pool').findBy('Alias', 'guest').get('IPRouters');
            ipRouter = ipRouter.split('.');
            ipRouter[ind] = octet;
            ipRouter = ipRouter.join('.');
            this.args.server.get('Pool').findBy('Alias', 'guest').set('IPRouters', ipRouter);

            let minAddress = this.args.server.get('Pool').findBy('Alias', 'guest').get('MinAddress');
            minAddress = minAddress.split('.');
            minAddress[ind] = octet;
            minAddress = minAddress.join('.');
            this.args.server.get('Pool').findBy('Alias', 'guest').set('MinAddress', minAddress);

            let maxAddress = this.args.server.get('Pool').findBy('Alias', 'guest').get('MaxAddress');
            maxAddress = maxAddress.split('.');
            maxAddress[ind] = octet;
            maxAddress = maxAddress.join('.');
            this.args.server.get('Pool').findBy('Alias', 'guest').set('MaxAddress', maxAddress);
        }      
    }

    @action
    setSubnetMask(id, index) {
        console.log('id:',id,'index',index)
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
        // modify the Subnet Mask in the store
        let ipIface = this.store.peekAll('ip-interface').findBy('Alias', 'guest');
        if (ipIface) {
            ipIface.IPv4Address.forEach(ipv4 => {
                if (ipv4.Alias === 'guest') {
                    set(ipv4, 'SubnetMask', ipAddr);
                }
            });
        }
    }
}
