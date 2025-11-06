import Model, { attr } from '@ember-data/model';

export default class EthernetInterfaceStatsModel extends Model {
    @attr BytesReceived;
    @attr PacketsReceived;
    @attr ErrorsReceived;
    @attr DiscardPacketsReceived;
    @attr BytesSent;
    @attr PacketsSent;
    @attr ErrorsSent;
    @attr DiscardPacketsSent;
}
