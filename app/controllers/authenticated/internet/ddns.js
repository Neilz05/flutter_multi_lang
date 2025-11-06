import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedSecurityDDNSController extends Controller {
    @service intl;
    @service eaactrl;

    @tracked DomainNameMsg = "";
    @tracked UserNameMsg = "";
    @tracked PasswordMsg = "";
    priorityDomains = [];
    domains = [
        'dtdns.com',
        'DynDNS.org',
        'no-ip.com',
        'changeip.com',
        'tzo.com',
        'easydns.com',
    ];

    get ddnsEnable() {
        let ret = false;
        this.model.Client.forEach((client, index) => {
            if (index == 0) {
                ret = client.get('Enable') == 1 ? true : false;
            }
        });
        return ret;
    }

    set ddnsEnable(value) {
        this.model.Client.forEach((client, index) => {
            if (index == 0) {
                client.set('Enable', value ? 1 : 0);
            }
        });
    }

    /* Run this first to populate lowercase array  */
    get sortedServerPriority() {
        this.priorityDomains = this.domains.map(obj => obj.toLowerCase());
        console.log('prio:', this.priorityDomains);
        return [...this.model.Server.filter(obj => this.priorityDomains.includes(obj.ServiceName))];
    }

    get sortedServerNonPriority() {
        return [...this.model.Server.filter(obj => !this.priorityDomains.includes(obj.ServiceName))];
    }

    @action
    updateServer(event) {
        this.model.Client.forEach((client, index) => {
            if (index == 0) {
                const lastDotIdx = event.target.value.lastIndexOf('.'); // delete trailing '.'
                client.set('Server', event.target.value.slice(0, lastDotIdx));
            }
        });
    }

    get hasChanges() {
        let isDirty = false;

        if (this.DomainNameMsg || this.UserNameMsg || this.PasswordMsg) {
            return isDirty;
        }

        this.model.Client.forEach((client, index) => {
            if (index == 0) {
                if (client.hasDirtyAttributes) {
                    isDirty = true;
                }
                client.Hostname.forEach((hostname, i) => {
                    if (i == 0) {
                        if (hostname.hasDirtyAttributes) {
                            isDirty = true;
                        }
                    }
                });
            }
        });

        return isDirty;
    } 

    @action
    updateDdns() {
        this.model.Client.forEach((client, index) => {
            if (index == 0) {
                if (client.hasDirtyAttributes) {
                    client.save().then(() => {
                        
                    });
                }
                client.Hostname.forEach((hostname, i) => {
                    if (i == 0) {
                        if (hostname.hasDirtyAttributes) {
                            hostname.save().then(() => {
                                
                            });
                        }
                    }
                });
            }
        });
    }

    @action
    cancelDdns() {
        this.model.Client.forEach((client, index) => {
            if (index == 0) {
                if (client.hasDirtyAttributes) {
                    client.rollbackAttributes();
                }

                client.Hostname.forEach((hostname, i) => {
                    if (i == 0) {
                        if (hostname.hasDirtyAttributes) {
                            hostname.rollbackAttributes();
                        }
                    }
                });
            }

            this.DomainNameMsg = "";
            this.UserNameMsg = "";
            this.PasswordMsg = "";
        });
    }

    @action
    validDomainName(event) {
        let name = event.target.value;

        if(name === "") {
            this.DomainNameMsg = this.intl.t('PAGE_DDNS_DOMAIN_NAME_ERROR');
        } else {
            var regex = /^(?!.*[&"'\/\\\[\]\(\);:|=,+*?<>\s])(?=.{1,255}$)(?:(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+(?!-)[a-zA-Z]{2,63}(?<!-)$/;;

            if(regex.test(name)) {
                this.DomainNameMsg = "";
            } else {
                console.log("invalid domain name");
                this.DomainNameMsg = this.intl.t('PAGE_DDNS_DOMAIN_NAME_ERROR');
            }
        }

        return this.DomainNameMsg;
    }

    @action
    validUserName(event) {
        let username = event.target.value;

        if(username === "") {
            this.UserNameMsg = this.intl.t('PAGE_DDNS_ACCOUNT_ERROR');
        } else {
            var regex = /^(?!.*[&"'\/\\\[\]\(\);:\|=,+*\?<>])[\x21-\x7E]{1,60}$/;

            if(regex.test(username)) {
                this.UserNameMsg = "";
            } else {
                this.UserNameMsg = this.intl.t('PAGE_DDNS_ACCOUNT_ERROR');
            }
        }

        return this.UserNameMsg;
    }

    @action
    validPassword(event) {
        let pass = event.target.value;

        if(pass === "") {
            this.PasswordMsg = this.intl.t('PAGE_DDNS_PASSWORD_ERROR');
        } else {
            var regex = /^(?!.*[&"'\/\\\[\]\(\);:\|=,+*\?<>])[\x21-\x7E]{1,60}$/;

            if(regex.test(pass)) {
                this.PasswordMsg = "";
            } else {
                this.PasswordMsg = this.intl.t('PAGE_DDNS_PASSWORD_ERROR');
            }
        }

        return this.PasswordMsg;
    }
}