import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class WiFiDataelementsNetworkDeviceRadioModel extends Model {
  @attr APMetricsWiFi6;
  @attr AssociatedSTALinkMetricsInclusionPolicy;
  @attr AssociatedSTATrafficStatsInclusionPolicy;
  @attr BSSNumberOfEntries;
  @attr ChannelUtilizationReportingThreshold;
  @attr ChannelUtilizationThreshold;
  @attr ChipsetVendor;
  @attr CurrentOperatingClassesNumberOfEntries;
  @attr Enabled;
  @attr ID;
  @attr Noise;
  @attr RCPISteeringThreshold;
  @attr ReceiveOther;
  @attr ReceiveSelf;
  @attr STAReportingRCPIHysteresisMarginOverride;
  @attr STAReportingRCPIThreshold;
  @attr ScanResultNumberOfEntries;
  @attr SteeringPolicy;
  @attr TrafficSeparationCombinedBackhaul;
  @attr TrafficSeparationCombinedFronthaul;
  @attr Transmit;
  @attr UnassociatedSTANumberOfEntries;
  @attr Utilization;
  @hasMany('wifi-dataelements-network-device-radio-bss') BSS;
  @hasMany('wifi-dataelements-network-device-radio-currentoperatingclasses') CurrentOperatingClasses;
  @belongsTo('wifi-dataelements-network-device-radio-caccapability') CACCapability;
  @belongsTo('wifi-dataelements-network-device-radio-backhaulsta') BackhaulSta;
}
