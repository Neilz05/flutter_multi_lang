import Model, { attr } from '@ember-data/model';

export default class HostsAccessControlApplicationFilterApplications extends Model {
    @attr Name
    @attr Port
    @attr Protocol
}