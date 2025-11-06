import Model, { attr } from '@ember-data/model';

export default class EthernetLinkModel extends Model {
    @attr Alias;
    @attr Enable;
    @attr FlowControl;
    @attr LastChange;
    @attr LowerLayers;
    @attr MACAddress;
    @attr Name;
}
