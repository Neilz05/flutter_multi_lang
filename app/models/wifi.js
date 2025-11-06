import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class WiFiModel extends Model {
  static sanitizedFields = []; // leave empty to sanitize all strings

  @belongsTo ('wifi-scheduler') scheduler
  @attr X_SC_SSIDIsolation
  @attr X_SC_CustomSSIDSplit
  @attr X_SC_CompatSSIDSplit
  @belongsTo ('wifi-xscmacfilter') X_SC_MACFilter
  @belongsTo ('wifi-x-sc-bandsteering') X_SC_BandSteering
  @belongsTo ('wifi-x-000e50-multiap') X_000E50_MultiAP
  @hasMany ('wifi-radio') Radio
  @hasMany ('wifi-ssid') SSID
  @hasMany ('wifi-accesspoint') AccessPoint

  @attr X_SC_SSIDSplit

  // old attributes in the previous prpl, not defined in the spec
  @belongsTo('wifi-dataelements') DataElements;
  @belongsTo('wifi-multiap') MultiAP;
  
  /*
  @attr wps_trigger;
  @hasMany('wifi-accesspoint') AccessPoint;
  @hasMany('wifi-radio') Radio;
  @hasMany('wifi-ssid') SSID;
  @hasMany('wifi-xscmacfiltertable') X_SC_MacFilterTable;
  @belongsTo('wifi-xscbandsteering') X_SC_BandSteering;
  @belongsTo('wifi-xscmacfilter') X_SC_MACFilter; */

  @attr({
    defaultValue() { return 'WiFi.'; }
  }) _namespace;
}
