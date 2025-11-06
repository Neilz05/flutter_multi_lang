import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedSecurityPortMappingRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.internet.firewall');
    }

    async model() {
        await this.store.query('data',{path:`Device.Firewall.X_PRPLWARE-COM_InterfaceSetting.`});
        const interfaceSetting = this.store.peekAll('data', {path:`Device.Firewall.X_PRPLWARE-COM_InterfaceSetting.`})

        return RSVP.hash({
            firewall: this.store.findRecord('firewall', 'Firewall.').then(
                (firewall) => resolve(firewall),
                (err) => {
                    resolve({});
                }
            ),
            firewall_settings: interfaceSetting,
        });
    }

}
