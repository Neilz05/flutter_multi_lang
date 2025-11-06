import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedStatusAndSupportDiagnosticUtilityController extends Controller {
    @service store;
    @service intl;
    @service eaactrl;
    @service api;

    // Ping variables
    @tracked pingModalOpen = false;
    @tracked pingError = false;
    @tracked validIp = true;
    @tracked stopPingChecking = false;
    @tracked pingResult = {};
    @tracked diagnosticsState = "";

    // Tracing Tool variables
    @tracked tracingToolModalOpen = false;
    @tracked tracingToolErr = false;
    @tracked tracingToolIface = '';
    @tracked tracingToolDiagState = '';
    traceResultPath = "/www/assets/pcm.usr/tracingToolResults.pcap";

    intervalId;

    constructor() {
        super(...arguments);
        this.eaactrl.setEaaTargetController(this);
    }

    @action
    validateIPv4(ip) {
        // Regular expression to match IPv4 addresses
        const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(ip);
    }

    @action
    validateDomainName(dname) {
        const regex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        return regex.test(dname);
    }

    @action
    reloadPage() {
        // Reload the page to reflect changes
        window.location.reload();
    }

    @action
    openPingModal() {
        let pingIp = document.getElementById('pingIp').value;
        if ((pingIp !== '') && (this.validateIPv4(pingIp) || this.validateDomainName(pingIp))) { 
            this.stopPingChecking = false;

            // clear any previous error state
            this.validIp = true;
            document.getElementById('pingIp').classList.remove('is-invalid');

            this.model.ip.Diagnostics.get('IPPing').then((ipPing) => {
                ipPing._attributes = {}; // Reset attributes to avoid conflicts
                // ipPing.set('Host', null);
                ipPing.set('Host', pingIp);
                // ipPing.set('DiagnosticsState', null);
                ipPing.set('DiagnosticsState', 'Requested');

                ipPing.save().then(() => {
                    this.intervalId = setInterval(() => {
                        if (this.stopPingChecking) {
                            clearInterval(this.intervalId);
                            this.intervalId = null;
                        } else {
                            let cachedRecord = this.store.peekRecord('ip-diagnostics-ipping', 'IP.Diagnostics.IPPing.');
                            if (cachedRecord) {
                                this.store.unloadRecord(cachedRecord);
                            }

                            this.store.findRecord('ip-diagnostics-ipping', 'IP.Diagnostics.IPPing.', { reload: true }).then((record) => {
                                if (record) {
                                    if (record.DiagnosticsState === 'Complete') {
                                        this.pingResult.IPAddress = pingIp;
                                        this.pingResult.succRate = ((record.SuccessCount / (record.SuccessCount + record.FailureCount)) * 100) + '%';
                                        this.pingResult.packetSize = record.DataBlockSize + ' bytes';
                                        this.pingResult.avgTime = record.AverageResponseTime + ' ms';
                                        this.pingModalOpen = true;
                                        this.stopPingChecking = true;
                                    } else if (record.DiagnosticsState.includes('Error_')) {
                                        this.pingError = true;
                                        this.pingModalOpen = true;
                                        this.stopPingChecking = true;
                                    }
                                }
                            });
                        }
                    }, 2000);
                });
            });
        } else {
            this.validIp = false;
            document.getElementById('pingIp').classList.add('is-invalid');
            document.getElementById('pingIp').style.backgroundImage = 'none';
        }
    }

    @action
    async openTracingToolModal() {
        if (this.tracingToolIface === "" || this.tracingToolIface === null) {
            this.tracingToolErr = true;
            return;
        }
        this.tracingToolErr = false;

        let url = '/commands';
        try {
            let response = await this.api.customFetch(url, {
                method: 'post',
                body: JSON.stringify({
                    command: 'Device.PacketCaptureDiagnostics()',
                    commandKey: ',',
                    sendresp: true,
                    inputArgs: {
                        Interface: this.tracingToolIface,
                        FileTarget: this.traceResultPath,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Error executing packet capture. Status: ${response.status}`);
            } else {
                this.tracingToolModalOpen = true;
                /*this.store.findRecord('packetcapturediagnostics', 'PacketCaptureDiagnostics.', { reload: true }).then((record) => {
                    console.log("Checking record");
                    this.tracingToolDiagState = record.DiagnosticsState;
                });*/
                this.tracingToolDiagState = "Requested";
            }
        } catch (error) {
            console.error('Tracing Tool error: ' + error);
        }
    }

    @action
    updateTracingToolSelect(event) {
        // this.model.packetcapturediag.set('Interface', event.target.value);
        this.tracingToolIface = event.target.value;
    }

    @action
    async stopTracingTool() {
        let url = '/commands';
        try {
            let response = await this.api.customFetch(url, {
                method: 'post',
                body: JSON.stringify({
                    command: 'Device.PacketCaptureDiagnostics()',
                    commandKey: ',',
                    sendresp: true,
                    inputArgs: {
                        Interface: "null",
                        FileTarget: this.traceResultPath,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Error stopping packet capture. Status: ${response.status}`);
            } else {
                this.tracingToolDiagState = "";
                this.tracingToolModalOpen = false;

                // download pcap file
                try {
                    /*let dlResp = await this.api.customFetch(this.traceResultPath, {
                        method: 'get'
                    });*/
                    let dlResp = await fetch(`${window.location.origin}${this.traceResultPath.replace('/www', '')}`, {
                        method: 'get'
                    });

                    if (!dlResp.ok) {
                        throw new Error("Unable to get pcap file.");
                    } else {
                        const blob = await dlResp.blob();
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = this.traceResultPath.split('/').pop();

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(link.href);
                    }
                } catch (error) {
                    console.error('Tracing Tool download error: ' + error);
                }
            }
        } catch (error) {
            console.error('Stop Tracing Tool error: ' + error);
        }
    }
}
