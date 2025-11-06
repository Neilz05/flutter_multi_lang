import Model, { attr, belongsTo,hasMany } from '@ember-data/model';

export default class WiFiMultiAPModel extends Model {
  @attr Name;
  @belongsTo('wifi-multiap-steering') Steering;
  @hasMany('wifi-multiap-nodes') Nodes;
  @hasMany('wifi-multiap-devices') Devices;
  @attr({
      defaultValue() {
        return 'WiFi.MultiAP.';
      },
    })
    _namespace;
}
