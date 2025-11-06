import Model, { attr, belongsTo } from '@ember-data/model';

export default class Dhcpv6Model extends Model {
      @belongsTo('dhcpv6-server') Server;

      @attr({
            defaultValue() { return 'DHCPv6.'; }
      }) _namespace;
}
