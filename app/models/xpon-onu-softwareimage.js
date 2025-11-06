import Model, { attr, hasMany ,belongsTo} from '@ember-data/model';

export default class XponOnuSoftwareImageModel extends Model {
  @attr ID;	
  @attr IsActive;	
  @attr IsCommitted;	
  @attr IsValid;
  @attr Version;

}