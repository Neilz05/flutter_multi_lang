import Model, { attr, belongsTo } from '@ember-data/model';

export default class DnsRelayModel extends Model {
  @attr DNSServer;
}
