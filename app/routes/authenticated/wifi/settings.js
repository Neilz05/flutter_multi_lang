import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthenticatedSettingsWifiRoute extends Route {
  @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.wifi.settings');
    }

    async model() {
      return RSVP.hash({
        // 2.4G
        wifiradio1: this.store.findRecord('wifi-radio', 'WiFi.Radio.[Alias=="Wl1"].').then(
          (radio) => resolve(radio),
          (err) => {
            resolve({});
          }
        ),
        // 5G
        wifiradio2: this.store.findRecord('wifi-radio', 'WiFi.Radio.[Alias=="Wl0"].').then(
          (radio) => resolve(radio),
          (err) => {
            resolve({});
          }
        )
      })
    }
}
