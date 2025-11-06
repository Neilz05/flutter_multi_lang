import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportStatusRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.status-and-support.status');
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
      deviceinfo: this.store.findRecord('deviceinfo', 'DeviceInfo.').then(
        (device) => resolve(device),
        (err) => {
          resolve({});
        },
      ),
      routing: this.store.findRecord('routing', 'Routing.').then(
        (route) => resolve(route),
        (err) => {
          resolve({});
        },
      ),
      time: this.store.findRecord('time', 'Time.').then(
        (time) => resolve(time),
        (err) => {
          console.error(err);
          resolve({});
        }
      ),
      dns: this.store.findRecord('dns', 'DNS.').then(
        (dns) => resolve(dns),
        (err) => {
          resolve({});
        }
      ),
      firewall: this.store.findRecord('firewall', 'Firewall.').then(
        (firewall) => resolve(firewall),
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
      dhcpv6: this.store.findRecord('dhcpv6', 'DHCPv6.').then(
        (dhcpv6) => resolve(dhcpv6),
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
      wifi: this.store.findRecord('wifi', 'WiFi.').then(
        (wifi) => resolve(wifi),
        (err) => {
          resolve({});
        }
      ),
      ppp: this.store.findAll('ppp-interface').then(
        (ppp) => resolve(ppp), 
        (err) => resolve([])          
      ),
      logical_interface: this.store.findAll('logical-interface','Logical.Interface.').then(
        (res) => resolve(res), 
        (err) => resolve([])          
      ),
      ethernet: this.store.findRecord('ethernet', 'Ethernet.').then(
        (ethernet) => resolve(ethernet),
        (err) => {
          resolve({});
        }
      ),
      reboot: this.store.findRecord('reboot', 'Reboot.').then(
        (reboot) => resolve(reboot),
        (err) => resolve({})
      ),
      dns_server: dns_server,
      x_prpl_com_config: x_prpl_com_config[0]
    });
  }
}
