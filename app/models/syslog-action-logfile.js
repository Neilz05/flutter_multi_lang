import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionLogfileModel extends Model {
  @attr Enable
  @attr VendorLogFileRef
  @attr FilePath
}