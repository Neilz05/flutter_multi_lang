import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionDHCPModel extends Model {
  @belongsTo('syslog-action-dhcp-logfile') LogFile;
}