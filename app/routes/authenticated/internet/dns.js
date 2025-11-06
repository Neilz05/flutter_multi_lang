import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedInternetDnsRoute extends Route {
  @service store;


  async model() {
    await this.store.findRecord('ip', 'IP.');
    try{
        return RSVP.hash({
        securedns: this.store.findRecord('dns-xsecuredns', 'DNS.X_SecureDNS.').then(
          (securedns) => resolve(securedns),
          (err) => {
            console.error('Error fetching DNS.X_SecureDNS:', err);
          }
        ),
        dhcpv4: this.store.findRecord('dhcpv4', 'DHCPv4.').then(
          (dhcpv4) => resolve(dhcpv4),
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
      });
    }catch(error){
      console.error('Error in DNS route model:', error);
      return {
        securedns: {},
        dhcpv4: {},
        logicalInterface: {},
      };
    }
  }
}
