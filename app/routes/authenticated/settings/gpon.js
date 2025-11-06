import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class GponRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.settings.gpon');
  }

  model() {
    return RSVP.hash({
      /*deviceinfo: this.store.findRecord('deviceinfo', 'DeviceInfo.').then(
        (deviceinfo) => resolve(deviceinfo),
        (err) => {
          resolve({});
        }
      ),
      dns: this.store.findRecord('dns', 'DNS.').then(
        (dns) => resolve(dns),
        (err) => {
          resolve({});
        }
      ),*/
      xpon: this.store.findRecord('xpon', 'XPON.').then(
        (xpon) => resolve(xpon),
        (err) => {
          resolve({});
        }
      )
    });
  }
}
