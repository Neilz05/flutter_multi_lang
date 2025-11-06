import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportVoiceStatusRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.status-and-support.voice-status');
    }

    async model() {
        return RSVP.hash({
            line: this.store.query('services-voiceservice-callcontrol-line', {path: 'Services.VoiceService.1.CallControl.Line.'}).then(
                (data) => {
                    //console.log('Fetched line services:', data);
                    return data;
                },
                (err) => {
                    console.error('Failed to fetch line services:', err);
                    return {};
                }
            ),
            client: this.store.query('services-voiceservice-sip-client', {path: 'Services.VoiceService.1.SIP.Client.'}).then(
                (data) => {
                    //console.log('Fetched SIP clients:', data);
                    return data;
                },
                (err) => {
                    console.error('Failed to fetch SIP clients:', err);
                    return {};
                }
            ),
        });
    }
}
