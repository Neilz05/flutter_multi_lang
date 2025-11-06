import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class PPPModel extends Model {
  @hasMany('ppp-interface') Interface;
}
