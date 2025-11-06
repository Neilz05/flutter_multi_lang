import ApplicationAdapter from './application';

export default class IpAdapter extends ApplicationAdapter {
  pathForType(type) {
    return 'PPP.';
  }

  handleResponse(status, headers, payload, requestData) {
    //console.log(`Adapter type: ${this.constructor.name}`);
    //console.log('Raw API payload:', JSON.stringify(payload));  // Debug here!
    return super.handleResponse(status, headers, payload, requestData);
  }

  urlForFindAll(modelName, snapshot) {
    // get the correct TR-181 namespace to call the REST API
    //edge case for Firewall.DMZ
    let modelNamespace = this._getModelNamespace(modelName, snapshot);
    return `/serviceElements/Device.PPP.Interface.`;
  }
}
