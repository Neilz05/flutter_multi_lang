import Model, { attr, hasMany } from '@ember-data/model';

export default class DnsRelayModel extends Model {
  @attr Enable;
  @hasMany('dns-relay-forwarding') Forwarding;
}