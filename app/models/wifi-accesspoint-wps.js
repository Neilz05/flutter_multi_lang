import Model, { attr, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class WifiAccesspointWpsModel extends Model {
    static sanitizedFields = []; // leave empty to sanitize all strings
    
    @attr RestartOnRequest;
    @attr ConfigMethodsEnabled;
    @attr PairingInProgress;
    @attr Status;
    @attr CertModeEnable;
    @attr SelfPIN;
    @attr Enable;
    @attr UUID;
    @attr ConfigMethodsSupported;
    @attr RelayCredentialsEnable;
    @attr Configured;
    @attr InitiateWPSPBC;
}
