import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
//import { storageFor } from 'ember-local-storage';
import sjcl from 'sjcl';
import config from 'prpl-webui/config/environment';

export default class LoginController extends Controller {
    @tracked errorMessage
    @service session
    @service router
    @service eaactrl;
    @tracked showPassword = false;

    constructor() {
        super(...arguments);
        this.modelType = config.APP.modelType || 'Neutral';
    }

    /* loadSessionData() {
      const sessionData = sessionStorage.getItem('credentials');
      if (sessionData) {
        const { identification, password } = JSON.parse(sessionData);
        this.identification = identification;
        this.password = password;
        //console.log('Restoring session data from sessionStorage', JSON.parse(sessionData));
        // Optionally auto-authenticate
        this.authenticateWithStoredCredentials();
      }
    }
  
    async authenticateWithStoredCredentials() {
      const sessionData = sessionStorage.getItem('credentials');
      const { identification, password } = JSON.parse(sessionData);
      this.identification = identification;
      this.password = password;
      if (this.identification && this.password) {
        try {
          await this.session.authenticate(
            'authenticator:tr181RestApi',
            this.identification,
            this.password
          );
  
          // Handle successful authentication
          if (this.session.isAuthenticated) {
            // Optional: Redirect or update UI
            // e.g., this.transitionToRoute('some.route');
          }
        } catch (error) {
          this.errorMessage = error.error || 'Authentication failed';
        }
      }
    } */

    @action
    async authenticate(e) {
        e.preventDefault();
        let { identification, password } = this;
        try {
            await this.session.authenticate(
                'authenticator:tr181RestApi',
                identification,
                password
            )
            if(config.APP.encryptionEnabled) {this.generateDk(password);}
        } catch (error) {
            console.error(error)
            this.errorMessage = error.error || 'Authentication failed';
            this.eaactrl.setEaaWarningPolite(this.errorMessage);
        }
    }

    @action
    updateIdentification(e) {
        this.identification = e.target.value;
    }

    @action
    updatePassword(e) {
        this.password = e.target.value;
    }

    generateSalt(bits = 128) {  //remove this implementation if the fw provide the node location for 'salt'.
      const randomWords = sjcl.random.randomWords(bits / 32);
      return sjcl.codec.hex.fromBits(randomWords);
    }
    generateDk(password) {
      let passwordSalt = sjcl.codec.hex.toBits(this.generateSalt());
      let derivedKey = sjcl.misc.pbkdf2(password, passwordSalt, 1000, 256);
      let dk_hex = sjcl.codec.hex.fromBits(derivedKey);
      sessionStorage.setItem("dk", dk_hex);
    }

    @action
    eyeControl(e) {
        e.preventDefault()
        this.showPassword = !this.showPassword;
    }
}
