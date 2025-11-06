import ApplicationAdapter from './application';


export default class Dhcpv4ServerPoolStaticaddressAdapter extends ApplicationAdapter {
    get headers() {
        return {
            ...super.headers,
            'Content-Type': 'application/json'
        };
    }

    urlForCreateRecord(id, modelName, snapshot) {
        let modelNamespace = this._getModelNamespace(modelName, snapshot);
        let url = `/${this.namespace}${modelNamespace}`.replace("*", snapshot._attributes._type)
        return url
    } 
}
