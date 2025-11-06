import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class RebootRebootModel extends Model {
  @attr BootReason;

  @attr({
    defaultValue() { return 'Reboot.Reboot.'; }
  }) _namespace;
}
