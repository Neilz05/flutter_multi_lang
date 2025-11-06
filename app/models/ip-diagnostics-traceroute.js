import Model, { attr, hasMany } from '@ember-data/model';

export default class IpDiagnosticsTracerouteModel extends Model {
    @attr Host;
    @attr DataBlockSize;
    @attr DiagnosticsState;
    @attr RouteHopsNumberOfEntries;
    @hasMany('ip-diagnostics-traceroute-routehops') RouteHops;

    @attr({
        defaultValue() { return 'IP.Diagnostics.TraceRoute.'; }
    }) _namespace;
}
