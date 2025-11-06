import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class SshModel extends Model {
  @hasMany('ssh-server') Server;

  @attr({
    defaultValue() { return 'SSH.'; }
  }) _namespace;
}
