import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedGeneralWifiRoute2 extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.wifi.general2');
    }

    async model() {
        //return this.store.findRecord('wifi', 'WiFi.')
        
      return RSVP.hash({
        wifi: this.store.findRecord('wifi', 'WiFi.').then(
          (radio) => resolve(radio),
          (err) => {
            resolve({});
          }
        ),
        SplitSSIDDisable_main: this.store.findRecord('x-fastweb-wifi-splitssiddisable', 'X_FASTWEB_WiFi.SplitSSIDDisable.1.').then(
          (radio) => resolve(radio),
          (err) => {
            resolve({});
          }
        ),
        SplitSSIDDisable_custom: this.store.findRecord('x-fastweb-wifi-splitssiddisable', 'X_FASTWEB_WiFi.SplitSSIDDisable.2.').then(
          (radio) => resolve(radio),
          (err) => {
            resolve({});
          }
        ),
        SplitSSIDDisable_guest: this.store.findRecord('x-fastweb-wifi-splitssiddisable', 'X_FASTWEB_WiFi.SplitSSIDDisable.3.').then(
          (radio) => resolve(radio),
          (err) => {
            resolve({});
          }
        ),
        SplitSSIDDisable_compat: this.store.findRecord('x-fastweb-wifi-splitssiddisable', 'X_FASTWEB_WiFi.SplitSSIDDisable.4.').then(
          (radio) => resolve(radio),
          (err) => {
            resolve({});
          }
        )
      })
    }

    setupController(controller, model) {
        super.setupController(controller, model)
        controller.model = model
        controller.setupWifiArray();
        controller.setupActiveWifi();

    }
}
