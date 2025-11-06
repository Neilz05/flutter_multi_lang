import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AuthenticatedCallSettingsController extends Controller {
    @service store;

    get hasChanges() {
        let dirty = false;
        this.store.peekAll('services-voiceservice-callcontrol-callingfeatures-set').forEach((record) => {
            if (record.hasDirtyAttributes)
                dirty = true;
        })
        return dirty;
    }

    @action
    toggle(model, param) {
        model[param] = model[param] === 1 ? 0 : 1;
    }

    @action
    updateVoice() {
        this.store.peekAll('services-voiceservice-callcontrol-callingfeatures-set').forEach((record) => {
            if (record.hasDirtyAttributes)
                record.save();
        })
    }

    @action
    cancelPhone() {
        this.store.peekAll('services-voiceservice-callcontrol-callingfeatures-set').forEach((record) => {
            if (record.hasDirtyAttributes)
                record.rollbackAttributes();
        })
    }
}
