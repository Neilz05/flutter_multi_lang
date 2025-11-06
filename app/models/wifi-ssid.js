import Model, { attr, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class WifiSsidModel extends BaseModel {
  static sanitizedFields = ['Alias','SSID']; // leave empty to sanitize all strings
  
  @attr Alias;
  @attr BSSID;
  @attr Enable;
  @attr Index;
  @attr MACAddress;
  @attr Name;
  @attr SSID;
  @attr Status;
  @belongsTo('wifi-ssid-stats') Stats;
  @belongsTo('wifi-radio') LowerLayers;
  @attr({
    defaultValue() { return 'WiFi.SSID.'; }
  }) _namespace;
}
