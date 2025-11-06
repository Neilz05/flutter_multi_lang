import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedPhone2Route extends Route {
    @service store;
    beforeModel() {
        localStorage.setItem('tab', 'authenticated.phone.callsettings');
    }
    async model() {
        try {
            await this.store.query('services-voiceservice-callcontrol-callingfeatures-set', { path: 'Services.VoiceService.1.CallControl.CallingFeatures.Set.' })

            return {
                line1: this.store.peekRecord('services-voiceservice-callcontrol-callingfeatures-set', "Services.VoiceService.1.CallControl.CallingFeatures.Set.1."),
                line2: this.store.peekRecord('services-voiceservice-callcontrol-callingfeatures-set', "Services.VoiceService.1.CallControl.CallingFeatures.Set.2.")
            }

        }catch (error){
            console.log(error)

            return {
                line1: {},
                line2: {}
            }
        }
    }
}