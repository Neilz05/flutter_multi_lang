import ApplicationSerializer from './application';

export default class DnsXSecureDnsSerializer extends ApplicationSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (Array.isArray(payload)) {
      if (requestType === 'findRecord') {
        payload = payload[0]; // Take the first (and only) record
      } else {
        payload = payload.map(item => this._normalizeItem(item));
        return { data: payload };
      }
    }
    // If it's a single object
    return {
      data: this._normalizeItem(payload)
    };
  }

  _normalizeItem(item) {
    return {
      id: item.path,
      type: 'dns-xsecuredns', // model name
      attributes: {
        ...item.parameters
      }
    };
  }
}
