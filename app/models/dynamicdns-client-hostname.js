import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class DynamicdnsClientHostnameModel extends BaseModel {
    static sanitizedFields = []; // leave empty to sanitize all strings
    @attr Name;
}
