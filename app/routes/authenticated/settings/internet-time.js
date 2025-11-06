import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedSecurityInternetTimeRoute extends Route {
    @service store;
    
    beforeModel() {
        localStorage.setItem('tab', 'authenticated.internet.internet-time');
    }

    async model() {
        return this.store.findRecord('time', 'Time.').then(
            (time) => resolve(time),
            (err) => {
                resolve({});
            }
        );
    }

    setupController(controller, model) {
        super.setupController(controller, model);

        let servers = model.Client.findBy('Alias', 'cpe-client-1').Servers;
        servers = servers.replace(/\s/g, '');

        let serverArray = servers.split(',');
        while (serverArray.length < 5) {
            serverArray.push('');
        }

        controller.set('serverList', servers);
        controller.set('serverArray', serverArray);
    }
}
