import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class OpticalInterfaceModel extends Model {
  @attr OperState;
  @attr OpticalSignalLevel;
  @attr TransmitOpticalLevel;
  @belongsTo('optical-interface-stats') Stats;

  @attr({
    defaultValue() { return 'Optical.Interface.'; }
  }) _namespace;
}
