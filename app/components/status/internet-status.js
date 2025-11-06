import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class InternetStatusComponent extends Component {
  @service store;

  get routing() {
    return this.args.routing;
  }

  get wanPppInterfaces() {
    const ifaceList = this.args.ip?.Interface ?? [];
    const dhcpList = this.args.dhcpv4?.Client ?? [];

    return ifaceList
      .filter((iface) => 
        iface.Alias === 'wan' && 
        typeof iface.LowerLayers === 'string' &&
        iface.LowerLayers.startsWith('Device.PPP.Interface')
      )
      .map((iface) => {
        const match = dhcpList.find((dhcp) => dhcp.Alias === 'wan');
        return {
          iface,
          dhcp: match
        };
      })
      .filter(item => item.dhcp); // only include if matching DHCP data exists
  }

  get primaryDNSServer() {
    return this.args.dnsRelayForwarding[0].get("DNSServer");
  }

  get secondaryDNSServer() {
    return this.args.dnsRelayForwarding[1].get("DNSServer");
  }

  @action
  checkDNS() {
    const dnsConfigMode = this.args.dnsRelayConfig.model.get("DNSMode");
    const primaryDNSServer = this.args.dnsRelayForwarding[0].get("DNSServer");
    const secondaryDNSServer = this.args.dnsRelayForwarding[1].get("DNSServer");
    let exists = false;

    if (dnsConfigMode === 'Static' && primaryDNSServer && secondaryDNSServer) {
      exists = true;
    }

    return exists;
  }
}
