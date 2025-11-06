import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedPhonePhoneNumbersRoute extends Route { 
  @service store;

  async model() {
    return this.store.query('services-voiceservice-sip-client', {
        path: 'Services.VoiceService.1.SIP.Client.'
    }).catch((err) => ({ error: err }));
  }
}