import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionLCMModel extends Model {
  @belongsTo('syslog-action-lcm-logfile') LogFile
}