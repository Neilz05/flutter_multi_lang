import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class TimeClientModel extends BaseModel {
    static sanitizedFields = []; // leave empty to sanitize all strings
    @attr Alias;
    @attr Servers;
    @attr Enable;
}
