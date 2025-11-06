import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionModel extends Model {
  @attr Alias
  @belongsTo('syslog-action-logfile') LogFile
}