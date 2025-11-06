import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StatusLanStatusTableComponent extends Component {
    @action
    getInterface(intName) {
        let connType = intName.split('.')[1];
        let ind = intName.split('.')[3];
        let ifaceName = "";

        if (connType == "Ethernet") {
            this.args.ethernet.get('Interface').forEach((iface, i) => {
                if ((i + 1) == ind) {
                    ifaceName = iface.Name;
                }
            });
        } else if (connType == "WiFi") {
            this.args.wifi.get('SSID').forEach((ssid, i) => {
                if ((i + 1) == ind) {
                    ifaceName = ssid.Name;
                }
            });
        }

        return ifaceName;
    }
}