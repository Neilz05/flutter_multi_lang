import Model, { attr, belongsTo } from '@ember-data/model';
import BaseModel from './base';
export default class HostsHostModel extends BaseModel {
    static sanitizedFields = []; // leave empty to sanitize all strings
    @attr Active;
    @attr HostName;
    @attr IPAddress;
    @attr PhysAddress
    @attr Layer1Interface;
    @attr InterfaceType;
    @attr DHCPClient;
    @attr ActiveLastChange;
    @attr X_RMDIP_HostType;
    @attr X_RMDIP_IdentityKey;
    @belongsTo('hosts-host-wanstats') WANStats;
}
