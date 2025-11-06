import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class NatModel extends Model {
  @hasMany('nat-interfacesetting') InterfaceSetting;
  @hasMany('nat-portmapping') PortMapping
  @attr PortMappingNumberOfEntries

  @attr({
    defaultValue() { return 'NAT.'; }
  }) _namespace;
}
