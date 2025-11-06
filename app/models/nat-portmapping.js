import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class NatPortMappingModel extends Model {
  @attr Alias
  @attr Protocol
  @attr InternalClient
  @attr ExternalPort
  @attr ExternalPortEndRange
  @attr InternalPort
  @attr Enable
  @attr Description
  
  @attr({
    defaultValue() { return 'NAT.PortMapping.'; }
  }) _namespace;
}