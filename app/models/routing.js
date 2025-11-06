import Model, { attr } from '@ember-data/model';

export default class RoutingModel extends Model {
  @attr('string') gatewayIPAddress;

  @attr({
    defaultValue() {
      return 'Routing.';
    }
  }) namespace;
}