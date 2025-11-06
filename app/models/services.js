import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import BaseModel from './base';
export default class VoiceModel extends BaseModel {
    static sanitizedFields = []; // leave empty to sanitize all strings
    
    @hasMany('services-voiceservice') VoiceService;
    @belongsTo('services-wizard') Wizard

    @attr({
        defaultValue() { return 'Services.'; }
    }) _namespace;
}