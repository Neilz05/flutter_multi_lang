import Model, { attr, belongsTo ,hasMany} from '@ember-data/model';

export default class Dhcpv4Model extends Model {
  @belongsTo('dhcpv4-server') Server;
  @hasMany('dhcpv4-client') Client;
}
