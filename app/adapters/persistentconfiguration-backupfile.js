import ApplicationAdapter from './application';

export default class PersistentConfigurationAdapter extends ApplicationAdapter {
  // pathForType(type) {
  //   return 'PersistentConfiguration.BackupFile.';
  // }

  urlForFindAll(modelName, snapshot) {
    return '/serviceElements/PersistentConfiguration.BackupFile.';
  }
}
