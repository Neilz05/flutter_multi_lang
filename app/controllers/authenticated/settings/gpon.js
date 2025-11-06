import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class AuthenticatedNetworkGponController extends Controller {
    @service intl;
    @service eaactrl;

    @tracked GPONPasswordMsg = "";
    @tracked errorMsgText = "";

    get hasChanges() {
        let isDirty = false;

        this.model.xpon.ONU.forEach((onu, ind) => {
            if (ind == 0) {
                onu.ANI.forEach((ani, i) => {
                    if (i == 0) {
                        if (ani.get('TC.Authentication.hasDirtyAttributes')) {
                            isDirty = true;
                        }
                    }
                });
            }
        });

        return isDirty;
    }

    @action
    cancelGpon() {
        this.model.xpon.ONU.forEach((onu, ind) => {
            if (ind == 0) {
                onu.ANI.forEach((ani, i) => {
                    if (i == 0) {
                        if (ani.get('TC.Authentication.hasDirtyAttributes')) {
                            ani.get('TC.Authentication').then((auth) => {
                                auth.rollbackAttributes();

                                if (this.GPONPasswordMsg) {
                                    this.GPONPasswordMsg = '';
                                    return this.GPONPasswordMsg;
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    @action
    updateGpon() {
        this.model.xpon.ONU.forEach((onu, ind) => {
            if (ind == 0) {
                onu.ANI.forEach((ani, i) => {
                    if (i == 0) {
                        if (ani.get('TC.Authentication.hasDirtyAttributes')) {
                            ani.get('TC.Authentication').then((auth) => {
                                if(this.ValidGPONPassword(auth.Password)) {
                                    auth.save().then(() => {
                                        this.errorMsgText = '';
                                        return auth.reload().catch(() => auth);
                                    }).catch(error => {
                                        //if (!error || error.toString().includes('JSON.parse')) {
                                        if (error 
                                            && error.message 
                                            && (error.message.includes('JSON.parse') || error.message.includes('Unexpected end of JSON input'))) {
                                            this.errorMsgText = '';
                                            return auth.reload().catch(() => auth);
                                        } else if (error) {
                                            this.errorMsgText = 'Failed to apply setting.';
                                            auth.rollbackAttributes();
                                        }
                                    });
                                    this.GPONPasswordMsg = '';
                                } else {
                                    this.GPONPasswordMsg = this.intl.t('PAGE_GPON_PLOAM_PASSWORD_ERROR');
                                }

                                return this.GPONPasswordMsg;
                            });
                        }
                    }
                });
            }
        });
    }

    ValidGPONPassword(pass) {
        if(pass.length <= 10) {
            return true;
        } else if(pass.length == 20) {
            var rege = /^([0-9]|[a-f]|[A-F]){20}/;
            if(rege.test(pass)) return true;
        } else {
            return false;
        }
    }
}
