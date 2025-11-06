import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class OmciTcontModel extends Model {
  @attr ID;
  @attr AllocID;
  @attr TxGemFrames;
}
