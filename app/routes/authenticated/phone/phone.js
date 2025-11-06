import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedPhoneRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.phone.phone');
  }

  async model() {
    try {
      // Query Mirage for both SIP networks
      await this.store.query('services-voiceservice-sip-network', {
        path: 'Services.VoiceService.1.SIP.Network.1.'
      });

      await this.store.query('services-voiceservice-sip-network', {
        path: 'Services.VoiceService.1.SIP.Network.2.'
      });

      // Query SIP clients
      await this.store.query('services-voiceservice-sip-client', {
        path: 'Services.VoiceService.1.SIP.Client.*.'
      });

      return {
        network: this.store.peekRecord(
          'services-voiceservice-sip-network',
          'Services.VoiceService.1.SIP.Network.1.'
        ),
        network2: this.store.peekRecord(
          'services-voiceservice-sip-network',
          'Services.VoiceService.1.SIP.Network.2.'
        ),
        clients: this.store.peekAll('services-voiceservice-sip-client')
      };
    } catch (e) {
      return {
        network: {},
        network2: {},
        clients: []
      };
    }
  }
}
