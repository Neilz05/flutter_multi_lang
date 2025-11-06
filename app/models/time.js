import Model, { attr, hasMany } from '@ember-data/model';

export default class TimeModel extends Model {
  @attr CurrentLocalTime;
  @attr LocalTimeZone;
  @hasMany('time-client') Client;

  @attr({
    defaultValue() { return 'Time.'; }
  }) _namespace;
}

