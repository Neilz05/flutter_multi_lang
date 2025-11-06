import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class WiFiDataelementsNetworkDeviceRadioBSSModel extends Model {
  @attr BSSID;
  @attr BackhaulUse;
  @attr BroadcastBytesReceived;
  @attr BroadcastBytesSent;
  @attr ByteCounterUnits;
  @attr Enabled;
  @attr EstServiceParametersBE;
  @attr EstServiceParametersBK;
  @attr EstServiceParametersVI;
  @attr EstServiceParametersVO;
  @attr FronthaulUse;
  @attr IsVBSS;
  @attr LastChange;
  @attr MulticastBytesReceived;
  @attr MulticastBytesSent;
  @attr SSID;
  @attr STANumberOfEntries;
  @attr TimeStamp;
  @attr UnicastBytesReceived;
  @attr UnicastBytesSent;
  @belongsTo('wifi-dataelements-network-device-radio-bss-multiapsteering') MultiAPSteering;
  @hasMany('wifi-dataelements-network-device-radio-bss-sta') STA;
}
