import Model, { attr, belongsTo,hasMany } from '@ember-data/model';

export default class WiFiMultiAPSteeringModel extends Model {
  @hasMany('wifi-multiap-steering-maclist') MacList;

}
