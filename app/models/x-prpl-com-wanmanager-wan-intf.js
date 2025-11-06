import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class XPRPLCOMWanManagerWanIntfModel extends BaseModel {

  static sanitizedFields = [];//leave empty to sanitize all strings

  @attr Alias;
  // @attr DefaultInterface;
  @attr IPv4Mode;
  @attr IPv6Mode;
  @attr Name;
  @attr Password;
  @attr Type;
  @attr UserName;
  @attr VlanID;
  @attr VlanPriority;
  // @attr X_SC_ServiceType;
  @attr IPv4Reference;
  // @belongsTo('ip-interface') IPv6Reference;
  @attr X_SC_VlanList;
}
