import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
//import { storageFor } from 'ember-local-storage';
import sjcl from 'sjcl';
import config from 'prpl-webui/config/environment';

export default class LoginController extends Controller {
    @tracked errorMessage;
    @service session;
    @service intl;
    @service router;
    @service eaactrl;
    @tracked showPassword = false;
    autoLoginTimer = null;
    @tracked showPrompt = false;

    constructor() {
        super(...arguments);
        // Start the auto login timer when controller initializes
        localStorage.clear();
        sessionStorage.clear();
        this.setupAutoLogin();
    }

    setupAutoLogin() {
        // Clear any existing timer
        if (this.autoLoginTimer) {
            clearInterval(this.autoLoginTimer);
        }
    
        const startTime = Date.now();
        const duration = 30000; // 30 seconds in milliseconds
        const interval = 10000; // Check every second
    
        // Initial call
        /* this.autoLogin().catch(error => {
            console.error('Auto-login failed:', error);
        }); if release, then need to remove this*/ 
    
        // Set up interval to check every second
        this.autoLoginTimer = setInterval(async () => {
            if (Date.now() - startTime >= duration) {
                clearInterval(this.autoLoginTimer);
                this.showPrompt = true;
            } else {
                try {
                    await this.autoLogin();
                } catch (error) {
                    console.error('Auto-login failed:', error);
                   // clearInterval(this.autoLoginTimer); // Stop on error
                }
            }
        }, interval);
    }

    async autoLogin() {
        if (this.session && !this.session.isAuthenticated) {
            this.identification = 'admin';  // admin , peter 08/29
            this.password = 'admin';    // admin, peter 08/29
            await this.authenticate({ preventDefault: () => {} });
        }
    }

    willDestroy() {
        super.willDestroy();
        // Clean up the timer when component is destroyed
        if (this.autoLoginTimer) {
            clearInterval(this.autoLoginTimer);
        }
    }

    @action
    async authenticate(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        
        // Cancel the auto login timer if user logs in manually
        /* if (this.autoLoginTimer) {
            clearTimeout(this.autoLoginTimer);
            this.autoLoginTimer = null;
        } peter 08/29 */
        
        let { identification, password } = this;
        try {
            await this.session.authenticate(
                'authenticator:tr181RestApi',
                identification,
                password
            );
            if(config.APP.encryptionEnabled) {
                this.generateDk(password);
            }
        } catch (error) {
            console.error(error);
           // peter 08/29 autologin not need  this.errorMessage = error.error || 'Authentication failed';
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

    @action
    UpdateLanguage(value) {
        
        this.intl.setLocale([value]);
        
    }
}
