import Model, { attr, belongsTo } from '@ember-data/model';

export default class WiFiDataelementsNetworkDeviceMultiAPDeviceModel extends Model {
  @belongsTo ('wifi-dataelements-network-device-multiapdevice-backhaul') Backhaul;
}
