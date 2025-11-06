import ApplicationAdapter from './application';
import { inject as service } from '@ember/service';

export default class Adapter extends ApplicationAdapter {
  @service api;

  createRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: false });
    return this.api.customFetch(`/serviceElements/Device.WiFi.AccessPoint.${snapshot.record.index}.MACFiltering.Entry.`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(response => response.json());
  }

  serialize(snapshot, options) {
    const changedAttributes = {};

    Object.entries(snapshot.changedAttributes()).forEach(([key, [oldValue, newValue]]) => {
      changedAttributes[key] = newValue
    })

    return {parameters: changedAttributes}
  }
}
