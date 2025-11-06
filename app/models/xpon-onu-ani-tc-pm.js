import Model, { attr, belongsTo } from '@ember-data/model';
export default class XponOnuAniTCPMModel extends Model {
    @belongsTo('xpon-onu-ani-tc-pm-gem') GEM;
    @belongsTo('xpon-onu-ani-tc-pm-omci') OMCI;
    @belongsTo('xpon-onu-ani-tc-pm-phy') PHY;
    @belongsTo('xpon-onu-ani-tc-pm-ploam') PLOAM;
  }
