import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class OmciGemModel extends Model {
  @attr OmciTxFrames;
  @attr OmciRxFrames;
}
