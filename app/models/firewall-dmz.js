import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class FirewallDmzModel extends BaseModel {
    static sanitizedFields = []; // leave empty to sanitize all strings
    @attr Alias;
    @attr Enable;
    @attr Interface;
    @attr DestIP;

    @attr({
        defaultValue() { return 'Firewall.DMZ.'; }
    }) _namespace;    
}
