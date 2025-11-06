import Model, { attr } from '@ember-data/model';

export default class HostsAccessControlSchedule extends Model {
    /* @attr Alias */
    @attr Day
    @attr Duration
    @attr Enable
    @attr StartTime
}