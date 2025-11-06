import Model, { attr, belongsTo } from '@ember-data/model';

export default class DnsRelayModel extends Model {
  @belongsTo('some-relay-forwarding-dhcpv4') 'dhcpv4-1';
  @belongsTo('some-relay-forwarding-dhcpv4') 'dhcpv4-2';
  @belongsTo('some-relay-forwarding-ppp') 'ppp-1';
  @belongsTo('some-relay-forwarding-ppp') 'ppp-2';
}
