import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

import ScheduleValidator from '../../../validations/wifi-schedule';
import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default class AuthenticatedScheduleWifiRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.wifi.schedule');
    }

    async model() {
        await this.store.query('data', { path: 'Device.WiFi.X_SC_Schedule.' })
        await this.store.query('data', { path: 'Device.X_PRPL-COM_WiFiScheduler.' })

        const x_sc_schedule = this.store.peekRecord('data', 'Device.WiFi.X_SC_Schedule.')
        const wifischeduler = this.store.peekRecord('data', 'Device.X_PRPL-COM_WiFiScheduler.')

        const prefix = 'Device.X_PRPL-COM_WiFiScheduler.Network.Schedule.'
        
        let schedules = this.store.peekAll('data')
            .filter(data => {
                const id = data.id;
                if (!id?.startsWith(prefix)) return false;

                const rest = id.slice(prefix.length);
                if (!rest.endsWith('.')) return false;

                const numberPart = rest.slice(0, -1);
                return /^\d+$/.test(numberPart);
            })
            .map((model) => {
                const validator = ScheduleValidator(this.store, 'Device.X_PRPL-COM_WiFiScheduler.Network.Schedule.', model)
                return new Changeset(model, lookupValidator(validator), validator, {skipValidate: true})
            })

        return {
            x_sc_schedule: new Changeset(x_sc_schedule),
            wifischeduler: new Changeset(wifischeduler),
            schedules,
        }

    }


    // inline validator for Device.X_PRPL-COM_WiFiScheduler.Network.Schedule.


}