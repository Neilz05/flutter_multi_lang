import Model, { attr } from '@ember-data/model';

export default class UserinterfaceHttpaccessSessionModel extends Model {
    @attr ID;
    // @attr Roles;
    @attr IPAddress;
    @attr User;
    @attr StartDate;
    @attr Status;


}
