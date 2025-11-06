import Model, { attr, hasMany } from '@ember-data/model';

export default class WiFiDataelementsNetworkDeviceAPMLDModel extends Model {
  @attr MLDMACAddress
  @hasMany('wifi-dataelements-network-device-apmld-stamld') STAMLD;
}
