import ApplicationAdapter from './application';
import { inject as service } from '@ember/service';

export default class HostAccessControlAdapter extends ApplicationAdapter {
    @service api;

    createRecord(store, type, snapshot) {
        const data = {}
        snapshot.eachAttribute((key) => data[key] = snapshot.attr(key))

        return {
            attributes: data,
            path: `${snapshot.adapterOptions.customID}.X_PRPLWARE-COM_URLFilter.`
        }
    }
}