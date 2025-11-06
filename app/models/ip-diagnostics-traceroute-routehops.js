import Model, { attr } from '@ember-data/model';

export default class IpDiagnosticsTracerouteRoutehopsModel extends Model {
    @attr RTTimes;
    @attr Host;
    @attr HostAddress;
}
