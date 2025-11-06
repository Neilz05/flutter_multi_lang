import Route from '@ember/routing/route';
import ENV from 'prpl-webui/config/environment';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
    @service session;
    @service intl
    @service store
    @service router
    @service wizard

    async beforeModel() {
        // call authenticator's restore to get the data 
/*
        //console.log(ENV.APP.modelType);
        if (ENV.APP.modelType == 'Neutral'|| ENV.APP.modelType == 'FG4278Bv3') {
            this.router.transitionTo('login');
          } else {
            this.router.transitionTo('login2');
          }
*/
        await this.session.setup()
        if (this.session.isAuthenticated) {
            try {
                const user = await this.store.queryRecord('users-user', { path: `Users.User.[Username=="${this.session.data.authenticated.username}"].` })
                this.intl.setLocale([user.Language || 'en-us'])
				
                this.session.doAuthenticatedRefresh(user);
            }
            catch (error) {
                this.session.invalidate()
            }
        }
        else {
            if (ENV.APP.modelType == 'Neutral'|| ENV.APP.modelType == 'FG4278Bv3') {
                this.intl.setLocale(['en-us']);
                }
            else {
                this.intl.setLocale(['it-it']);
            }
           // console.log(ENV.APP.modelType);
            if (ENV.APP.modelType == 'Neutral'|| ENV.APP.modelType == 'FG4278Bv3') {
                this.router.transitionTo('login');
              } else {
                this.router.transitionTo('login2');
              }
        }
    }

}
