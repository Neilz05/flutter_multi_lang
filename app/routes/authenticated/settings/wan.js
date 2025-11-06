import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedNetworkWanRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.settings.wan');
  }

  async model() {
    await this.store.query('data',{path:'Device.DNS.Relay.X_PRPLWARE-COM_Config.'})
    await this.store.query('data',{path:'Device.DNS.Relay.Forwarding.'})
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
        (wanmanager) => resolve(wanmanager),
        (err) => resolve({})
      ),
      ethernetvlantermination: this.store.findAll('ethernet-vlantermination').then(
        (vlan) => resolve(vlan),
        (err) => resolve({})
      ),
      dhcpv4: this.store.findRecord('dhcpv4', 'DHCPv4.').then(
        (dhcpv4) => resolve(dhcpv4),
        (err) => resolve({}),
      ),
      nat: this.store.findRecord('nat', 'NAT.').then(
        (nat) => resolve(nat),
        (err) => resolve({}),
      ),
      ppp: this.store.findAll('ppp-interface').then(
        (ppp) => resolve(ppp),
        (err) => resolve({}),
      ),
      ipinterface: this.store.findAll('ip-interface').then(
        (ip) => resolve(ip),
        (err) => resolve({}),
      ),
      xpononu: this.store.findAll('xpon-onu').then(
        (xpon) => resolve(xpon),
        (err) => resolve({}),
      ),
      deviceinfo: this.store.findRecord('deviceinfo', 'DeviceInfo.').then(
        (cloned) => resolve(cloned),
        (err) => resolve({})
      ),
      users: this.store.findRecord('users', 'Users.').then(
        (user) => resolve(user),
        (err) => resolve({})
      ),
      ethernetlink: this.store.findAll('ethernet-link').then(
        (ethLink) => resolve(ethLink),
        (err) => resolve({}),
      ),
      dns_server: dns_server,
      x_prpl_com_config: x_prpl_com_config[0],
    });
  }
}
