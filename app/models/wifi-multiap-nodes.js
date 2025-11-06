import Model, { attr, belongsTo,hasMany } from '@ember-data/model';

export default class WiFiMultiAPNodesModel extends Model {
  @attr Name;
  @attr Active;
  @attr SoftwareVersion;
  @attr MACAddress;
  @attr IPAddress;
}
