import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';
import config from 'prpl-webui/config/environment';

export default class AuthenticatedNetworkPasswordRoute extends Route {
    @service store;
    @service currentUser;
    modelType = 'Neutral';
    isSuperAdmin = false;
  
    beforeModel() {
        localStorage.setItem('tab', 'authenticated.settings.password');
        this.modelType = config.APP.modelType || 'Neutral';
        this.isSuperAdmin = this.currentUser.isSuperAdmin();
    }
    model() {
        //console.log("modelType:" + this.modelType);
        //console.log("isSuperAdmin:" + this.isSuperAdmin);
        if(this.modelType ==  'Neutral' || this.modelType == 'FG4278Av2' || this.modelType == 'FG4278Av2_VD'){
            if(this.isSuperAdmin){
                return RSVP.hash({
                    admin: this.store.queryRecord('users-user', { path: `Users.User.[Alias=="superadmin-user"].` }).then(
                        (admin) => {
                            return admin;
                        },
                        (err) => {
                            return {};
                        }
                    ),
                    enduser: this.store.queryRecord('users-user', { path: `Users.User.[Alias=="admin-user"].` }).then(
                        (root) => {
                            return root;
                        },
                        (err) => {
                            return {};
                        }
                    )
                });
            }else{
                return RSVP.hash({
                    admin: null,
                    enduser: this.store.queryRecord('users-user', { path: `Users.User.[Alias=="admin-user"].` }).then(
                        (root) => {
                            return root;
                        },
                        (err) => {
                            return {};
                        }
                    )
                });
            }
        }else{
            if(this.isSuperAdmin){
                return RSVP.hash({
                    admin: this.store.queryRecord('users-user', { path: `Users.User.[Alias=="root-user"].` }).then(
                        (admin) => {
                            return admin;
                        },
                        (err) => {
                            return {};
                        }
                    ),
                    enduser: this.store.queryRecord('users-user', { path: `Users.User.[Alias=="admin-user"].` }).then(
                        (root) => {
                            return root;
                        },
                        (err) => {
                            return {};
                        }
                    )
                });
            }else{
                return RSVP.hash({
                    admin: null,
                    enduser: this.store.queryRecord('users-user', { path: `Users.User.[Alias=="admin-user"].` }).then(
                        (root) => {
                            return root;
                        },
                        (err) => {
                            return {};
                        }
                    )
                });
            }
        }
    }
    //
}
