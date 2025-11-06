import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class NatInterfaceSettingModel extends BaseModel {
  static sanitizedFields = []; //leave empty to sanitize all strings

  @attr Alias;
  @attr Status;
  @attr Enable;

  @attr({
    defaultValue() { return 'NAT.InterfaceSetting'; }
  }) _namespace;
}
