import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class Dhcpv4ClientSentOptionModel extends Model {
@attr('string') Alias;
@attr() Enable;
@attr() Tag;
@attr() Value;
}
