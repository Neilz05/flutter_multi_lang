import Model, { attr, hasMany } from '@ember-data/model';
export default class XponOnuAniTCPMOPLOAMModel extends Model {
    @attr DownstreamMessageCount;
    @attr MICErrors;
    @attr RangingTime;
    @attr UpstreamMessageCount;
  }