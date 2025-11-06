import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class RoutingRouterIPV6Model extends Model {
    @attr Alias
    @attr DestIPPrefix
    @attr Enable
    @attr ExpirationTime
    @attr ForwardingMetric
    @attr ForwardingPolicy
    @attr Interface
    @attr NextHop
    @attr Origin
    @attr Status
    @attr Type
}
