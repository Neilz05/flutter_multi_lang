import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class RoutingRouterIPV4Model extends Model {
    @attr Alias
    @attr DestIPAddress
    @attr DestSubnetMask
    @attr Enable
    @attr ForwardingMetric
    @attr ForwardingPolicy
    @attr GatewayIPAddress
    @attr Interface
    @attr Origin
    @attr StaticRoute
    @attr Status
}
