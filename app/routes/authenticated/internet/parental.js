import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';
import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import AccessControlValidator from '../../../validations/hosts-accesscontrol';
import AccessControlURLValidator from '../../../validations/hosts-accesscontrol-url';
import AccessControlAppValidator from '../../../validations/hosts-accesscontrol-app';
import AccessControlScheduleValidator from '../../../validations/hosts-accesscontrol-schedule';
import filterMultiInstanceModels from '../../../utils/filter-instance-models';

export default class AuthenticatedSecurityParentalRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.internet.parental');
    }

    async model() {
        await this.store.findAll('hosts-host')/* .then((records) => {
            this.hosts = records
                .filter(host => host.InterfaceType === "Wi-Fi" && host.Layer1Interface.includes("Device.WiFi.SSID") && host.IPAddress !== "")
                .map(host => ({
                    selected: false, 
                    data: host 
                }))
            this.modalopen = true
        }) */


        const result = this.store.query('hosts-accesscontrol', { path: 'Hosts.AccessControl.' }).then((result) => {
            return this.store.peekAll('hosts-accesscontrol').toArray()
        })
            .catch((e) => {
                console.log('Error fetching Hosts.AccessControl.', e)
                return []
            })
        return result
    }

}
