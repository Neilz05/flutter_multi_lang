import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class VoiceStatusComponent extends Component {
  @service store

  get pairedData() {
    return this.args.voicestatus.VoiceService.map((voiceService) => {
      return voiceService.SIP.Client.map((client, index) => {
        return {
          client,
          line: voiceService.CallControl.Line[index],
        };
      });
    }).flat(); // Flatten if you want a single array instead of a nested structure
  }


 
  




}
