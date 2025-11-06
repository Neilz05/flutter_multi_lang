import Model, { attr, hasMany, belongsTo  } from '@ember-data/model';

export default class ServicesVoiceserviceVoipprofileModel extends Model {
    @attr "X_PRPLWARE-COM_FlashHookMaxTime" 
    @attr "X_PRPLWARE-COM_FlashHookMinTime" 
		@belongsTo('services-voiceservice-voipprofile-rtp') RTP;
    @attr "X_PRPLWARE-COM_SessionExpire" 
    @attr "X_PRPLWARE-COM_MinSessionExpire" 
    @attr "X_PRPLWARE-COM_PrackEnable" 		
		
}
