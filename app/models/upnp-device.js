import Model, { attr } from '@ember-data/model';

export default class UPnPDeviceModel extends Model {
  @attr Enable;
  @attr UPnPIGD;
}
