import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class HostsAccessControlApplicationFilter extends Model {
    @attr Enable

    @hasMany('hosts-accesscontrol-xprplwarecomapplicationfilter-applications', { async: false, inverse: null }) Applications;
}