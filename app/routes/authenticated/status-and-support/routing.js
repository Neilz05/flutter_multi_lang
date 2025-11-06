import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportOpticalStatusRoute extends Route {
    @service store;
    
    beforeModel() {
        localStorage.setItem('tab', 'authenticated.status-and-support.routing');
    }

    async model() {
        await this.store.query('ip-interface', {path: 'IP.Interface.'})
        .catch(() => {});

        return this.store.query('routing-router', {path: 'Routing.Router.'}).then((routers) => {
            return this.store.peekAll('routing-router')
        })
        .catch((e) => { 
            console.log(e)
            return []; 
        });
    }
}
