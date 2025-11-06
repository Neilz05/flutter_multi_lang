import Model, { attr } from '@ember-data/model';

export default class OpticalInterfaceStatsModel extends Model {
  @attr PacketsSent;
  @attr DiscardPacketsSent;
  @attr PacketsReceived;
  @attr ErrorsReceived;
  @attr DiscardPacketsReceived;
}
