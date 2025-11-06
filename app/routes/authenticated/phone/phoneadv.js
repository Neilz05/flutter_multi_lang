import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedSecurityPhoneadvRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.phone.phoneadv');
  }
  setupController(controller, model) {
        super.setupController(controller, model);
        controller.setupData();
  }

  async model() {

      this.store.unloadAll('services-voiceservice');
      this.store.unloadAll('services-voiceservice-callcontrol-numberingplan');
      this.store.unloadAll('services-voiceservice-voipprofile');
      this.store.unloadAll('services-voiceservice-voipprofile-rtp');
      this.store.unloadAll('services-voiceservice-voipprofile-rtp-rtcp');
      this.store.unloadAll('services-voiceservice-codecprofile');
      this.store.unloadAll('services-voiceservice-pots');
      this.store.unloadAll('services-voiceservice-pots-fxs-voiceprocessing');
      this.store.unloadAll('services-voiceservice-sip-network');
      this.store.unloadAll('services-voiceservice-sip-client');
      //this.store.unloadAll('ip-interface');

			
      try {
        await this.store.query('services-voiceservice', { path: 'Services.VoiceService.1.' });
        await this.store.query('ip-interface', { path: 'IP.Interface.2.' });
        await this.store.query('ip-interface', { path: 'IP.Interface.9.' });

        return {
          voiceservice_1: this.store.peekRecord('services-voiceservice', 'Services.VoiceService.1.'),
          callcontrol_numberingplan_1: this.store.peekRecord('services-voiceservice-callcontrol-numberingplan', 'Services.VoiceService.1.CallControl.NumberingPlan.1.'),
          voipprofile_1: this.store.peekRecord('services-voiceservice-voipprofile', 'Services.VoiceService.1.VoIPProfile.1.'),
          voipprofile_1_rtp: this.store.peekRecord('services-voiceservice-voipprofile-rtp', 'Services.VoiceService.1.VoIPProfile.1.RTP.'),
          voipprofile_1_rtp_rtcp: this.store.peekRecord('services-voiceservice-voipprofile-rtp-rtcp', 'Services.VoiceService.1.VoIPProfile.1.RTP.RTCP.'),
          codecprofile_1: this.store.peekRecord('services-voiceservice-codecprofile', 'Services.VoiceService.1.CodecProfile.1.'),
          codecprofile_2: this.store.peekRecord('services-voiceservice-codecprofile', 'Services.VoiceService.1.CodecProfile.2.'),
          pots: this.store.peekRecord('services-voiceservice-pots', 'Services.VoiceService.1.POTS.'),
          pots_fxs_1_voiceprocessing: this.store.peekRecord('services-voiceservice-pots-fxs-voiceprocessing', 'Services.VoiceService.1.POTS.FXS.1.VoiceProcessing.'),

          sip_network_1: this.store.peekRecord('services-voiceservice-sip-network', 'Services.VoiceService.1.SIP.Network.1.'),
          sip_client_1: this.store.peekRecord('services-voiceservice-sip-client', 'Services.VoiceService.1.SIP.Client.1.'),

          ip_interface_2: this.store.peekRecord('ip-interface', 'IP.Interface.2.'),
          ip_interface_9: this.store.peekRecord('ip-interface', 'IP.Interface.9.'),

        }
      }
      catch (e){
        return {
          voiceservice_1: {},
          callcontrol_numberingplan_1: {},
          voipprofile_1: {},
          voipprofile_1_rtp: {},
          voipprofile_1_rtp_rtcp: {},
          codecprofile_1: {},
          codecprofile_2: {},
          pots: {},
          pots_fxs_1_voiceprocessing: {},

          sip_network_1: {},
          sip_client_1: {},

          ip_interface_2: {},
          ip_interface_9: {},

 }
      }
  }
}
