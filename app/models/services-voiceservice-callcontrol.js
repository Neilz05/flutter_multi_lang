import Model, { attr, hasMany, belongsTo } from '@ember-data/model';


export default class ServicesVoiceserviceCallcontrolModel extends Model {
    @hasMany('services-voiceservice-callcontrol-line') Line;
		@hasMany('services-voiceservice-callcontrol-numberingplan') NumberingPlan;
}
