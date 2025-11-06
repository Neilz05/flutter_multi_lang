import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SipEtisalatComponent extends Component {
    @service intl;

    @tracked AddressMsg = "";
    @tracked PortMsg = "";

    @action
    validateAddress(event) {
        let addr = event.target.value;
        let validIPv4 = this.validateIPv4Addr(addr);
        let validIPv6 = this.validateIPv6Addr(addr);
        let validDomain = this.validateDomainName(addr);

        if(addr === "") {
            this.AddressMsg = "";
        } else {
            if (!validIPv4 && !validIPv6 && !validDomain) {
                this.AddressMsg = this.intl.t('PAGE_PHONE_SETTINGS_IMS_SERVER_SIP_INVALID_ADDRESS');
            } else {
                this.AddressMsg = "";
            }
        }

        const hasErrors = this.AddressMsg.trim() !== '';
        this.args.onError?.(hasErrors);

        return this.AddressMsg;
    }

    validateIPv4Addr(ip) {
        const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipv4Regex.test(ip) && ip !== '0.0.0.0';
    }

    validateIPv6Addr(ip) {
        const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1|::|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})$/;
        return ipv6Regex.test(ip);
    }

    validateDomainName(domainName) {
        const domainRegex = /^(?!:\/\/)(?=.{1,253}$)(?!.*[-]{2,})([a-zA-Z0-9][-a-zA-Z0-9]{0,62}\.)+[a-zA-Z]{2,}$/;
        return domainRegex.test(domainName);
    }

    @action
    validatePort(event) {
        let port = event.target.value;

        if(port === "") {
            this.PortMsg = "";
        } else {
            port = parseInt(port,10);

            if (port >= 0 && port <= 65535) {
                this.PortMsg = "";
            } else {
                this.PortMsg = this.intl.t('PAGE_PHONE_SETTINGS_IMS_SERVER_SIP_INVALID_PORT');
            }
        }

        const hasErrors = this.PortMsg.trim() != '';
        this.args.onError?.(hasErrors);

        return this.PortMsg;
    }
}