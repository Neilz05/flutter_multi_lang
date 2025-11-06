import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class XPRPLCOMPersistentConfigurationConfigSecurityModel extends Model {
  @attr EncryptKey;
  @attr EncryptUserFile;

  @attr({
    defaultValue() { return 'PersistentConfiguration.Config.Security.'; }
  }) _namespace;
}
