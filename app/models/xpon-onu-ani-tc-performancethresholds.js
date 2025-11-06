import Model, { attr, hasMany } from '@ember-data/model';
export default class XponOnuAniTCPerformanceThresholdsModel extends Model {
    @attr SignalDegrade;
    @attr SignalFail;
  }