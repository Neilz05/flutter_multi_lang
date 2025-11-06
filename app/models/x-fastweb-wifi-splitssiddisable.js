import Model, { attr, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class XfastwebWiFiSplitSSIDDisableModel extends BaseModel {
  static sanitizedFields = []; // leave empty to sanitize all strings

  @attr Enable;
  @attr({
    defaultValue() { return 'X_FASTWEB_WiFi.SplitSSIDDisable.'; }
  }) _namespace;
}
