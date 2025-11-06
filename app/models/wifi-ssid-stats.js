import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class WifiSsidStatsModel extends BaseModel {
  static sanitizedFields = []; // leave empty to sanitize all strings
  
  @attr BroadcastPacketsReceived;
  @attr BroadcastPacketsSent;
  @attr BytesReceived;
  @attr BytesSent;
  @attr DiscardPacketsReceived;
  @attr DiscardPacketsSent;
  @attr ErrorsReceived;
  @attr ErrorsSent;
  @attr FailedRetransCount;
  @attr MulticastPacketsReceived;
  @attr MulticastPacketsSent;
  @attr MultipleRetryCount;
  @attr PacketsReceived;
  @attr PacketsSent;
  @attr RetransCount;
  @attr RetryCount;
  @attr UnicastPacketsReceived;
  @attr UnicastPacketsSent;
  @attr UnknownProtoPacketsReceived;
}
