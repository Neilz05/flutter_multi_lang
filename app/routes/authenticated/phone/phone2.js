import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedPhone2Route extends Route { 
    @service store;
    async model() {
      try {
        await this.store.query('services-voiceservice-sip-network', { path: 'Services.VoiceService.1.SIP.Network.1.' });
        await this.store.query('services-voiceservice-sip-client', { path: 'Services.VoiceService.1.SIP.Client.' });
        return {
          network: this.store.peekRecord('services-voiceservice-sip-network', 'Services.VoiceService.1.SIP.Network.1.'),
          clients: this.store.peekAll('services-voiceservice-sip-client')
        }
      }
      catch (e){
        return {
          network: {},
          clients: []
        }
      }
    }
}