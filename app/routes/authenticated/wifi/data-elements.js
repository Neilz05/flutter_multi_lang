import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedWifiDataElementsRoute extends Route {
  @service store;
  
  beforeModel() {
    localStorage.setItem('tab', 'authenticated.wifi.data-elements');
  }

  model() {
    return RSVP.hash({
      wifi: this.store.findRecord('wifi', 'WiFi.').then(
        (wifi) => resolve(wifi),
        (err) => {
          resolve({});
        }
      ),
      wifidataelem: this.store.findRecord('wifi-dataelements', 'WiFi.DataElements.').then(
        (elem) => resolve(elem),
        (err) => {
          resolve({});
        }
      ),
    });
  }
}
