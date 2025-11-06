import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportLCMRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.status-and-support.lcm');
    }

    async model() {
        return this.store.findRecord('softwaremodules', 'SoftwareModules.').then(
          (softwaremodules) => resolve(softwaremodules),
          (err) => {
            resolve({});
          }
        );
      }

    setupController(controller, model) {
        super.setupController(controller, model);
        // Call modelChanged to initialize licenses with the model data
        controller.modelChanged?.(model);
    }
}
