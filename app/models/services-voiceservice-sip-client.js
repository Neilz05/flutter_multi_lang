import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';

export default class ServiceVoiceserviceSipClientModel extends BaseModel {
    static sanitizedFields = ["RegisterURI","X_PRPLWARE-COM_DisplayName", "AuthUserName", "AuthPassword"];//leave empty to sanitize all strings
    @attr Enable;
    @attr RegisterURI;
    @attr "X_PRPLWARE-COM_DisplayName";
    @attr AuthUserName;
    @attr AuthPassword;
    @attr Status;
    @attr T38Enable;
    @attr "X_PRPLWARE-COM_InternalNumber";
}
