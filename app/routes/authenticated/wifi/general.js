import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedGeneralWifiRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.wifi.general');
    }

    async model() {
        return this.store.findRecord('wifi', 'WiFi.')
    }

    setupController(controller, model) {
        super.setupController(controller, model)
        controller.model = model
        controller.setupWifiArray()
    }
}
