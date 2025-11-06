import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class IpInterfaceIpv6AddressModel extends Model {
  static sanitizedFields = []; // leave empty to sanitize all strings

  @attr Alias;
  @attr Anycast;
  @attr Enable;
  @attr IPAddress;
  @attr IPAddressStatus;
  @attr Origin;
  @attr PreferredLifeTime;
  @attr Status;
  @attr ValidLifeTime;
}
