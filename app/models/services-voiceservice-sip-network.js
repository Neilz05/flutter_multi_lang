import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';

export default class ServiceVoiceserviceSipNetworkModel extends BaseModel {
    static sanitizedFields = []; //leave empty to sanitize all strings
    @attr OutboundProxy;
    @attr OutboundProxyPort;
    @attr ProxyServer;
    @attr ProxyServerPort;
    @attr RegistrarServer; 
    @attr RegistrarServerPort; 
    @attr UserAgentDomain;
    @attr DSCPMark;

    @attr RegisterExpires;
    @attr RegisterRetryInterval;
    @attr "X_PRPLWARE-COM_ProbeRetryInterval";
	
}
