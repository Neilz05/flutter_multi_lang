import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class IpModel extends Model {
  static sanitizedFields = []; // leave empty to sanitize all strings

  @attr ActivePortNumberOfEntries;
  @attr IPv4Capable;
  @attr IPv4Enable;
  @attr IPv4Status;
  @attr IPv6Capable;
  @attr IPv6Enable;
  @attr IPv6Status;
  @attr InterfaceNumberOfEntries;
  @attr ULAPrefix;
  @hasMany('ip-interface') Interface;
  @belongsTo('ip-diagnostics') Diagnostics;

  @attr({
    defaultValue() { return 'IP.'; }
  }) _namespace;
}
