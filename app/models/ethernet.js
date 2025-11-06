import Model, { attr, hasMany } from '@ember-data/model';

export default class EthernetModel extends Model {
    @hasMany('ethernet-link') Link;
    @hasMany('ethernet-interface') Interface;
    @hasMany('ethernet-vlantermination') VLANTermination;

    @attr({
        defaultValue() { return 'Ethernet.'; }
    }) _namespace;
}
