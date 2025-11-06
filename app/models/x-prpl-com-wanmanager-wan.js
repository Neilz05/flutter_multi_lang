import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';

export default class XPRPLCOMWanManagerWanModel extends BaseModel {
  static sanitizedFields = []; //leave empty to sanitize all strings

  @hasMany('x-prpl-com-wanmanager-wan-intf') Intf;
  @attr Alias;
  @attr PhysicalType;
  @attr Status;
  @attr Name;
}
