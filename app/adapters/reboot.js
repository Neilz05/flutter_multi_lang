import ApplicationAdapter from './application';

export default class RebootAdapter extends ApplicationAdapter {
  urlForFindRecord(modelName, snapshot) {
    return '/serviceElements/Reboot.'; // just remove 'Device.'
  }
}
