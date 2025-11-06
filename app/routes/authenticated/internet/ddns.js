import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedSecurityDdnsRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.internet.ddns');
  }

  model() {
    return this.store.findRecord('dynamicdns', 'DynamicDNS.').then(
      (dynamicdns) => resolve(dynamicdns),
      (err) => {
        console.error('Error fetching DynamicDNS:', err);
        resolve({});
      }
    );
  }
}
