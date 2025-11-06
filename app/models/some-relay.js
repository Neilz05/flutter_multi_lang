import Model, { attr, belongsTo } from '@ember-data/model';

export default class DnsRelayModel extends Model {
  @attr Enable;
  @belongsTo('some-relay-forwarding') Forwarding;
}
