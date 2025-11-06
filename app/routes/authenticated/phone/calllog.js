import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedPhoneRoute extends Route {
    @service store;
    beforeModel() {
        localStorage.setItem('tab', 'authenticated.phone.calllog');
    }
    async model() {
        try {
            await this.store.query('services-voiceservice-calllog', { path: 'Services.VoiceService.1.CallLog.' })
            //await this.store.query('services-voiceservice-sip-client', {path: 'Services.VoiceService.1.SIP.Client.'})

            return {
                calllog: this.store.peekAll('services-voiceservice-calllog'),
                //sipclient: this.store.peekAll('services-voiceservice-sip-client')
            }
        } catch (error) {
            console.log(error)
            return {
                calllog: []
            }
        }
    }
}