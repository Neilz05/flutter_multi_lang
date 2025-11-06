import ApplicationAdapter from './application';
import { inject as service } from '@ember/service';

export default class Adapter extends ApplicationAdapter {
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
}