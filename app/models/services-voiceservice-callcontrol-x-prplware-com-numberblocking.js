import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
export default class ServicesVoiceServiceCallControlXPrplwareComNumberBlocking extends Model {
    @belongsTo('services-voiceservice-callcontrol-x-prplware-com-numberblocking-incomingblocking') IncomingBlocking;
    @belongsTo('services-voiceservice-callcontrol-x-prplware-com-numberblocking-outgoingblocking') OutgoingBlocking;
}
