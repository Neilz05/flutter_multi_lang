import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class RebootModel extends Model {
  @attr BootCounter;
  @hasMany('reboot-reboot') Reboot;

  @attr({
    defaultValue() { return 'Reboot.'; }
  }) _namespace;
}
