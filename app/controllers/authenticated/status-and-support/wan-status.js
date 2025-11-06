import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusWanStatusController extends Controller {
    @service store;

    get IntfEntries(){
        let wanmanagerArr = [];
        let intfArr = [];
        this.model.wanmanager.WAN.forEach((wan) => {
            if (wan.Alias === this.model.wanmanager.WANMode) {
                wan.Intf.forEach((item) => {
                    if (item.isDeleted === false) wanmanagerArr.push(item);
                })
            }
        })

        this.model.ip.Interface.forEach((iface) => {
            let ifaceID = "Device." + iface.id;

            wanmanagerArr.forEach((entry) => {
                if (ifaceID === entry.IPv4Reference && entry.Name === iface.Alias) {
                    if ((iface.Alias == 'wan') || (iface.Alias == 'voip') || (iface.Alias == 'iptv') || (iface.Alias == 'mgmt') || (iface.Alias == 'wwan')) {
                        intfArr.push(iface);
                    }
                }
            });
        });

        return intfArr;
    }

    get globalAddr() {
        const iface = this.model.ip.Interface.find((iface) => iface.Alias === 'wan');
        if (iface) {
            const ipv6addr = iface.IPv6Address.find((ipv6addr) =>
                ipv6addr.Alias === 'GUA_RA' || ipv6addr.Alias === 'GUA_STATIC'
            );
            if (ipv6addr) {
                return ipv6addr.IPAddress === "" ? "N/A" : ipv6addr.IPAddress;
            }
        }
        return "N/A";
    }

    /*get linkLocalAddr() {
        const iface = this.model.ip.Interface.find((iface) => iface.Alias === 'wan');
        if (iface) {
            const ipv6addr = iface.IPv6Address.find((ipv6addr) =>
                ipv6addr.Alias === 'LLA1' || ipv6addr.Alias === 'LLA'
            );
            if (ipv6addr) {
                return ipv6addr.IPAddress === "" ? "N/A" : ipv6addr.IPAddress;
            }
        }
        return "N/A";
    }*/

    get dnsServers() {
        const dhcpv6One = this.model.dns.Relay.get('Forwarding').find((dns) => dns.Alias === 'dhcpv6-1').DNSServer;
        const dhcpv6Two = this.model.dns.Relay.get('Forwarding').find((dns) => dns.Alias === 'dhcpv6-2').DNSServer;
        const dnsServers = (dhcpv6One !== '' && dhcpv6One !== undefined && dhcpv6One !== null ? '<div>' + dhcpv6One + '</div>' : '')
                         + (dhcpv6Two !== '' && dhcpv6Two !== undefined && dhcpv6Two !== null ? '<div>' + dhcpv6Two + '</div>' : '');
        if (dnsServers === "") {
            return "";
        } else {
            return dnsServers;
        }
    }

    @action
    getDNSServerByAlias(alias) {
        let ipv4DnsServers = '';
        const wanMode = this.model.wanmanager.WANMode;

        if(alias === 'wan') {
            if (wanMode.includes('PPP')) {
                ipv4DnsServers = this.store.peekAll('ppp-interface').find(ppp => ppp.Alias === alias).IPCP.get('DNSServers');
            } else if (wanMode.includes('DHCP')) {
                ipv4DnsServers = this.model.dhcpv4.Client.find((cli) => cli.Alias === alias).DNSServers;
            }
        } else {
            ipv4DnsServers = this.model.dhcpv4.Client.find((cli) => cli.Alias === alias).DNSServers;
        }

        if (ipv4DnsServers !== '' && ipv4DnsServers != undefined && ipv4DnsServers != null) {
            if(ipv4DnsServers.includes(",")) {
                return ipv4DnsServers.split(',').map(dns => dns.trim());
            } else {
                return ipv4DnsServers ? [ipv4DnsServers.trim()] : [];
            }
        } else {
            return [];
        }
    }

    get primaryDNSServer() {
    return this.model.dnsRelayForwarding[0].get("DNSServer");
    }

    get secondaryDNSServer() {
    return this.model.dnsRelayForwarding[1].get("DNSServer");
    }

    @action
    checkDNS() {
    const dnsConfigMode = this.model.dnsRelayConfig.model.get("DNSMode");
    const primaryDNSServer = this.model.dnsRelayForwarding[0].get("DNSServer");
    const secondaryDNSServer = this.model.dnsRelayForwarding[1].get("DNSServer");
    let exists = false;

    if (dnsConfigMode === 'Static' && primaryDNSServer && secondaryDNSServer) {
        exists = true;
    }

    return exists;
    }
}
