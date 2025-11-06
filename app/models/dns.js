import Model, { attr, belongsTo } from '@ember-data/model';

export default class DnsModel extends Model {
  @belongsTo('dns-relay') Relay;
}
