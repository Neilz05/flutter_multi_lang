import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedSecurityPortMappingRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.internet.port-mapping');
    }

    async model() {
        try {

            await this.store.query('nat-portmapping', { path: 'NAT.PortMapping.' })
            await this.store.query('ip-interface', { path: 'IP.Interface.' })
            await this.store.query('logical-interface', { path: 'Logical.Interface.' })
            await this.store.query('hosts-host', { path: 'Hosts.Host.' })
            await this.store.query('ssh-server', { path: 'SSH.Server.' })
            await this.store.query('userinterface-httpaccess', { path: 'UserInterface.HTTPAccess.' })


        } catch (error) {
            console.error('Error loading model data:', error);
        }


        /*  rsvp was a mistake
        return RSVP.hash({
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
            ),
            SSHServer: this.store.findAll('ssh-server').then(
                (ssh) => resolve(ssh),
                (err) => {
                    resolve({});
                }
            ),
            HTTPAccess: this.store.findAll('userinterface-httpaccess', 'UserInterface.HTTPAccess.').then(
                (ssh) => resolve(ssh),
                (err) => {
                    resolve({});
                }
            ),

        }); */
    }

}
