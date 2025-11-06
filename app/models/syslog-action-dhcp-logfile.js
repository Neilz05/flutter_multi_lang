import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionDHCPLogFileModel extends Model {
  @attr FilePath;
}