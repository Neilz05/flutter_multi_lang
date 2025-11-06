import Model, { attr, belongsTo } from '@ember-data/model';

export default class WiFiDataelementsModel extends Model {
  @attr SteerEventNumberOfEntries;
  @belongsTo('wifi-dataelements-network') Network;
  @belongsTo('wifi-dataelements-associationevent') AssociationEvent;
  @belongsTo('wifi-dataelements-configuration') Configuration;
  @belongsTo('wifi-dataelements-disassociationevent') DisassociationEvent;
  @belongsTo('wifi-dataelements-failedconnectionevent') FailedConnectionEvent;
  @attr({
      defaultValue() {
        return 'WiFi.DataElements.';
      },
    })
    _namespace;
}
