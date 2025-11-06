import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class WiFiX000e50MultiAPModel extends Model {
    @attr Enable;
    @attr Name;
    @belongsTo ('wifi-x-000e50-multiap-steering') Steering;
    @hasMany('wifi-x-000e50-multiap-node') Node;
    @hasMany('wifi-x-000e50-multiap-devices') Devices;
    
    @attr({
        defaultValue() { return 'WiFi.X_000E50_MultiAP.'; }
    }) _namespace;
}
