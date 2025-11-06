import Model, { attr } from '@ember-data/model';

export default class PacketcapturediagnosticsModel extends Model {
    @attr ByteCount;
    @attr Controller;
    @attr DiagnosticsState;
    @attr Duration;
    @attr FileTarget;
    @attr FilterExpression;
    @attr Format;
    @attr Interface;
    @attr PacketCaptureResultNumberOfEntries;
    @attr PacketCount;
    @attr Password;
    @attr SupportedControllers;
    @attr Username;

    @attr({
        defaultValue() { return 'PacketCaptureDiagnostics.'; }
    }) _namespace;
}
