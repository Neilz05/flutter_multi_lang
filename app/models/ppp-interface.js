import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class PPPInterfaceModel extends BaseModel {
  static sanitizedFields = []; // leave empty to sanitize all strings

  @attr Alias;
  @attr Username;
  @attr Password;
  @attr Name;
  @attr AuthenticationProtocol;
  @attr ConnectionTrigger;
  @attr LCPEcho;
  @attr LCPEchoRetry;
  @attr MaxMRUSize;
  @attr IdleDisconnectTime;
  @belongsTo('ppp-interface-ipcp') IPCP;
  @attr Username
  @attr Password
  @attr LowerLayers;

  // @attr({
  //   defaultValue() { return 'PPP.Interface.'; }
  // }) _namespace;
}
