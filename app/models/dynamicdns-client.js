import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';
export default class DynamicdnsClientModel extends BaseModel {
    static sanitizedFields = []; // leave empty to sanitize all strings

    @attr Alias;
    @attr Enable;
    @hasMany('dynamicdns-client-hostname') Hostname;
    @attr Username;
    @attr Password;
    @attr Status;
    @attr Server;
}
