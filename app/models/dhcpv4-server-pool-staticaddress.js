import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class Dhcpv4ServerPoolStaticAddressModel extends BaseModel {
  static sanitizedFields = ["Alias", "Chaddr", "Yiaddr"]; //leave empty to sanitize all strings

  @attr Alias;
  @attr Chaddr;
  @attr Yiaddr;
  @attr Enable;

  
  @attr({
    defaultValue() { return 'DHCPv4.Server.Pool.*.StaticAddress.'; }
  }) _namespace;

  // extra value denoting if its 'lan', 'guest', or any alias in Device.DHCPv4.Server.Pool.*.
  @attr _type
}
