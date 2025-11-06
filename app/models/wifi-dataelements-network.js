import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';

export default class WiFiDataelementsNetworkModel extends Model {
  static sanitizedFields = []; // leave empty to sanitize all strings

  @attr AccessPointNumberOfEntries;
  @attr ControllerID;
  @attr DeviceNumberOfEntries;
  @attr ID;
  @attr TimeStamp;
  @hasMany('wifi-dataelements-network-device') Device;
  
  @attr({
    defaultValue() {
      return 'WiFi.DataElements.Network.';
    },
  })
  _namespace;
}
