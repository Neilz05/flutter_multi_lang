import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';

export default class WiFiRadioDriverConfigModel extends BaseModel {
  static sanitizedFields = []; // leave empty to sanitize all strings
  
  @attr ChangeLogSize;
  @attr ClearedDfsChannels;
  @attr RadioStatus;
  @attr AcsBootChannel;
  @attr ChanspecShowing;
  @attr RadarTriggeredDfsChannels;
  @attr FragmentationThreshold;
  @attr RtsThreshold;
  @attr BroadcastMaxBwCapability;
  @attr Ampdu;
  @attr TxBurst;
  @attr Amsdu;
  @attr TPCMode;
  @attr VhtOmnEnabled;
  @attr TxBeamforming;
}
