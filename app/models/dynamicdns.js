import Model, { attr, hasMany } from '@ember-data/model';

export default class DynamicdnsModel extends Model {
    @hasMany('dynamicdns-client') Client;
    @hasMany('dynamicdns-server') Server;

    @attr({
        defaultValue() { return 'DynamicDNS.'; }
    }) _namespace;
}