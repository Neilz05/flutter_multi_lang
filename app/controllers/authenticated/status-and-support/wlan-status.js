import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedStatusAndSupportWlanStatusController extends Controller {
    @service store;

    @tracked ssid5gEnable = false;
    @tracked ssid2gEnable = false;

    constructor() {
        super(...arguments);
        this.loadWifi5g();
        this.loadWifi2g();
    }
    
    async loadWifi5g() {
        let ssid5g = await this.store.findRecord('wifi-ssid', 'WiFi.SSID.[CustomAlias=="WiFi-5G"].', { reload: true });
        this.ssid5gEnable = ssid5g.get('Enable') == 1;
    }

    async loadWifi2g() {
        let ssid2g = await this.store.findRecord('wifi-ssid', 'WiFi.SSID.[CustomAlias=="WiFi-2G"].', { reload: true });
        this.ssid2gEnable = ssid2g.get('Enable') == 1;
    }

    get wifi5gEnableStatus() {
        let wifi5gRadioEnable = this.model.WiFi5GRadio.Enable == 1;
        return this.ssid5gEnable && wifi5gRadioEnable;
    }

    get wifi2gEnableStatus() {
        let wifi2gRadioEnable = this.model.WiFi2GRadio.Enable == 1;
        return this.ssid2gEnable && wifi2gRadioEnable;
    }
}
