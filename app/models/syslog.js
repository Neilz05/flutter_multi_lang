import Model, { attr, belongsTo } from '@ember-data/model';

export default class SyslogModel extends Model {
  @hasMany('syslog-action') Action;
}