import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';
export default class WiFiX000e50MultiApDeviceModel extends BaseModel {
 static sanitizedFields = []; //leave empty to sanitize all strings

  @attr Name;
  @attr MACAddress;
  @attr IPAddress;
  @attr AssociatedMACAddress;
  @attr Active;
  @attr Status;
  @attr Role;

  @attr({
    defaultValue() { return 'WiFi.X_000E50_MultiAP.Devices.'; }
  }) _namespace;
}

