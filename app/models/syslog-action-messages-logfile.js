import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogActionMessagesLogFileModel extends Model {
  @attr FilePath
}