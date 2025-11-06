import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionFirewallModel extends Model {
  @belongsTo('syslog-action-firewall-logfile') LogFile;
}