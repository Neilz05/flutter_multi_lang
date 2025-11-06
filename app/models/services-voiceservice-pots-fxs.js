import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class VoiceVoiceservicepotsfxsModel extends Model {
    		@belongsTo('services-voiceservice-pots-fxs-voiceprocessing') VoiceProcessing;
}
