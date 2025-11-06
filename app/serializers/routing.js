import JSONSerializer from '@ember-data/serializer/json';

export default class RoutingSerializer extends JSONSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (Array.isArray(payload)) {
      const ipv4ForwardingEntry = payload.find(item => 
        item.path === "Device.Routing.Router.1.IPv4Forwarding.1."
      );

      payload = {
        id: 'Routing.',
        gatewayIPAddress: ipv4ForwardingEntry?.parameters?.GatewayIPAddress || ''
      };
    }
    
    return super.normalizeResponse(store, primaryModelClass, payload, id, requestType);
  }
}