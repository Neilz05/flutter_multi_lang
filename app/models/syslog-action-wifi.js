import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionWifiModel extends Model {
  @belongsTo('syslog-action-wifi-logfile') LogFile;
}