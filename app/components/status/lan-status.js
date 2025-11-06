import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


export default class LanStatusComponent extends Component {
    @service store
    @tracked lans = [];

    constructor() {
        super(...arguments);
        this.setLans();
    }

    setLans() {
        this.lans = [];
        this.args.ethernet.Interface.forEach((element) => {
            if (element.Upstream == 0) {
                this.lans.push(element);
            }
        });
    }

    get MACAddress(){
        let ethernet_links = this.store.peekAll('ethernet-link')
        let bridge_lan = ethernet_links.find((a) => a.Alias === 'bridge_lan')

        return bridge_lan.MACAddress
    }

    get DefaultGateway() {
        let logicalInterfaces = this.store.peekAll('logical-interface');
        let lanInterface = logicalInterfaces.find((iface) => iface.Alias === 'lan');

        if (!lanInterface) {
            console.warn('No logical-interface with Alias "lan" found');
            return null;
        }

        let lowerLayerId = lanInterface.LowerLayers;
        if (!lowerLayerId) {
            console.warn('LowerLayers is missing in the lan interface');
            return null;
        }

        let shortId = lowerLayerId.replace(/^Device\./, ''); // remove the "Device." prefix

        let allIPv6Records = this.store.peekAll('ip-interface-ipv6address');

        let ipv6AddressRecord = allIPv6Records.find((record) => {
            return record.Alias === 'LLA' && record.id.startsWith(shortId);
        });

        if (!ipv6AddressRecord) {
            console.warn('No LLA IPv6 address record found for LowerLayer:', lowerLayerId);
            return null;
        }

        return ipv6AddressRecord.IPAddress;
    }
}