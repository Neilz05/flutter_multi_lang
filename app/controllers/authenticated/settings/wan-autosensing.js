import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class AuthenticatedSettingsWanAutosensingController extends Controller {
    @tracked wanAutosensingModalOpen = false;

    @action
    updateOperationMode(event) {
        this.model.OperationMode = event.target.value;
    }

    @action
    updateWanMode(event) {
        this.model.WANMode = event.target.value;
    }

    get hasChanges(){
        return this.model.hasDirtyAttributes ?? false;
    }

    @action
    updateWanAutosensing(){
        if (this.model.hasDirtyAttributes) {
            this.model.save()
            this.wanAutosensingModalOpen = true;

            setTimeout(() => {
                this.wanAutosensingModalOpen = false;
                this.isWANModeChanged = false;
            }, 5000);
        }
    }

    @action
    cancelWanAutosensing(){
        if (this.model.hasDirtyAttributes) this.model.rollbackAttributes();
    }
}
