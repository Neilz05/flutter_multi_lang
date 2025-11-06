import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class WiFiX000e50MultiAPModel extends Model {
    @attr BandSteeringEnable;
    @hasMany('wifi-x-000e50-multiap-steering-maclist') MacList;

    @attr({
        defaultValue() { return 'WiFi.X_000E50_MultiAP.Steering.'; }
    }) _namespace;
}
