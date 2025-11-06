import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';

export default class AuthenticatedDMZController extends Controller {
    @service store;
    @service session;
    @service eaactrl;
    @tracked errorMsgText = '';

    get enabled() {
        const Enable = this.model.Upnp.Enable;
        const UPnPIGD = this.model.Upnp.UPnPIGD;
        if (Enable == 1){
           return UPnPIGD === 1 ? true : false;
        }
        return Enable === 1 ? true : false;
    }
    set enabled(value) {
        let enableValue = value ? 1 : 0;
        if(enableValue === 1){
            set(this.model.Upnp, 'Enable', enableValue);
            set(this.model.Upnp, 'UPnPIGD', enableValue);
        }else{
            set(this.model.Upnp,'UPnPIGD', enableValue);
        }
    }

    @action
    UpdateUPnP() {
        let upnp = this.model.Upnp;
        upnp.save().then(() => {
            // Success case - even for 204
            this.errorMsgText = '';
            return upnp.reload().catch(() => upnp);
        }).catch(error => {
            if (error
                && error.message
                && (error.message.includes('JSON.parse') || error.message.includes('Unexpected end of JSON input'))) {
                this.errorMsgText = '';
                return upnp.reload().catch(() => upnp);
            } else if (error) {
                this.errorMsgText = 'Failed to apply setting.';
                upnp.rollbackAttributes();
            }
        });
    }

    @action
    cancelUPnP() {
        if (this.model.Upnp.hasDirtyAttributes) this.model.Upnp.rollbackAttributes();
    }

    get hasChanges() {
        return this.model.Upnp.hasDirtyAttributes;
    }
}
