import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default class AuthenticatedSettingsEcoModeRoute extends Route {
    @service store;
    @service parametersValidator;
       async model() {
        try {
            const prefix = 'Device.X_ECO.ScheduleRule.';
            const eco = await this.store.queryRecord('data', { path: 'Device.X_ECO.' });
            await this.store.query('data',{path: prefix});
            const sched_rule = this.store.peekAll('data')
                        .filter(data => {
                            const id = data.id;
                            if (id?.startsWith(prefix)){
                                return true;
                            }
                        })
                        .map((model) => {
                            const validator = this.parametersValidator.validate({startTime:"StartTime",endTime:"EndTime",days:"WeekDay",name:"Name"});
                            return new Changeset(model, lookupValidator(validator), validator, {skipValidate: true})
                        })
            return {
                "eco": new Changeset(eco),
                "eco_schedule": sched_rule,
            }
        } catch (error) {
            console.error("Error fetching eco mode data:", error);
            return {
                "eco": [],
                "eco_schedule": [],
            };
        }
    }
}