import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class SshServerModel extends Model {
  @attr Port;

  @attr({
    defaultValue() { return 'SSH.Server.'; }
  }) _namespace;
}
