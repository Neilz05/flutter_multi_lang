import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking'; 

export default class AuthenticatedDashboardController extends Controller {
    @service store;
    
    get hasChanges() {
        return this.store.peekAll('nat-portmapping').find(entry => {
            return entry.isNew || entry.isDeleted || entry.hasDirtyAttributes;
        });
    }

    @action
    Apply(){
        this.store.peekAll('nat-portmapping').forEach(entry => {
            if (entry.isNew || entry.hasDirtyAttributes || entry.isDeleted) {
                entry.save()
            } 
        });
    }

    @action
    Cancel(){
        this.store.peekAll('nat-portmapping').forEach(entry => {
            entry.rollbackAttributes()
        });
    }
}




