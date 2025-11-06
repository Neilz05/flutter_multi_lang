import Model, { hasMany } from '@ember-data/model';

export default class VoiceVoiceserviceSipModel extends Model {
    @hasMany('services-voiceservice-sip-network') Network;
    @hasMany('services-voiceservice-sip-client') Client;
}
