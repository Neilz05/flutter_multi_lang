import Model, { attr } from '@ember-data/model';

export default class OmciGemStatsModel extends Model {
  @attr GemTxFrames;
  @attr GemTxBytes;
  @attr GemRxFrames;
  @attr GemRxDisFrames;
  @attr GemRxBytes;
}
