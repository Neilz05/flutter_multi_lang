import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class OpticalModel extends Model {
  @hasMany('optical-interface') Interface;
  @attr Enable;

  @attr({
    defaultValue() { return 'Optical.'; }
  }) _namespace;
}
