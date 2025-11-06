import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';


export default class AuthenticatedPhoneRingScheduleRoute extends Route {
    @service store;
    @service parametersValidator;

   async model() {
    try{
       await this.store.query('data',{path: 'Device.Services.VoiceService.1.X_PRPLWARE-COM_RingScheduleService.RingSchedule.'});
       const ring = await this.store.queryRecord('data',{path: 'Device.Services.VoiceService.1.X_PRPLWARE-COM_RingScheduleService.'})
        const prefix = 'Device.Services.VoiceService.1.X_PRPLWARE-COM_RingScheduleService.RingSchedule.';
        let ring_schedules = this.store.peekAll('data')
                    .filter(data => {
                        const id = data.id;
                        if (id?.startsWith(prefix)){
                            return true;
                        }
                    })
                    .map((model) => {
                        const validator = this.parametersValidator.validate({startTime:"TimeFrom",endTime:"TimeTo",days:"TimeFrame"});
                        return new Changeset(model, lookupValidator(validator), validator, {skipValidate: true})
                    });

        return {
            "ring_schedules": ring_schedules,
            "ring": new Changeset(ring)
        }
    }   catch(error){
        return {
            "ring_schedules": [],
            "ring": []
        }
    }
    }
}