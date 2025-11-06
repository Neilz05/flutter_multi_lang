import ApplicationAdapter from './application';

export default class PacketcapturediagnosticsAdapter extends ApplicationAdapter {
    urlForFindRecord(modelName, snapshot) {
        return '/serviceElements/PacketCaptureDiagnostics.';    // remove 'Device.'
    }

    urlForUpdateRecord(id, modelName, snapshot) {
        let baseUrl = super.urlForUpdateRecord(...arguments);
        return baseUrl.replace('Device.', '');  // remove 'Device.'
    }
}
