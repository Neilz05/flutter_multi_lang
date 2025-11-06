import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class VoiceVoiceservicepotsModel extends Model {
    @attr "Region" ;
		@hasMany('services-voiceservice-pots-fxs') FXS;
}
