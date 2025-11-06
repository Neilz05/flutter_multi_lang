import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class HostsAccessControlURLFilter extends Model {
    @attr Enable

    @hasMany('hosts-accesscontrol-xprplwarecomurlfilter-urls', { async: false, inverse: null }) URLs;
}