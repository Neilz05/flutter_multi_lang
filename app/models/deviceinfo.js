import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class DeviceInfoModel extends BaseModel {
  static sanitizedFields = []; // leave empty to sanitize all strings

  @attr CID;
  @attr ModelName;
  @attr ModelNumber;
  @attr SerialNumber;
  @attr UpTime;
  @attr SoftwareVersion;
  @attr AdditionalSoftwareVersion;
  @attr ProductClass;
  @attr HardwareVersion;
  @attr UpTime;
  @attr 'X_PRPLWARE-COM_ClonedMACAddress';
  @belongsTo('deviceinfo-memorystatus', { async: true }) MemoryStatus;
  @belongsTo('deviceinfo-processstatus', { async: true }) ProcessStatus;
  @hasMany('deviceinfo-vendorconfigfile', { async: true }) VendorConfigFile;

 @attr({
  defaultValue() { return 'DeviceInfo.'; }
}) _namespace;
}
