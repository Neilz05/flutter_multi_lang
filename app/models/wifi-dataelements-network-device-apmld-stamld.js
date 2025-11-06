import Model, { attr, hasMany } from '@ember-data/model';

export default class WiFiDataelementsNetworkDeviceAPMLDSTAMLDModel extends Model {
  @attr MLDMACAddress;
  @attr IsbSTA;
  @attr Hostname;
  @attr IPv4Address;  
  @hasMany('wifi-dataelements-network-device-apmld-stamld-affiliatedsta') AffiliatedSTA;
}
