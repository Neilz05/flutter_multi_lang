import Model, { attr } from '@ember-data/model';

export default class XponOnuAniStatsModel extends Model {
    @attr PacketsSent;
    @attr DiscardPacketsSent;
    @attr PacketsReceived;
    @attr DiscardPacketsReceived;
    @attr ErrorsReceived;
}
