import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedSecurityDmzRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.internet.upnp');
    }

    model() {
        return RSVP.hash({
            Upnp: this.store.findRecord('upnp', 'UPnP.Device.').then(
                (upnp) => resolve(upnp),
                (err) => {
                    resolve({});
                }
            ),
            PortMapping: this.store.findAll('nat-portmapping').then(
                (pm) => resolve(pm),
                (err) => {
                    console.error(err)
                }
            ),
            Hosts: this.store.findAll('hosts-host', 'Hosts.Host.').then(
                (hosts) => resolve(hosts),
                (err) => {
                    resolve({});
                }
            ),
            Time: this.store.findRecord('time', 'Time.').then(
                (Time) => resolve(Time),
                (err) => {
                    resolve({});
                }
            )
        });
    }
}
