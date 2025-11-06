
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { camelize, capitalize } from '@ember/string';
import { encryptData, decryptData } from 'prpl-webui/utils/encryption';
import config from 'prpl-webui/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;
  @service store;
  @service api;

  namespace = 'serviceElements/Device.';
  //
  handleResponse(status, headers, payload, requestData) {
    //console.log('handleResponse response:', { status, headers, payload, requestData });
    if (sessionStorage.getItem('csrf_token')) {
      headers['X-CSRF-Token'] = sessionStorage.getItem('csrf_token');
    }
    return super.handleResponse(status, headers, payload, requestData);
  }
  //
  ajaxOptions(url, type, options) {
    let hash = super.ajaxOptions(url, type, options);
    //console.log('ajaxOptions Headers:', hash.headers);
    if (sessionStorage.getItem('csrf_token')) {
      hash.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf_token');
    }
    return hash;
  }
  //
  pathForType(type) {
    let result = '';
    Array.from(type.split('-')).forEach((chunk) => {
      result = result + capitalize(chunk) + '.';
    });
    return result;
  }

  @computed('session.data.authenticated.sessionID', 'session.isAuthenticated')
  get headers() {
    let headers = {
      'Content-Type': 'application/json',
    };

    if (this.session.isAuthenticated) {
      headers['Authorization'] = 'bearer ' + this.session.data.authenticated.sessionID;
    }
    if (sessionStorage.getItem('csrf_token')) {
      headers['X-CSRF-Token'] = sessionStorage.getItem('csrf_token');
    }
    return headers;
  }

  urlForFindAll(modelName, snapshot) {
    // get the correct TR-181 namespace to call the REST API

    //edge case for Firewall.DMZ


    let modelNamespace = this._getModelNamespace(modelName, snapshot);
    return this._buildURL(modelNamespace);
  }

  urlForFindRecord(id, modelName, snapshot) {
    let modelNamespace = this._getModelNamespace(modelName, snapshot);

    if (id) {
      if (modelNamespace.match(/(?<=X_PRPL-COM_).+/)) {
        id = 'X_PRPL-COM_' + id;
      }
      modelNamespace = '';
    }

    return this._buildURL(modelNamespace, id);
  }

  urlForUpdateRecord(id, modelName, snapshot) {
    let url = `/${this.namespace}${id}`
    return url
  }

  urlForCreateRecord(id, modelName, snapshot) {
    let modelNamespace = this._getModelNamespace(modelName, snapshot);

    let url = `/${this.namespace}${modelNamespace}`
    return url
  }

  urlForDeleteRecord(id, modelName, snapshot) {
    if (id.startsWith('Device.')) {
      id = id.substring(7);
    }
    let url = `/${this.namespace}${id}`
    return url
  }

  createRecord(store, type, snapshot) {
    console.log('createRecord snapshot:', snapshot);

    let data = this.serialize(snapshot, { includeId: false });
    let url = this.urlForCreateRecord(snapshot.id, type.modelName, snapshot)

    if (snapshot.adapterOptions && snapshot.adapterOptions.customID) {
      url = `/serviceElements/${snapshot.adapterOptions.customID}`
    }

    data['id'] = url.substring(17) + '+'

    for (let key in data.parameters) {
      if (key.startsWith("_"))
        delete data.parameters[key]
    }

    return this.api.customFetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(response => response.json());
  }

  updateRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });

    //modify snapshot id to remove Device. prefix if present
    if (snapshot.id.startsWith('Device.')) {
      snapshot.id = snapshot.id.substring(7);
    }

    let url = this.urlForUpdateRecord(snapshot.id, type.modelName, snapshot);

    let payload;
    for (let key in data.parameters) {
      if (key.startsWith('_')) {
        delete data.parameters[key];
      }
    }

    if (config.APP.encryptionEnabled) {
      payload = encryptData(data);
      //console.log('decrypt_data: ',decryptData(payload)); // For debugging, remove in production
    } else {
      payload = data;
    }

    return this.api.customFetch(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }).then(response => {
      // Handle 204 No Content responses (empty body)
      return null;
    });
  }

  queryRecord(store, type, snapshot) {
    return this.api.customFetch(`/${this.namespace}${snapshot.path}`, {
      method: 'GET'
    }).then(response => response.json());
  }

  query(store, type, snapshot) {
    return this.api.customFetch(`/${this.namespace}${snapshot.path}`, {
      method: 'GET'
    }).then(response => response.json());
  }

  deleteRecord(store, type, snapshot) {
    return this.api.customFetch(`/serviceElements/Device.${snapshot.id}`, {
      method: 'DELETE',
    }).then((response) => {
      return null
    });
  }

  /**
   retrieves the model's namespace from the _namespace attribute
   
   @method _getModelNamespace
   @private
   @param {String} modelName
   @param {Object} snapshot
   */
  _getModelNamespace(modelName, snapshot) {
    // get the correct TR-181 namespace to call the REST API
    let store = null;
    let modelNamespace = '';

    if (snapshot._recordArray) {
      store = snapshot._recordArray.store;
    } else {
      store = snapshot._store;
    }

    if (store) {
      let model = store.modelFor(modelName);
      if (model.attributes.has('_namespace')) {
        modelNamespace = model.attributes.get('_namespace').options.defaultValue();
      }
    }
    if (!modelNamespace) modelNamespace = this.pathForType(modelName);

    return modelNamespace;
  }

  /**
    @method _buildURL
    @private
    @param {String} modelNamespace
    @param {String} id
    @return {String} url
  */
  _buildURL(modelNamespace, id) {
    let { host } = this;

    // add the adapter's namespace
    let url = this.urlPrefix();

    // add the model's namespace
    if (modelNamespace) url = url + modelNamespace;

    // add trailing slash if needed
    if (!host && url && url.charAt(0) !== '/') url = '/' + url;

    // add the entry id
    if (id) url = url + id;

    return url;
  }
}
