import Model, { attr } from '@ember-data/model';

export default class XscmacfiltertableModel extends Model {
    @attr DeviceName;
    @attr MACAddress;

    @attr({
        defaultValue() { return 'WiFi.X_SC_MacFilterTable.'; }
    }) _namespace;
}
