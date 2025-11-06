import Service from 'ember-simple-auth/services/session';
import ENV from 'prpl-webui/config/environment';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
    @service router
    @service store
    @service intl
    @service wizard
    @service currentUser
    @service api;

    absoluteTimeoutId = null;
    idleTimeoutId = null;

    sessionCheckIntervalId = null;
    absoluteIntervalId = null;
    idleIntervalId = null;

    absoluteExpiresAt = null;
    idleExpiresAt = null;

    _activityHandler = null;

    userID = null;
    sessionPath = null;
    sessionStatus = null;

    async handleAuthentication() {
        console.log("handleAuthentication");
        console.log(ENV.APP.modelType);
        /* if (ENV.APP.modelType == 'FG4278Av2' || ENV.APP.modelType == 'FG4278Av2_VD')
        {
            const xx = await this.store.queryRecord('x-fastweb-appcfg', { path: 'X_FASTWEB_AppCfg.' });
            if(xx.FastWebUI == 0){
                
                this.data.authenticated.username = "root";
            }

        } peter 09/10 Saxon say data mode is not ready */
        console.log(this.data.authenticated.username);
          
        this.store.queryRecord('users-user', {
            path: `Users.User.[Username=="${this.data.authenticated.username}"].`
        }).then((user) => {
            //console.log('handleAuthentication for user:', user);
            this.userID = user['id'];
            this.currentUser.uiMode = user['X_PRPL-COM_WUIMode'];
            this.currentUser.queryUserLevel(user);
            if (ENV.APP.modelType == 'FG4278Av2' || ENV.APP.modelType == 'FG4278Av2_VD')
            {
                this.intl.setLocale([user.Language || 'it-it']);       // peter 10/13 '25  change en-us to it-it
            }
            else
            {
                this.intl.setLocale([user.Language || 'en-us']);       // peter 10/13 '25  change en-us to it-it
            }

            this.setupTimeouts();
        }).catch((error) => {
            //console.error('Failed to fetch user or set locale:', error);
            this.invalidate();
        });

        this.store.queryRecord('captiveportal', { path: 'CaptivePortal.' }).then((e) => {
            if (e.Enable === 1 && (ENV.APP.modelType == 'Neutral' || ENV.APP.modelType == 'FG4278Bv3')) {
                this.wizard.initWizard()
                this.router.transitionTo('wizard.wanMode');
            } else {
                this.router.transitionTo('authenticated.dashboard');
            }
        }).catch((error) => {
            //console.log(error)
            this.router.transitionTo('authenticated.dashboard');
        });
    }
    
    doAuthenticatedRefresh(user){
        //console.log('doAuthenticatedRefresh for user:', user);
        this.userID = user['id'];
        this.currentUser.uiMode = user['X_PRPL-COM_WUIMode'];
        this.currentUser.queryUserLevel(user);

        this.setupTimeouts();	
    }
    

    setupTimeouts() {
        const absoluteTimeout = this.data.authenticated?.absoluteTimeout;
        const idleTimeout = this.data.authenticated?.idleTimeout;
        const sessionCheckTimeout = 30;


        //shorter value for debug testing
        /* const absoluteTimeout = 500;
        const idleTimeout = 100; */

        if (absoluteTimeout) {
            this.setupAbsoluteTimeout(absoluteTimeout);
        }

        if (idleTimeout) {
            this.setupIdleTimeout(idleTimeout);
        }

        if (sessionCheckTimeout) {
            this.setupSessionCheckTimeout(sessionCheckTimeout);
        }

    }

    setupSessionCheckTimeout(timeoutInSeconds) {
        this.clearSessionCheckTimeout();

        this.checkAccessSession();
        this.sessionCheckIntervalId = setInterval(() => {
            this.checkAccessSession();
        }, timeoutInSeconds * 1000);
    }

    setupAbsoluteTimeout(timeoutInSeconds) {
        this.clearAbsoluteTimeout();

        this.absoluteExpiresAt = Date.now() + timeoutInSeconds * 1000;

        this.absoluteTimeoutId = setTimeout(() => {
            console.warn('Session expired (absolute timeout).');
            this.invalidate();
        }, timeoutInSeconds * 1000);

        this.absoluteIntervalId = setInterval(() => {
            const remaining = Math.max(0, this.absoluteExpiresAt - Date.now());
            //console.log(`[Absolute Timeout] Remaining: ${Math.ceil(remaining / 1000)}s`);
        }, 5000);
    }

    setupIdleTimeout(timeoutInSeconds) {
        this.clearIdleTimeout();

        const reset = () => {
            this.clearIdleTimeoutTimers();

            this.idleExpiresAt = Date.now() + timeoutInSeconds * 1000;

            this.idleTimeoutId = setTimeout(() => {
                console.warn('Session expired due to inactivity.');
                this.invalidate();
            }, timeoutInSeconds * 1000);

            this.idleIntervalId = setInterval(() => {
                const remaining = Math.max(0, this.idleExpiresAt - Date.now());
                //console.log(`[Idle Timeout] Remaining: ${Math.ceil(remaining / 1000)}s`);
            }, 5000);
        };

        this._activityHandler = reset;

        ['mousemove', 'keydown', 'scroll', 'click'].forEach(event =>
            window.addEventListener(event, reset)
        );

        reset(); // initialize timer
    }

    clearSessionCheckTimeout() {
        if (this.sessionCheckIntervalId) clearInterval(this.sessionCheckIntervalId);

        this.sessionCheckIntervalId = null;
    }

    clearAbsoluteTimeout() {
        if (this.absoluteTimeoutId) clearTimeout(this.absoluteTimeoutId);
        if (this.absoluteIntervalId) clearInterval(this.absoluteIntervalId);

        this.absoluteTimeoutId = null;
        this.absoluteIntervalId = null;
        this.absoluteExpiresAt = null;
    }

    clearIdleTimeout() {
        this.clearIdleTimeoutTimers();

        if (this._activityHandler) {
            ['mousemove', 'keydown', 'scroll', 'click'].forEach(event =>
                window.removeEventListener(event, this._activityHandler)
            );
            this._activityHandler = null;
        }
    }

    clearIdleTimeoutTimers() {
        if (this.idleTimeoutId) clearTimeout(this.idleTimeoutId);
        if (this.idleIntervalId) clearInterval(this.idleIntervalId);

        this.idleTimeoutId = null;
        this.idleIntervalId = null;
        this.idleExpiresAt = null;
    }

    clearAllTimeouts() {
        this.clearAbsoluteTimeout();
        this.clearIdleTimeout();
        this.clearSessionCheckTimeout();
    }

    async checkAccessSession(){
      const isSessionOk = await this.isSessionAccessable();

      if (isSessionOk){
        //console.log("Session is still alive");
      }else{
        console.warn("Session is out");
        this.clearSessionCheckTimeout();
        this.router.transitionTo('sessionend')
        //this.invalidate();
      }

    }

    async isSessionAccessable(){
        var dataPath = 'UserInterface.HTTPAccess.';
        if (this.sessionPath == null) {
            let HTTPAccess = await this.store.query('userinterface-httpaccess', { path: dataPath }, { reload: true });
            //console.log("HTTPAccess:", HTTPAccess);
            //get latest start date session
            let timestamp = 0;
            HTTPAccess.forEach((item) => {
                if(item.StartDate){
                    if(item.User == this.userID.slice(0, -1)){
                        let ts = new Date(item.StartDate).getTime();
                        if (ts > timestamp) {
                            timestamp = ts;
                            this.sessionPath = item.id;
                            this.sessionStatus = item.Status;
                        }
                    }
                }
            });
            //get latest start date session end
            //console.log("current sessionPath:", this.sessionPath);
            //console.log("current sessionStatus:", this.sessionStatus);
        } else {
            let HTTPAccess = await this.store.queryRecord('userinterface-httpaccess-session', { path: this.sessionPath }, { reload: true });
            //console.log("HTTPAccess:", HTTPAccess);
            this.sessionStatus = HTTPAccess.Status;
            //console.log("current sessionPath:", this.sessionPath);
            //console.log("current sessionStatus:", this.sessionStatus);
        }
        return (this.sessionStatus == "Active");
    }

    async invalidate() {
        let command = this.sessionPath + 'Delete()';
        this.api.customFetch('/commands', {
            method: 'POST',
            body: JSON.stringify({command: command})
        })
        .then(response => {
            console.log('Delete User response status:', response.status);
            this.invalidateRedirect();
        })
        .catch(error => {
            console.error('Error during Delete User fetch:', error);
            this.invalidateRedirect();
        });
    }

    invalidateRedirect() {
        //console.log("Redirect to login page");
        this.clearAllTimeouts();
        return super.invalidate(...arguments);
    }
}