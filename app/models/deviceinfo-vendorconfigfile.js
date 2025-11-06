import Model, { attr } from '@ember-data/model';

export default class DeviceInfoVendorConfigFileModel extends Model {
  @attr Date;
  @attr UseForBackupRestore;
  @attr Name;
  @attr Alias;
  @attr Version;
  @attr Description;
}
