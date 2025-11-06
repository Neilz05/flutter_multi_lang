import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class OmciGemModel extends Model {
  @attr GemPortId;
  @attr GemDir;
  @attr GemType;
  @attr GemTcontID;
  @belongsTo('x-sc-omci-gem-stats') Stats;
}
