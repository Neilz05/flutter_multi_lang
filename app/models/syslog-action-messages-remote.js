import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionMessagesRemoteModel extends Model {
  @belongsTo('syslog-action-messages-remote-logfile') LogFile
}