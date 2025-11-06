import Model, { attr, belongsTo } from '@ember-data/model';

export default class IpDiagnosticsModel extends Model {
    @belongsTo('ip-diagnostics-ipping') IPPing;
    @belongsTo('ip-diagnostics-traceroute') Traceroute;

    @attr({
        defaultValue() { return 'IP.Diagnostics.'; }
    }) _namespace;
}
