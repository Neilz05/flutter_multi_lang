import Model, { attr, hasMany ,belongsTo} from '@ember-data/model';

export default class XponOnuEthernetUNI extends Model {
  @attr ANIs;	
  @attr Alias;	
  @attr Enable;	
  @attr InterdomainID;
  @attr InterdomainName;
  @attr LastChange;
  @attr LowerLayers;
  @attr Name;
  @attr Status;
}