import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class RoutingRouterModel extends Model {
    @attr Alias;
    @attr Enable;
    @attr Status;

    @hasMany('routing-router-ipv4forwarding', { async: false }) IPv4Forwarding;
    @hasMany('routing-router-ipv6forwarding', { async: false }) IPv6Forwarding;
}
