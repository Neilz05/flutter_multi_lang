import Model, { attr, hasMany } from '@ember-data/model';

export default class FirewallModel extends Model {
  @attr Enable;
  @attr PolicyLevel;
  @hasMany('firewall-dmz') DMZ;
}
