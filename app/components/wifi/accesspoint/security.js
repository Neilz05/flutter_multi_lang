import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';
import sanitize from 'prpl-webui/utils/sanitize';
import { tracked } from '@glimmer/tracking';

export default class WifiAccesspointSecurityComponent extends Component {
  @tracked inputValue = sanitize(this.args.security?.get('KeyPassPhrase'));

  get encryptionModes() {
    // let modes_str = "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise"
    let modes_str = "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal";
    let modes = [];
    /* this.args.security
      .get('ModesSupported')
      .split(',')
      .forEach((mode) => {
        modes.push({ key: mode, label: mode });
      }); */
    modes_str.split(',').forEach((mode) => {
      modes.push({ key: mode, label: mode });
    })
    return modes;
  }

  

  get isWep() {
    let mode = this.args.security.get('ModeEnabled');
    return mode === 'WEP-64' || mode === 'WEP-128' ? true : false;
  }

  get isWpa() {
    let mode = this.args.security.get('ModeEnabled');
    return mode === 'WPA2-Personal' ||
      mode === 'WPA3-Personal' ||
      mode === 'WPA2-WPA3-Personal'
      ? true
      : false;
  }

  get isSae() {
    let mode = this.args.security.get('ModeEnabled');
    return mode === 'WPA3-Personal' || mode === 'WPA3-Personal-Transition'
      ? true
      : false;
  }

  @action
  handleInput(event) {
    let rawValue = event.target.value;
    if(this.args.security) {
      this.args.security.set('KeyPassPhrase', rawValue);
    }
  }

  @action
  setEncryptionMode(mode) {
    this.args.security.set('ModeEnabled', mode);
  }
}
