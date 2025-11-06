import Model, { attr, hasMany } from '@ember-data/model';

export default class HostsModel extends Model {
  @hasMany('hosts-host') Host;

  @attr({
    defaultValue() { return 'Hosts.'; }
  }) _namespace;
}
