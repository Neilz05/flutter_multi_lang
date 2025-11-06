import Model, { attr, hasMany ,belongsTo} from '@ember-data/model';

export default class XponOnuAniModel extends Model {
  @attr Alias;	
  @attr Enable;	
  @attr LastChange;	
  @attr Name;
  @attr PONMode;	
  @attr Status;	
  @attr TransceiverNumberOfEntries;
  @belongsTo('xpon-onu-ani-tc') TC;
  @belongsTo('xpon-onu-ani-stats') Stats;
  @hasMany('xpon-onu-ani-transceiver') Transceiver;
}