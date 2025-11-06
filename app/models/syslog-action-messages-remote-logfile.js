import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionMessagesRemoteLogFileModel extends Model {
  @attr FilePath
}