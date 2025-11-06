import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class ServicesVoiceserviceModel extends Model {
    @belongsTo('services-voiceservice-capabilities') Capabilities;
    @belongsTo('services-voiceservice-callcontrol') CallControl;
    @belongsTo('services-voiceservice-sip') SIP;
		@hasMany('services-voiceservice-voipprofile') VoIPProfile;
		@hasMany('services-voiceservice-codecprofile') CodecProfile;
		@belongsTo('services-voiceservice-pots') POTS;
		@attr "X_PRPLWARE-COM_WANReferenceList" 	;
}
