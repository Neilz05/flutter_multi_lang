import Component from '@glimmer/component';
import { get, set } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { max } from '@ember/object/computed';

export default class NetworkGuestDhcpComponent extends Component {
    @service store;
    @service intl;
    @service eaactrl;

    componentId = this.eaactrl.getRandomString(16);

    get componentId() {
        return this.componentId;
    }
    
    get guestDhcpEnabled() {
        return this.args.server.get('Pool').findBy('Alias', 'guest').get('Enable') == 1 ? true : false;
    }

    @action
    inputIsNumber(input) {
        const regex = /^\d+$/;
        return regex.test(input);
    }

    @action
    setMaxAddr(id, index) {
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
        let dhcpServPool = this.store.peekAll('dhcpv4-server-pool').findBy('Alias', 'guest');
        if (dhcpServPool) set(dhcpServPool, 'MaxAddress', ipAddr);

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

            let ipAddress = this.store.peekAll('ip-interface').findBy('Alias', 'guest');
            if (ipAddress) {
                ipAddress.IPv4Address.forEach(ipv4 => {
                    if (ipv4.Alias === 'guest') {
                        let ipv4Addr = get(ipv4, 'IPAddress');
                        let ipv4Parts = ipv4Addr.split('.');
                        ipv4Parts[ind] = octet;
                        set(ipv4, 'IPAddress', ipv4Parts.join('.'));
                    }
                });
            }
        }
    }

    @action
    setMinAddr(id, index) {
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
        let dhcpServPool = this.store.peekAll('dhcpv4-server-pool').findBy('Alias', 'guest');
        if (dhcpServPool) set(dhcpServPool, 'MinAddress', ipAddr);

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
            
            let maxAddress = this.args.server.get('Pool').findBy('Alias', 'guest').get('MaxAddress');
            maxAddress = maxAddress.split('.');
            maxAddress[ind] = octet;
            maxAddress = maxAddress.join('.');
            this.args.server.get('Pool').findBy('Alias', 'guest').set('MaxAddress', maxAddress);

            let ipAddress = this.store.peekAll('ip-interface').findBy('Alias', 'guest');
            if (ipAddress) {
                ipAddress.IPv4Address.forEach(ipv4 => {
                    if (ipv4.Alias === 'guest') {
                        let ipv4Addr = get(ipv4, 'IPAddress');
                        let ipv4Parts = ipv4Addr.split('.');
                        ipv4Parts[ind] = octet;
                        set(ipv4, 'IPAddress', ipv4Parts.join('.'));
                    }
                });
            }
        }
    }

    @action
    updateSelection(event) {
        let dhcpServPool = this.store.peekAll('dhcpv4-server-pool').findBy('Alias', 'guest');
        if (dhcpServPool) {
            dhcpServPool.set('LeaseTime', parseInt(event.target.value));
        }
    }
}
