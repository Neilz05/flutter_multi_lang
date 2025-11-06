import Model, { belongsTo } from '@ember-data/model';

export default class UPnPModel extends Model {
  @belongsTo('upnp-device') Device;
}
