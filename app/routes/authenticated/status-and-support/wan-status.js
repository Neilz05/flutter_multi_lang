import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportWanStatusRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.status-and-support.wan-status');
  }

  async model() {
    await this.store.query('data',{path:'Device.DNS.Relay.X_PRPLWARE-COM_Config.'});
    await this.store.query('data',{path:'Device.DNS.Relay.Forwarding.'});
    const x_prpl_com_config = this.store.peekAll('data', 'Device.DNS.Relay.X_PRPLWARE-COM_Config.')
      .filter(model => model.parameters?.Alias === 'wan')
      .map(model =>{
        return {
          param: model.parameters,
          model: model,
        };
      });

    const dns_server = this.store.peekAll('data', 'Device.DNS.Relay.Forwarding.')
      .filter(model => ['static-1', 'static-2'].includes(model.parameters?.Alias));
    
    return RSVP.hash({
      wanmanager: this.store.findRecord('x-prpl-com-wanmanager', 'WANManager.').then(
        (wanm) => resolve(wanm),
        (err) => {
          resolve({});
        }
      ),
      dns: this.store.findRecord('dns', 'DNS.').then(
        (dns) => resolve(dns),
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
      dhcpv4: this.store.findRecord('dhcpv4', 'DHCPv4.').then(
        (dhcpv4) => resolve(dhcpv4),
        (err) => {
          resolve({});
        }
      ),
      ppp: this.store.findAll('ppp-interface').then(
        (ppp) => resolve(ppp),
        (err) => resolve({}),
      ),
      dnsRelayForwarding: dns_server,
      dnsRelayConfig: x_prpl_com_config[0]
      // nat: this.store.findRecord('nat', 'NAT.').then(
      //   (nat) => resolve(nat),
      //   (err) => {
      //     resolve({});
      //   }
      // ),
    });
  }
}
