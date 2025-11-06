import Model, { attr } from '@ember-data/model';

export default class HostsHostWanstatsModel extends Model {
    @attr RxBytes;
    @attr RxPackets;
    @attr TxBytes;
    @attr TxPackets;
}
