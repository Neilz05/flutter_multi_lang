import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthenticatedWifiWpsController extends Controller {
    @service eaactrl

    constructor() {
        super(...arguments);
        this.eaactrl.setEaaTargetController(this);
    }

    get hasChanges() {
        let isDirty = false;
        this.model.AccessPoint.forEach((ap) => {
            if(ap.WPS.get('hasDirtyAttributes')){
                isDirty = true;
            }
        });
        return isDirty;
    }

    @action
    cancelWps() {
        this.model.AccessPoint.forEach((ap) => {
            if(ap.WPS.get('hasDirtyAttributes')){
                ap.WPS.then((wps) => {
                    wps.rollbackAttributes();
                });
            }
        });
    }

    @action
    updateWiFiWps(){
        this.model.AccessPoint.forEach((accesspoint) => {
            if(accesspoint.get('hasDirtyAttributes')){
                accesspoint.save().then(() => {
                    window.location.reload();
                });
            }
            if (accesspoint.get('WPS.hasDirtyAttributes')) {
                accesspoint.get('WPS').then((wps) => {
                    wps.save().then(() => {
                        window.location.reload();
                    });
                });
            }
        });
    }
}
