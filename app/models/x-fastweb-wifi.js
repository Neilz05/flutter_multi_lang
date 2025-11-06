import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class XfastwebWiFiModel extends Model {
  static sanitizedFields = []; // leave empty to sanitize all strings

  @hasMany ('x-fastweb-wifi-splitssiddisable') SplitSSIDDisable

  @attr({
    defaultValue() { return 'X_FASTWEB_WiFi.'; }
  }) _namespace;
}
