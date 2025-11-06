import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportGponStatusRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.status-and-support.gpon-status');
  }

  model() {
    return this.store.findRecord('xpon', 'XPON.').then(
      (xpon) => resolve(xpon),
      (err) => {
        resolve({});
      }
    );
  }
}
