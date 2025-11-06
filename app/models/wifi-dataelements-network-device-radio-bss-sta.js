import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class WiFiDataelementsNetworkDeviceRadioBSSSTAModel extends Model {
  @attr UtilizationTransmit;
  @attr ErrorsSent;
  @attr MeasurementReportNumberOfEntries;
  @attr UtilizationReceive;
  @attr PacketsSent; 
  @attr BytesSent;
  @attr BytesReceived;
  @attr MACAddress;
  @attr LastConnectTime;
  @attr ErrorsReceived;
  @attr EstMACDataRateUplink;
  @attr IPV6Address;
  @attr Hostname;
  @attr LastDataDownlinkRate;
  @attr LastDataUplinkRate;
  @attr PacketsReceived;
  @attr SignalStrength;
  @attr TimeStamp;
  @attr EstMACDataRateDownlink;
  @attr IPV4Address;
  @attr RetransCount;
  @attr X_SC_LinkQuality;
}
