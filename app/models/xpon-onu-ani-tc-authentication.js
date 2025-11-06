import Model, { attr ,belongsTo} from '@ember-data/model';
import BaseModel from './base';

export default class XponOnuAniTCAuthenticationModel extends BaseModel {
    static sanitizedFields = ["Password"]; //leave empty to sanitize all strings
    @attr HexadecimalPassword;
    @attr Password;
}