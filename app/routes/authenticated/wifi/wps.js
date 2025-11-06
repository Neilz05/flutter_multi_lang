import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedWpsWifiRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.wifi.wps');
    }

    model() {
        return this.store.findRecord('wifi', 'WiFi.')
    } 

}