import { data as capabilities } from './voice-voiceservice-capabilities';
import { data as callcontrol } from './voice-voiceservice-callcontrol';
import { data as sip } from './voice-voiceservice-sip';

let data = [
  { parameters: {}, path: "Device.Services.VoiceService.1." },
  { parameters: {}, path: "Device.Services.VoiceService.1.SIP." },
  {
    parameters: {
        OutboundProxy: "192.168.69.1",
        OutboundProxyPort: 6900,
        ProxyServer: "192.168.69.2",
        ProxyServerPort: 12250,
        RegistrarServer: "192.168.69.3",
        RegistrarServerPort: 42069,
				DSCPMark: 42,
        UserAgentDomain: "192.168.69.4",
				RegisterExpires: 3600,
				RegisterRetryInterval: 32,
				"X_PRPLWARE-COM_ProbeRetryInterval": 3600,

    },
    path: "Device.Services.VoiceService.1.SIP.Network.1.",
  },
  {
    parameters: {
        OutboundProxy: "192.168.70.1",
        OutboundProxyPort: 7000,
        ProxyServer: "192.168.70.2",
        ProxyServerPort: 12350,
        RegistrarServer: "192.168.70.3",
        RegistrarServerPort: 43070,
        UserAgentDomain: "192.168.70.4",
    },
    path: "Device.Services.VoiceService.1.SIP.Network.2.",
  }
];

sip.forEach((entry) => { 
    data.push(entry);
});

capabilities.forEach((entry) => {
    data.push(entry);
});

callcontrol.forEach((entry) => {
    data.push(entry);
});

export { data };