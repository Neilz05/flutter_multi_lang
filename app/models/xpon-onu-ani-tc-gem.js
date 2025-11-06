import Model, { attr, hasMany } from '@ember-data/model';
export default class XponOnuAniTCGEMModel extends Model {
    @attr PortNumberOfEntries;
    @hasMany('xpon-onu-ani-tc-gem-port') Port;
  }