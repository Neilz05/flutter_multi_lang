import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class ServicesVoiceserviceVoipprofileRTPModel extends Model {
    @attr "DSCPMark" 
    @attr "LocalPortMax" 
    @attr "LocalPortMin" 
		@belongsTo('services-voiceservice-voipprofile-rtp-rtcp') RTCP;
}
