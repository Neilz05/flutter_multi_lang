import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthenticatedNetworkPasswordController extends Controller {
    @service eaactrl;
    @service session;

    get hasChanges() {
        let isDirty = false;
        if(this.model.admin !== null){
            if(this.model.admin.get('hasDirtyAttributes')){
                isDirty = true;
            }
        }
        if(this.model.enduser !== null){
            if(this.model.enduser.get('hasDirtyAttributes')){
                isDirty = true;
            }
        }
        return isDirty;
    }
    @action
    updatePassword(){
        let resolvedPromisesArray = [];
        if(this.model.admin !== null){
            if(this.model.admin.get('hasDirtyAttributes')){
                resolvedPromisesArray.push(this.model.admin);
            }
        }
        if(this.model.enduser !== null){
            if(this.model.enduser.get('hasDirtyAttributes')){
                resolvedPromisesArray.push(this.model.enduser);
            }
        }
        Promise.all(resolvedPromisesArray.map(record => record.save())).then((v) => {
            console.log(v);
            this.session.invalidate();
        }).catch(error => {
            if(error){
                console.error("Error saving records:", error);
            }else{
                this.session.invalidate();
            }
        });
    }
    @action
    cancelPassword() {
        if(this.model.admin !== null){
            if(this.model.admin.get('hasDirtyAttributes')){
                this.model.admin.rollbackAttributes();
            }
        }
        if(this.model.enduser !== null){
            if(this.model.enduser.get('hasDirtyAttributes')){
                this.model.enduser.rollbackAttributes();
            }
        }
    }
}