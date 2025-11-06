import Adapter from '@ember-data/adapter';
import { inject as service } from '@ember/service';
import sanitize from 'prpl-webui/utils/sanitize';

export default class DeviceModuleAdapter extends Adapter {
    @service session;
    @service api;

    query(store, type, snapshot) {
        //console.log(`requesting /${this.namespace}${snapshot.path}`)
        return this.api.customFetch(`/serviceElements/${snapshot.path}`, {
            method: 'GET'
        }).then(response => response.json());
    }

    queryRecord(store, type, snapshot) {
        //console.log(`requesting /${this.namespace}${snapshot.path}`)
        return this.api.customFetch(`/serviceElements/${snapshot.path}`, {
            method: 'GET'
        }).then(response => response.json());
    }

    updateRecord(store, schema, snapshot) {
        const record = snapshot.record;

        const current = record.parameters || {};
        const backup = record._parametersBackup || {};
        const changedParameters = {};

        for (let key in current) {
            if (current[key] !== backup[key]) {
                changedParameters[key] = current[key];
            }
        }
        //sanitize changed parameters
        Object.keys(changedParameters).forEach((key) => {
            if(typeof changedParameters[key] === 'string') {
            changedParameters[key] = sanitize(changedParameters[key]);
            }
        })
        
        const payload = {
            parameters: changedParameters
        };

        /* //console.log('PATCH payload:', snapshot.id, payload); */

        return this.api.customFetch(`/serviceElements/${snapshot.id}`, {
            method: 'PATCH',
            body: JSON.stringify(payload)
        });
    }


    createRecord(store, schema, snapshot) {
        const record = snapshot.record;

        const current = record.parameters || {};

        const payload = {
            parameters: current
        };

        const customPath = snapshot.adapterOptions?.customPath;
        if (!customPath) {
            throw new Error('Missing customPath in adapterOptions');
        }

        /* //console.log('POST payload:', customPath, payload); */

        return this.api.customFetch(`/serviceElements/${customPath}`, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(response => response.json());
    }
    
    deleteRecord(store, schema, snapshot) {
        const id = snapshot.id;

        if (!id) {
            throw new Error('Missing ID on snapshot for deleteRecord');
        }

        return this.api.customFetch(`/serviceElements/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to delete ${id}: ${response.status}`);
            }
            return {}; // Ember expects a JSON response object
        });
    }


}