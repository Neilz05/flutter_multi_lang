import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
export default class ServicesVoiceServiceCallControlXPrplwareComNumberBlockingIncomingBlocking extends Model {
    @attr Enable
    @attr RulesNumberOfEntries

    @hasMany('services-voiceservice-callcontrol-x-prplware-com-numberblocking-incomingblocking-rules') Rules;
}
