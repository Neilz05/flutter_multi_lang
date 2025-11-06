import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class XPRPLCOMPersistentConfigurationModel extends Model {
  @hasMany('persistentconfiguration-backupfile') BackupFile;
  @belongsTo('x-prpl-com-persistentconfiguration-config') Config;
  @attr BackupFileNumberOfEntries;
  @attr BackupStatus;
  @attr Enable;
  @attr Error;
  @attr MaxNumberOfDynamicFiles;
  @attr NumberOfDynamicFiles;
  @attr RestoreStatus;
  @attr ServiceNumberOfEntries;
  @attr Status;

  // @attr({
  //   defaultValue() { 
  //     console.log('does this get run?');
  //     return 'PersistentConfiguration.'; 
  //   }
  // }) _namespace;
}
