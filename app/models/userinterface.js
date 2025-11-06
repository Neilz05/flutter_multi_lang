import Model, { attr, hasMany } from '@ember-data/model';

export default class UserinterfaceModel extends Model {
    @hasMany('userinterface-httpaccess', { async: true }) HTTPAccess;

    @attr HTTPAccessNumberOfEntries;

    @attr({
        defaultValue() { return 'UserInterface.'; }
    }) _namespace;
}
