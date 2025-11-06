import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportDiagnosticUtilityRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.status-and-support.diagnostic-utility');
  }

  model() {
    return RSVP.hash({
      ip: this.store.findRecord('ip', 'IP.').then(
        (ip) => resolve(ip),
        (err) => {
          resolve({});
        },
      ),
      packetcapturediag: this.store.findRecord('packetcapturediagnostics', 'PacketCaptureDiagnostics.').then(
        (packetcapturediag) => resolve(packetcapturediag),
        (err) => {
          resolve({});
        },
      ),
    });

  }
}
