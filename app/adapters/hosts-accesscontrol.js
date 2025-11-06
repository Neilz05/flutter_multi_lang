import ApplicationAdapter from './application';
import { inject as service } from '@ember/service';

export default class HostAccessControlAdapter extends ApplicationAdapter {
    @service api;

    updateRecord(store, type, snapshot) {
        const changedAttributes = {}

        // include only dirty (changed) attributes
        Object.entries(snapshot.changedAttributes()).forEach(([key, [oldValue, newValue]]) => {
            changedAttributes[key] = newValue
        })

        return this.api.customFetch(`/serviceElements/Device.${snapshot.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ parameters: changedAttributes }),
        }).then((response) => {
            return null
        });

    }

    createRecord(store, type, snapshot) {

        const data = {}

        snapshot.eachAttribute((key) => {
            data[key] = snapshot.attr(key)
        })

        return this.api.customFetch(`/serviceElements/Device.Hosts.AccessControl.`, {
            method: 'POST',
            body: JSON.stringify({ parameters: data }),
        }).then(response => response.json());
    }



}