import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthenticatedWifiEasyMeshController extends Controller {
    @service store;
    @service eaactrl;

    get easyMeshEnabled() {
        return this.getEasyMesh.get('Enable') == 1 ? true : false;
    }

    set easyMeshEnabled(enable) {
        this.getEasyMesh.set('Enable', enable == true ? 1 : 0 );
    }

    get getEasyMesh(){
        return this.store.peekRecord('wifi-x-000e50-multiap', 'WiFi.X_000E50_MultiAP.');
    }

    get hasChanges() {
        let isDirty = false;

        const easyMesh = this.store.peekRecord('wifi-x-000e50-multiap', 'WiFi.X_000E50_MultiAP.');
        if (easyMesh.hasDirtyAttributes) {
            isDirty = true;
        }

        return isDirty;
    }

    @action
    cancelEasyMesh() {
        const easyMesh = this.store.peekRecord('wifi-x-000e50-multiap', 'WiFi.X_000E50_MultiAP.');
        if (easyMesh.hasDirtyAttributes) easyMesh.rollbackAttributes();
    }

    @action
    updateWiFiEasyMesh(){
        const easyMesh = this.store.peekRecord('wifi-x-000e50-multiap', 'WiFi.X_000E50_MultiAP.');
        if (easyMesh.hasDirtyAttributes) {
            easyMesh.save().then(() => {
                window.location.reload();
            });
        }
    }
}
