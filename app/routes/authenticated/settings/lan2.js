import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedNetworkLan2Route extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.settings.lan');
  }

  model() {
    return RSVP.hash({
      dns: this.store.findRecord('dns', 'DNS.').then(
        (dns) => resolve(dns),
        (err) => {
          resolve({});
        }
      ),
      logicalInterface: this.store.findAll('logical-interface', 'Logical.Interface.').then(
        (logical) => resolve(logical),
        (err) => {
          resolve({});
        }
      ),
      /*pppinterface: this.store.findAll('ppp-interface').then(
        (ppp) => resolve(ppp),
        (err) => {
          resolve({});
        }
      ),*/
      dhcpv4: this.store.findRecord('dhcpv4', 'DHCPv4.').then(
        (dhcpv4) => resolve(dhcpv4),
        (err) => {
          resolve({});
        }
      ),
      hosts: this.store.findRecord('hosts', 'Hosts.').then(
        (hosts) => resolve(hosts),
        (err) => {
          resolve({});
        }
      ),
      ip: this.store.findRecord('ip', 'IP.').then(
        (ip) => resolve(ip),
        (err) => {
          resolve({});
        }
      ),
    });
  }
}
