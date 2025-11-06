import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionMessagesModel extends Model {
  @belongsTo('syslog-action-messages-logfile') LogFile
}