import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AuthenticatedBlockingController extends Controller {
    @service store

    @action
    toggle(model, param){
        model[param] = model[param] === 1 ? 0 : 1;
    }

    get HasChanges(){
        return this.model.outgoingsettings.hasDirtyAttributes || this.model.incomingsettings.hasDirtyAttributes || 
        this.model.outgoingnumbers.find(md => md.hasDirtyAttributes || md.isDeleted) || this.model.incomingnumbers.find(md => md.hasDirtyAttributes || md.isDeleted);
    }

    @action
    deleteNumber(md){
        md.deleteRecord()
    }

    @action
    createIncomingBlock(){
        this.store.createRecord('services-voiceservice-callcontrol-x-prplware-com-numberblocking-incomingblocking-rules')
    }

    @action
    createOutgoingBlock(){
        this.store.createRecord('services-voiceservice-callcontrol-x-prplware-com-numberblocking-outgoingblocking-rules')
    }

    @action
    Apply(){
        if (this.model.outgoingsettings.hasDirtyAttributes){
            this.model.outgoingsettings.save();
        }    
        this.model.outgoingnumbers.forEach(md => {
            if (md.hasDirtyAttributes || md.isDeleted) md.save();
        });

        if (this.model.incomingsettings.hasDirtyAttributes){
            this.model.incomingsettings.save();
        }
        this.model.incomingnumbers.forEach(md => {
            if (md.hasDirtyAttributes || md.isDeleted) md.save();
        }); 
    }

    @action
    Cancel(){
        this.model.outgoingsettings.rollbackAttributes();
        this.model.incomingsettings.rollbackAttributes();
        this.model.outgoingnumbers.forEach(md => {
            if (md.hasDirtyAttributes || md.isDeleted) md.rollbackAttributes();
        });
        this.model.incomingnumbers.forEach(md => {
            if (md.hasDirtyAttributes || md.isDeleted) md.rollbackAttributes();
        });
    }
}