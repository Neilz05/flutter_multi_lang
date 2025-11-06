import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class OmciModel extends Model {
  @attr Enable; // REMOVE THIS
  @attr Title; // REMOVE THIS
  @hasMany('x-sc-omci-gem') Gem;
  @hasMany('x-sc-omci-tcont') Tcont;
  @belongsTo('x-sc-omci-stats') Stats;
}
