import Model, { attr, belongsTo } from '@ember-data/model';

export default class WiFiDataelementsNetworkDeviceMultiAPDeviceBackhaulModel extends Model {
  @attr BackhaulDeviceID;
  @attr LinkType;
  @attr MACAddress;
  @attr X_Speedtest;
	@belongsTo('wifi-dataelements-network-device-multiapdevice-backhaul-stats') Stats;
}
