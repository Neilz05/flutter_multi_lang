import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class XPRPLCOMPersistentConfigurationConfigModel extends Model {
  @attr AutoSync;
  @attr BackupFileType;
  @belongsTo('persistentconfiguration-security') Security;

  @attr({
    defaultValue() { return 'PersistentConfiguration.Config.'; }
  }) _namespace;
}
