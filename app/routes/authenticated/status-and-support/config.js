import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportConfigRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.status-and-support.config');
  }

  model() {
    return RSVP.hash({ 
      ip: this.store.findRecord('ip', 'IP.').then(
        (ip) => resolve(ip),
        (err) => {
          resolve({});
        }
      ),
      deviceinfo: this.store.findRecord('deviceinfo', 'DeviceInfo.').then(
        (deviceinfo) => resolve(deviceinfo),
        (err) => {
          resolve({});
        }
      ),
      persistentconfiguration: this.store.findRecord('x-prpl-com-persistentconfiguration', 'PersistentConfiguration.').then(
        (device) => resolve(device),
        (err) => {
          resolve({});
        }
      ),
    });
  }
}
