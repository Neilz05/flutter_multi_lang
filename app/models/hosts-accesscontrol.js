import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class HostsAccessControlModel extends Model {
    @attr AccessPolicy;
    @attr Enable
    @attr Alias
    @attr HostName
    @attr PhysAddress

    @belongsTo('hosts-accesscontrol-xprplwarecomurlfilter', { async: false, inverse: null }) "X_PRPLWARE-COM_URLFilter";
    @belongsTo('hosts-accesscontrol-xprplwarecomapplicationfilter', { async: false, inverse: null }) "X_PRPLWARE-COM_ApplicationFilter";
    @hasMany('hosts-accesscontrol-schedule', { async: false, inverse: null }) "Schedule";
}
