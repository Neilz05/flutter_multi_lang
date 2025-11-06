import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionFirewallLogFileModel extends Model {
  @attr FilePath;
}