import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class ManagementServerModel extends Model {
  @attr URL;
  @attr UpgradesManaged;
}
