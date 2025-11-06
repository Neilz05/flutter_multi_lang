import Model, { attr, belongsTo,hasMany } from '@ember-data/model';

export default class WiFiMultiAPDevicesModel extends Model {
  @attr Name;
  @attr Active;
  @attr AssociatedMACAddress;
  @attr MACAddress;
  @attr IPAddress;
}
