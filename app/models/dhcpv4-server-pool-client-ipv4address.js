import Model, { attr } from '@ember-data/model';

export default class Dhcpv4ServerPoolClientIpv4addressModel extends Model {
    @attr IPAddress;
    @attr LeaseTimeRemaining;
}
