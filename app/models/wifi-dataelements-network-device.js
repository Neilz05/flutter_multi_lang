import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class WiFiDataelementsNetworkDeviceModel extends Model {
  @attr APMetricsReportingInterval;
  @attr BTMSteeringDisallowedSTAListNumberOfEntries;
  @attr CollectionInterval;
  @attr CountryCode;
  @attr DSCPMap;
  @attr ExecutionEnv;
  @attr ID;
  @attr SerialNumber;
  @attr InterfaceNumberOfEntries;
  @attr LocalSteeringDisallowedSTANumberOfEntries;
  @attr Manufacturer;
  @attr ManufacturerModel;
  @attr MaxPrioritizationRules;
  @attr MaxReportingRate;
  @attr MaxVIDs;
  @attr MultiAPProfile;
  @attr PrioritizationSupport;
  @attr RadioNumberOfEntries;
  @attr ReportUnsuccessfulAssociations;
  @attr SPRuleNumberOfEntries;

  @attr SoftwareVersion;
  @attr SupportsVBSS;
  @attr X_SC_IPV4Address;
  @attr X_SC_Hostname;
  @hasMany('wifi-dataelements-network-device-radio') Radio;
  @hasMany('wifi-dataelements-network-device-apmld') APMLD;
  @hasMany('wifi-dataelements-network-device-interface') Interface;
  @belongsTo('wifi-dataelements-network-device-multiapdevice') MultiAPDevice;
  @attr({
    defaultValue() { return 'WiFi.DataElements.Network.Device.'; }
  }) _namespace;
}
