import Model, { attr, hasMany } from '@ember-data/model';

export default class UserinterfaceHttpaccessModel extends Model {
    @hasMany('userinterface-httpaccess-session', { async: true }) Session;
    @attr Port;
    @attr SessionNumberOfEntries;
    @attr Protocol;

    @attr({
        defaultValue() { return 'UserInterface.HTTPAccess.'; }
    }) _namespace;
}
