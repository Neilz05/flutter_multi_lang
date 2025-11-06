import Model, { attr } from '@ember-data/model';

export default class IpDiagnosticsIppingModel extends Model {
    @attr Host;
    @attr DiagnosticsState;
    @attr SuccessCount;
    @attr FailureCount;
    @attr DataBlockSize;
    @attr AverageResponseTime;
    @attr AverageResponseTimeDetailed;

    @attr({
        defaultValue() { return 'IP.Diagnostics.IPPing.'; }
    }) _namespace;
}
