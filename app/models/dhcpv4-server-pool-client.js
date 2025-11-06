import Model, { attr, hasMany } from '@ember-data/model';

export default class Dhcpv4ServerPoolClientModel extends Model {
    @attr Chaddr;
    @attr Active;
    @hasMany('dhcpv4-server-pool-client-ipv4address') IPv4Address;
}
