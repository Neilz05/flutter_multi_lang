import Model, { attr ,belongsTo, hasMany} from '@ember-data/model';

export default class XponOnuAniTCModel extends Model {
    @belongsTo('xpon-onu-ani-tc-alarms') Alarms;
    @belongsTo('xpon-onu-ani-tc-authentication') Authentication;
    @belongsTo('xpon-onu-ani-tc-gem') GEM;
    @belongsTo('xpon-onu-ani-tc-onuactivation') ONUActivation;
    @belongsTo('xpon-onu-ani-tc-pm') PM;
    @belongsTo('xpon-onu-ani-tc-performancethresholds') PerformanceThresholds; 
    @hasMany('xpon-onu-ani-tc-tcont') Tcont;
    @belongsTo('xpon-onu-ani-tc-omci') Omci;
}
