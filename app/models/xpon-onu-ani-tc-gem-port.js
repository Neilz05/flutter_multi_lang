import Model, { attr, hasMany,belongsTo } from '@ember-data/model';
export default class XponOnuAniTCGEMPortModel extends Model {
    @attr Direction;
    @attr PortID;
    @attr PortType;
    @attr GemTcontID;
    @belongsTo('xpon-onu-ani-tc-gem-port-pm') PM;
  }