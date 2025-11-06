import Model, { belongsTo, attr, hasMany } from '@ember-data/model';

export default class LogicalInterfaceModel extends Model {
    @attr IPv4Address
    @attr IPv6Address
    @attr Status    
}
