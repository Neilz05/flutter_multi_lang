import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class CthulhuInformationModel extends BaseModel {
    static sanitizedFields = []; // leave empty to sanitize all strings

    @attr AllowedList;
    @attr Enable;
    @attr Status;
    @attr URL;
}