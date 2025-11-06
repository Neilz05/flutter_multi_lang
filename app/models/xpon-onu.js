import Model, { attr, hasMany, belongsTo} from '@ember-data/model';

export default class XponOnuModel extends Model {
    @attr ANINumberOfEntries;
    @attr Enable;
    @attr EquipmentID;	
    @attr EthernetUNINumberOfEntries;
    @attr Name;
    @attr SoftwareImageNumberOfEntries;
    @attr Version;
    @hasMany('xpon-onu-ani') ANI;
    @hasMany('xpon-onu-ethernetuni') EthernetUNI;
    @hasMany('xpon-onu-softwareimage') SoftwareImage;
    @attr({
        defaultValue() { return 'XPON.ONU.'; }
    }) _namespace;
}