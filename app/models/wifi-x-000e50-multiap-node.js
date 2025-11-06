import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class WiFiX000e50MultiAPNodeModel extends BaseModel {
  static sanitizedFields = []; // leave empty to sanitize all strings
  

  @attr Name;
  @attr SoftwareVersion;
  @attr SerialNumber;
  @attr MACAddress;
  @attr IPAddress;
  @attr Active;
  @attr BackhaulMACAddress;
  @attr BackhaulSignalStrength;
  @attr BackhaulLinkType;
  @attr Role;

  
  @attr({
    defaultValue() { return 'WiFi.X_000E50_MultiAP.Node.'; }
  }) _namespace;
}