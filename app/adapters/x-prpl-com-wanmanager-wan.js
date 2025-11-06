import ApplicationAdapter from './application';

export default class XPRPLCOMPersistentConfigurationAdapter extends ApplicationAdapter {
    urlForFindRecord(id, modelName, snapshot) {
        return `/serviceElements/${id}`;
    }

    urlForUpdateRecord(id, modelName, snapshot) {
        return `/serviceElements/${id}`;
    }
}