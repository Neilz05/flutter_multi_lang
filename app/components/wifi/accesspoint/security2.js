import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';
import sanitize from 'prpl-webui/utils/sanitize';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class WifiAccesspointSecurityComponent extends Component {
  @service intl;

  @tracked inputValue = sanitize(this.args.security?.get('KeyPassPhrase'));

  @tracked isModalOpen = false;
  @tracked newPassword = '';
  @tracked reenterPassword = '';
  @tracked ErrorMsg = '';

  get options_limitedtime() {
    let modes_str = "30|60|90|120|240|None";
    let modes = [];
    modes_str.split('|').forEach((mode) => {
      modes.push({ key: mode, label: mode });
    })
    return modes;
  }
  
  get options_allow() {
    let modes_str = "All services|Only navigation";
    let modes = [];
    modes_str.split('|').forEach((mode) => {
      modes.push({ key: mode, label: mode });
    })
    return modes;
  }

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

  /*@action
  handleInput(event) {
    let rawValue = event.target.value;
    if(this.args.security) {
      this.args.security.set('KeyPassPhrase', rawValue);
    }
  }*/

  @action
  setEncryptionMode(mode) {
    this.args.security.set('ModeEnabled', mode);
  }

  @action
  setLimitedTime(mode) {
    this.args.security.set('X_FASTWEB_MaximumTime', mode);
  }
  @action
  setAllow(mode) {
    this.args.security.set('X_FASTWEB_Allow', mode);
  }
  
  @action
  showChangePasswordModal() {
    this.isModalOpen = true;
    this.currentPassword = this.args.security.KeyPassPhrase;
  }

  @action
  closeModal() {
    this.isModalOpen = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.reenterPassword = '';
    this.ErrorMsg = '';
  }

  @action
  cancelPassword() {
     if(this.args.security) {
      this.args.security.set('KeyPassPhrase', this.currentPassword);
    }
     
    this.closeModal();
  }
  @action
  popuphandleInput(field, event) {
    this[field] = event.target.value;
  }

  @action
  savePassword() {
      
    this.ErrorMsg = '';

    if (this.newPassword !== this.reenterPassword) {
      this.ErrorMsg = this.intl.t('PAGE_GENERAL_PASSWORD_POPUP_PASSWORDS_DONT_MATCH');
      return;
    }
    

       // use validation functions
    if(this.args.security) {
      this.args.security.set('KeyPassPhrase', this.newPassword);
    }
  
    if (this.args.security.isValid){        
        this.closeModal();
    }


  }
  
  checkPasswordStrength(event) {
    let password = event.target.value;
    let strengthIndicator = document.getElementById("strength-indicator");
    let pswdStrength = document.getElementById("password-strength");
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (password.length < 8) {
      strengthIndicator.textContent = "Very Weak";
      strengthIndicator.className = "weak";
      pswdStrength.className = "strength0";
      
    } else if (strength >= 3) {
      strengthIndicator.textContent = "Strong";
      strengthIndicator.className = "strong";
      pswdStrength.className = "strength2"
    } else if (strength === 2) {
      strengthIndicator.textContent = "Medium";
      strengthIndicator.className = "medium";
      pswdStrength.className = "strength1"
    } else {
      strengthIndicator.textContent = "Weak";
      strengthIndicator.className = "weak";
      pswdStrength.className = "strength0"
    }
  }

}
