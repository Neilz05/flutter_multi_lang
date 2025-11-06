import Model, { attr, hasMany } from '@ember-data/model';

export default class XPRPLCOMWanManagerModel extends Model {
  @hasMany('x-prpl-com-wanmanager-wan') WAN;
  @attr OperationMode;
  @attr WANMode;

  // @attr({
  //   defaultValue() { return 'WANManager.'; }
  // }) _namespace;
}
