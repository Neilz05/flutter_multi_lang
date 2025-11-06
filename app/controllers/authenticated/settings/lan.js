import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

export default class AuthenticatedNetworkLanController extends Controller {
    @tracked errorCode = null;
    @service session;
    @service store;
    @service api;
    @service eaactrl;
    @service intl;
    @tracked child = null;
    @tracked homedhcpComponent = null;
    @tracked guestdhcpComponent = null;
    @tracked errMessages = [];

    get dnsRelayEnabled() {
        return this.model.dns.get('Relay.Enable') == 1 ? true : false;
    }
    set dnsRelayEnabled(value) {
        set(this.model.dns, 'Relay.Enable', value ? 1 : 0);
    }
    get dhcpv4ServerEnabled() {
        return this.model.dhcpv4.get('Server.Enable') == true ? 1 : 0;
    }
    set dhcpv4ServerEnabled(value) {
        set(this.model.dhcpv4, 'Server.Enable', value ? 1 : 0);
    }

    @tracked staticDhcp = this.model.dhcpv4.Server.get('Pool').findBy('Alias', 'lan').StaticAddress;

    @action
    registerHomeDhcpComponent(component) {
        this.set('homedhcpComponent', component);
    }

    @action
    registerGuestDhcpComponent(component) {
        this.set('guestdhcpComponent', component);
    }

    @action
    async addStaticAddr() {
        let url = '/commands';
        try {
            let response = await this.api.customFetch(url, {
                method: "post",
                body: JSON.stringify({
                    command: "Device.DHCPv4.Server.Pool.lan.StaticAddress.+",
                    
                    commandKey: "",
                    sendresp: true,
                    inputArgs: {
                        isRelay: false
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Add new Static DHCP address error! status: ${response.status}`);
            }
            // this.refresh();
            
            /*let result = await response.json();
            if(result[0].failure.errcode ) {
              this.errorCode = result[0].failure.errcode;
            } else {
              console.log('WPS 5G pairing successful');
            }*/
        } catch (error) {
            console.error('Error in adding new Static DHCP address:', error);
            this.errorCode = error.message;
        }
    }

    get hasChanges() {
        let isDirty = false;

        this.model.ip.Interface.forEach((iface) => {
            if ((iface.Alias == "lan") || (iface.Alias == "guest")) {
                iface.IPv4Address.forEach((ipv4addr, ind) => {
                    if (ind == 0) {
                        if (ipv4addr.hasDirtyAttributes) {
                            isDirty = true;
                        }
                    }
                });
            }
        });
        /*this.model.pppinterface.forEach((iface) => {
            if ((iface.Alias == "wan")) {
                if (iface.IPCP.get('hasDirtyAttributes')) {
                    isDirty = true;
                }
            }
        });*/
        if (this.model.dns.Relay.get('hasDirtyAttributes')) {
            isDirty = true;
        }
        if (this.model.dhcpv4.Server.get('hasDirtyAttributes')) {
            isDirty = true;
        }
        this.model.dhcpv4.Server.get('Pool').forEach((pool) => {
            if ((pool.Alias == "lan") || (pool.Alias == "guest")) {
                if (pool.get('hasDirtyAttributes')) {
                    isDirty = true;
                }
                pool.StaticAddress.forEach((staticAddr) => {
                    if (staticAddr.get('hasDirtyAttributes')) {
                        isDirty = true;
                    }
                });
            }else if ((pool.Alias == "wan")) {
                if (pool.get('hasDirtyAttributes')) {
                    isDirty = true;
                }
            }
        });

        return isDirty || this.homedhcpComponent?.hasChanges || this.guestdhcpComponent?.hasChanges;
    }

    getIpByAlias(model,alias) {
        let iface = model.findBy('Alias', alias);
        let ipv4 = iface?.get('IPv4Address').findBy('Alias', alias);
        return ipv4?.get('IPAddress') || null;
    }

    getSubnetMaskByAlias(model,alias) {
        let iface = model.findBy('Alias', alias);
        let ipv4 = iface?.get('IPv4Address').findBy('Alias', alias);
        return ipv4?.get('SubnetMask') || null;
    }
    
    ipToInt(ip) {
        return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
    }

    intToIp(int) {
        return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(".");
    }

    isInSubnet(ip, routerIp, mask) {
        const ipInt = this.ipToInt(ip);
        const routerInt = this.ipToInt(routerIp);
        const maskInt = this.ipToInt(mask);

        return (ipInt & maskInt) === (routerInt & maskInt);
    }

    isSpecialCaseIp(ip) {
        const parts = ip.split('.');
        if (parts.length !== 4) return false;
        const octets = parts.map(Number);
        if (octets.some(o => isNaN(o) || o < 0 || o > 255)) return false;
        const [a, b] = octets;
        // Special or reserved ranges
        if (a === 0) return true;                       // 0.0.0.0/8 (unspecified)
        if (a === 127) return true;                     // 127.0.0.0/8 (loopback)
        if (a === 169 && b === 254) return true;        // 169.254.0.0/16 (link-local/APIPA)
        if (a >= 224 && a <= 239) return true;          // 224.0.0.0/4 (multicast)
        if (a >= 240 && a <= 255) return true;          // 240.0.0.0/4 (reserved/future use)
        if (ip === '255.255.255.255') return true;      // broadcast
        return false;
    }

    validateIP(routerIp, mask, startIp, endIp) {
        const router = this.ipToInt(routerIp);
        const start = this.ipToInt(startIp);
        const end = this.ipToInt(endIp);
        const maskInt = this.ipToInt(mask);

        const network = (router & maskInt) >>> 0;
        const broadcast = (network | (~maskInt >>> 0)) >>> 0;
        const firstUsable = (network + 1) >>> 0;
        const lastUsable = (broadcast - 1) >>> 0;

        if (router === network) return this.intl.t("PAGE_SETTINGS_LAN_ROUTER_IP_IS_INVALID");
        if (router === broadcast) return this.intl.t("PAGE_SETTINGS_LAN_ROUTER_IP_IS_INVALID");
        if (this.isSpecialCaseIp(routerIp)) {
            return this.intl.t("PAGE_SETTINGS_LAN_ROUTER_IP_IS_INVALID");
        }

        if (!this.isInSubnet(routerIp, routerIp, mask)) return this.intl.t("PAGE_SETTINGS_LAN_ROUTER_IP_IS_INVALID");
        if (!this.isInSubnet(startIp, routerIp, mask)) return this.intl.t("PAGE_SETTINGS_LAN_STARTING_POOL_IS_INVALID");
        if (!this.isInSubnet(endIp, routerIp, mask)) return this.intl.t("PAGE_SETTINGS_LAN_ENDING_POOL_IS_INVALID");
        if (start < firstUsable || end > lastUsable) {
            return this.intl.t("PAGE_SETTINGS_LAN_IP_RANGE_IS_INVALID").replace('%s1', this.intToIp(firstUsable)).replace('%s2', this.intToIp(lastUsable));
        }
        if (start > end || this.intToIp(start) == routerIp || this.intToIp(end) == routerIp) {
            return this.intl.t("PAGE_SETTINGS_LAN_INVALID_ADDRESS_POOL");
        }
        return "valid";
    }

    validateWanServer() {
        const lowerlayers = this.model.logicalInterface.findBy('Alias', 'lan').get('LowerLayers');
        let id = lowerlayers.replace("Device.", "");
        let ipIface = this.store.peekRecord('ip-interface', id);
        const realLanIp = ipIface.IPv4Address.findBy('Alias', 'lan').IPAddress;

        const dnsservers = this.store.peekRecord('dhcpv4-server-pool', 'DHCPv4.Server.Pool.1.').DNSServers;
        const dnsserverssplit = dnsservers.split(',');
        if (dnsservers === realLanIp+',') return this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_WAN_SERVER_SAME_AS_ROUTER");
        /*for (const dns of dnsserverssplit) {
            if (dns === '') {
                return this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_WAN_SERVER_NEEDS_TWO");
            }
        }*/
        return "valid";
    }

    @action
    checkValidLanSettings() {
        this.errMessages = [];

        let homeStartIp = this.model.dhcpv4.Server.get('Pool').findBy('Alias', 'lan').get('MinAddress');
        let homeEndIp = this.model.dhcpv4.Server.get('Pool').findBy('Alias', 'lan').get('MaxAddress');
        let guestStartIp = this.model.dhcpv4.Server.get('Pool').findBy('Alias', 'guest').get('MinAddress');
        let guestEndIp = this.model.dhcpv4.Server.get('Pool').findBy('Alias', 'guest').get('MaxAddress');

        let guestIP = this.getIpByAlias(this.model.ip.Interface, 'guest');
        let homeIP = this.getIpByAlias(this.model.ip.Interface, 'lan');
        let lanSubnetMask = this.getSubnetMaskByAlias(this.model.ip.Interface, 'lan');
        let guestSubnet = this.getSubnetMaskByAlias(this.model.ip.Interface, 'guest');
        if(!homeIP||!guestIP || !lanSubnetMask || !guestSubnet) return;

        let validateHomeIp = this.validateIP(homeIP, lanSubnetMask, homeStartIp, homeEndIp)
        let validateGuestIp = this.validateIP(guestIP, guestSubnet, guestStartIp, guestEndIp);

        if(validateHomeIp != "valid"){
            this.errMessages.push(validateHomeIp.replace('%s', this.intl.t('PAGE_SETTINGS_LAN_HOME_NETWORK')));
        }

       if(validateGuestIp != "valid"){
            this.errMessages.push(validateGuestIp.replace('%s', this.intl.t('PAGE_SETTINGS_LAN_GUEST_NETWORK')));
        }
    }

    @action
    checkValidWanServers() {
        const validateWanServers = this.validateWanServer();
        if (validateWanServers !== 'valid') {
            this.errMessages.push(validateWanServers);
        };
    }

    @action
    async Apply() {
        this.checkValidLanSettings();
        this.checkValidWanServers();
        if (this.errMessages.length > 0) return;
        
        let errMsg = document.getElementsByClassName('invalid-feedback');
        for (let i = 0; i < errMsg.length; i++) {
            if (errMsg[i].innerHTML != '') return;  // if there is an error message, do not apply the changes
        }

        // apply static DHCP, seperately from the rest of the page
        let prom = await this.homedhcpComponent.Apply()
        let prom_g = await this.guestdhcpComponent.Apply()
        
        let changePromises = [];
        if (this.model.dhcpv4.Server.get('hasDirtyAttributes')) {
            const server = await this.model.dhcpv4.get('Server');
            changePromises.push(server.save());
        }
        this.model.dhcpv4.get('Server.Pool').forEach(
            (spool) => {
                if (spool.hasDirtyAttributes) {
                    changePromises.push(spool.save());
                }
            }
        )
        this.model.ip.Interface.forEach((iface) => {
            if ((iface.Alias == "lan") || (iface.Alias == "guest")) {
                iface.IPv4Address.forEach((ipv4addr, ind) => {
                    if (ind == 0) {
                        if (ipv4addr.hasDirtyAttributes) {
                            changePromises.push(ipv4addr.save());
                        }
                    }
                });
            }
        });
        /*this.model.pppinterface.forEach((iface) => {
            if ((iface.Alias == "wan")) {
                if (iface.IPCP.get('hasDirtyAttributes')) {
                    iface.IPCP.then((ipcp) => {
                        changePromises.push(ipcp.save());
                    })
                }
            }
        });*/
        if (this.model.dns.Relay.get('hasDirtyAttributes')) {
            changePromises.push(
                this.model.dns.get('Relay').then((relay) => relay.save())
            );
        }
        await Promise.allSettled(changePromises);
        // window.location.reload();
    }

    @action
    Cancel() {
        /*if (this.dhcpComponent) {
            this.dhcpComponent.Cancel();
        }*/
        this.errMessages = [];
        let errMsg = document.getElementsByClassName('errMsg');
        for (let i = 0; i < errMsg.length; i++) {
            if (errMsg[i].innerHTML != '') {
                // if there is an error message, clear the error message
                errMsg[i].innerHTML = '';
            }
        }

        this.store.peekAll('dhcpv4-server-pool-staticaddress').forEach((staticAddr) => {
            if (staticAddr.get('id') == null || staticAddr.get('id') == undefined) {
                staticAddr.unloadRecord();
            }
        });

        this.model.ip.Interface.forEach((iface) => {
            if ((iface.Alias == "lan") || (iface.Alias == "guest")) {
                iface.IPv4Address.forEach((ipv4addr, ind) => {
                    if (ind == 0) {
                        if (ipv4addr.hasDirtyAttributes) ipv4addr.rollbackAttributes();
                    }
                });
            }
        });
        if (this.model.dns.Relay.get('hasDirtyAttributes')) {
            this.model.dns.Relay.then((relay) => {
                relay.rollbackAttributes();
            });
        }
        /*this.model.pppinterface.forEach((iface) => {
            if ((iface.Alias == "wan")) {
                if (iface.IPCP.get('hasDirtyAttributes')) {
                    iface.IPCP.then((ippcp) => {
                        ippcp.rollbackAttributes();
                    })
                }
            }
        });*/
        if (this.model.dhcpv4.Server.get('hasDirtyAttributes')) {
            this.model.dhcpv4.Server.then((server) => {
                server.rollbackAttributes();
            });
        }
        this.model.dhcpv4.Server.get('Pool').forEach((pool) => {
            if ((pool.Alias == "lan") || (pool.Alias == "guest")) {
                if (pool.get('hasDirtyAttributes')) pool.rollbackAttributes();
                pool.StaticAddress.forEach((staticAddr) => {
                    if (staticAddr.get('hasDirtyAttributes')) staticAddr.rollbackAttributes();                    
                });
            }else if ((pool.Alias == "wan")) {
                if (pool.get('hasDirtyAttributes')) pool.rollbackAttributes();
            }
        });
        // window.location.reload();
    }
}
