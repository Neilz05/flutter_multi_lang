import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class Dhcpv4ClientModel extends Model {
@attr('string') DNSServers;
@attr('string') Alias;
@hasMany('dhcpv4-client-sentoption') SentOption;
}
