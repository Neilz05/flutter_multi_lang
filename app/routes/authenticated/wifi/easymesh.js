import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedEasyMeshWifiRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.wifi.easymesh');
    }

    model() {
        return this.store.findRecord('wifi', 'WiFi.')
    }
}