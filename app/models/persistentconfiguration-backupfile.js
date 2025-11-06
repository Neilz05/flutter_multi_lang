import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class PersistentConfigurationBackupFileModel extends Model {
  @attr Alias;
  // @attr CreationDate;
  // @attr FileName;
  // @attr Tag;

  // @attr({
  //   defaultValue() { return 'PersistentConfiguration.BackupFile.'; }
  // }) _namespace;
}