import Model, { belongsTo, attr, hasMany } from '@ember-data/model';

export default class LogicalInterfaceModel extends Model {
    @attr Alias;
    @attr LowerLayers;
    @belongsTo('logical-interface-xprplwarecomwan') 'X_PRPLWARE-COM_WAN'; //dash cannot be supported for some reason

    @attr({
        defaultValue() { return 'Logical.Interface.'; }
    }) _namespace;
}
