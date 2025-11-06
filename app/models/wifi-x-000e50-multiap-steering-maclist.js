import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';
export default class WiFiX000e50MultiApSteeringMaclistModel extends BaseModel {
 static sanitizedFields = []; //leave empty to sanitize all strings

  @attr MACAddress;
  @attr Policy;

}

