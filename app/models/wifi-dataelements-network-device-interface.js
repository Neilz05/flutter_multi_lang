import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class WiFiDataelementsNetworkDeviceInterfaceModel extends Model {
  @attr NeighborNumberOfEntries;
  @attr MediaType;
  @attr Name;
  @attr Status;
  @attr MACAddress;
}
