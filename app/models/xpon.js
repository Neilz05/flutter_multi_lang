import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class GponModel extends Model {
  @attr ONUNumberOfEntries;
  @hasMany('xpon-onu') ONU;

  @attr({
    defaultValue() { return 'XPON.'; }
  }) _namespace;
}