import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedNetworkWanAutosensingRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.settings.wan-autosensing');
  }

  async model() {
    return this.store.findRecord('x-prpl-com-wanmanager', 'WANManager.').then(
      (wanmanager) => resolve(wanmanager),
      (err) => resolve({})
    );
  }
}
