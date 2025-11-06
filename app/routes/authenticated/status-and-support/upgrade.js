import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportUpgrade extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.status-and-support.firmware-update');
  }

  model() {
    return RSVP.hash({
      deviceinfo: this.store.findRecord('deviceinfo', 'DeviceInfo.').then(
        (device) => resolve(device),
        (err) => {
          resolve({});
        },
      ),
    });
  }
}