import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class IpInterfaceIpv4addressModel extends Model {
  static sanitizedFields = ["IPAddress", "SubnetMask"]; //leave empty to sanitize all strings

  @attr AddressingType;
  @attr('string', { readOnly: true }) Alias;
  @attr Enable;
  @attr IPAddress;
  @attr Status;
  @attr SubnetMask;
}
