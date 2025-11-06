import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportLanStatusRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.status-and-support.lan-status');
  }

  model() {
    return RSVP.hash({ 
      dhcpv4: this.store.findRecord('dhcpv4', 'DHCPv4.').then(
        (dhcpv4) => resolve(dhcpv4),
        (err) => {
          resolve({});
        }
      ),
      ethernet: this.store.findRecord('ethernet', 'Ethernet.').then(
        (ethernet) => resolve(ethernet),
        (err) => {
          resolve({});
        }
      ),
      hostshost: this.store.findAll('hosts-host').then(
        (host) => resolve(host),
        (err) => resolve({})
      ),
      time: this.store.findRecord('time', 'Time.').then(
        (time) => resolve(time),
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
    });
  }
}
