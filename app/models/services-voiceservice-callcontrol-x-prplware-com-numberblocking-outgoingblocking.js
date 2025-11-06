import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
export default class ServicesVoiceServiceCallControlXPrplwareComNumberBlockingOutgoingBlocking extends Model {
    @attr Enable
    @attr ForeignNumberBlockEnable
    @attr SpecialRateNumberBlockEnable
    @attr RulesNumberOfEntries

    @hasMany('services-voiceservice-callcontrol-x-prplware-com-numberblocking-outgoingblocking-rules') Rules;
}
