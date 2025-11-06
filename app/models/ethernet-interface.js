import Model, { attr, belongsTo } from '@ember-data/model';

export default class EthernetInterfaceModel extends Model {
    @attr Alias;
    @attr CurrentBitRate;
    @attr MACAddress;
    @attr Status;
    @attr Name;
    @attr Upstream;
    @attr DuplexMode;
    @attr MaxBitRate;
    @belongsTo('ethernet-interface-stats') Stats;
}
