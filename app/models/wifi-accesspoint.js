import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import BaseModel from './base';

export default class WiFiAccessPointModel extends BaseModel {
  static sanitizedFields = ['MaxAssociatedDevices', 'Alias']; // leave empty to sanitize all strings

  @attr APBridgeDisable;
  @attr ActiveAssociatedDeviceNumberOfEntries;
  @attr Alias;
  @attr ApRole;
  @attr BridgeInterface;
  @attr DefaultDeviceType;
  @attr DiscoveryMethodEnabled;
  @attr Enable;
  @attr IEEE80211kEnabled;
  @attr Index;
  @attr IsolationEnable;
  @attr MACFilterAddressList;
  @attr MBOEnable;
  @attr MCEnable;
  @attr MaxAssociatedDevices;
  @attr MultiAPType;
  @attr RadioReference;
  @attr RetryLimit;
  @attr SSIDAdvertisementEnabled;
  @attr Status;
  @attr UAPSDCapability;
  @attr UAPSDEnable;
  @attr WDSEnable;
  @attr WMMCapability;
  @attr WMMEnable;
  @attr dbgAPEnable;
  @attr dbgAPFile;
  @attr MACAddressControlEnabled;
  @attr CustomAlias;
  @belongsTo('wifi-accesspoint-security') Security;
  @belongsTo('wifi-ssid') SSIDReference;
  @hasMany('wifi-accesspoint-associateddevice') AssociatedDevice;
  @belongsTo('wifi-accesspoint-wps') WPS;
  @belongsTo('wifi-accesspoint-macfiltering', { async: false, inverse: null }) MACFiltering;
}
