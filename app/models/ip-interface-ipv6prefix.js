import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class IpInterfaceIpv6PrefixModel extends Model {
  static sanitizedFields = []; // leave empty to sanitize all strings

  @attr Alias;
  @attr Autonomous;
  @attr ChildPrefixBits;
  @attr Enable;
  @attr OnLink;
  @attr Origin;
  @attr ParentPrefix;
  @attr PreferredLifeTime;
  @attr Prefix;
  @attr PrefixStatus;
  @attr StaticType;
  @attr Status;
  @attr ValidLifeTime;
}
