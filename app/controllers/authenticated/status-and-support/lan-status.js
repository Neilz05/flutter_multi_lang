import Controller from '@ember/controller';

export default class AuthenticatedStatusLanStatusController extends Controller {
    /*getInterface(intName) {
        console.log("Value of Layer 1 interface: " + intName);
        let connType = intName.split('.')[1];
        let ind = intName.split('.')[3];
        console.log("Connection type: " + connType);
        console.log("Index: " + ind);
        console.log("Model", this.model);

        if (connType == "Ethernet") {
            this.model.ethernet.get('Interface').forEach((iface, i) => {
                if (i == ind) {
                    return iface.Name;
                }
            });
        } else if (connType == "WiFi") {
            this.model.wifi.get('SSID').forEach((ssid, i) => {
                if (i == ind) {
                    return ssid.Name;
                }
            });
        }
    }*/
}
