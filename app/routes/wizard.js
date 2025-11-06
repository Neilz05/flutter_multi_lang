import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP, { resolve } from 'rsvp';

export default class WizardRoute extends Route {
    @service session;
    @service store;
    @service wizard;
    
    async model() {
        return this.wizard.initWizard();
    }

    beforeModel(transition) {
        this.session.requireAuthentication(transition, 'login');
        localStorage.setItem('tab', 'wizard.wanMode');
    }
}