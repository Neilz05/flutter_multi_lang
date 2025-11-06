import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class WiFiBandSteeringModel extends Model {
    @attr Enable

    @attr({
        defaultValue() { return 'WiFi.X_SC_BandSteering.'; }
    }) _namespace;
}
