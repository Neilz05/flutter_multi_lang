export const data = [
  {
    "parameters": {
      "Enable": 1,
      "LocalTimeZone": "GST-4",
      "CurrentLocalTime": "2025-08-31T15:57:07.025402160+04:00",
      "ServerNumberOfEntries": 3,
      "Status": "Synchronized",
      "ClientNumberOfEntries": 1
    },
    "path": "Device.Time."
  },
  {
    "parameters": {
      "Port": 123,
      "Peer": 0,
      "Status": "Synchronized",
      "BindType": "Device",
      "IBurst": 1,
      "Enable": 1,
      "Servers": "ntp1.emirates.net.ae, ntp2.emirates.net.ae",
      "Burst": 8,
      "Interface": "Device.Logical.Interface.1.",
      "ResolveAddresses": 0,
      "MaxPoll": 12,
      "Version": 3,
      "Alias": "cpe-client-1",
      "MinPoll": 6,
      "ResolveMaxAddresses": 6,
      "Mode": "Unicast"
    },
    "path": "Device.Time.Client.1."
  },
  {
    "parameters": {
      "Enable": 0,
      "Certificate": "",
      "NTSPort": 4460
    },
    "path": "Device.Time.Client.1.Authentication."
  },
  {
    "parameters": {
      "PacketsDropped": 0,
      "PacketsReceived": 0,
      "PacketsSentFailed": 0,
      "PacketsSent": 0
    },
    "path": "Device.Time.Client.1.Stats."
  },
  {
    "parameters": {
      "Port": 123,
      "TTL": 255,
      "Interface": "Device.Logical.Interface.2.",
      "Status": "Up",
      "BindType": "Device",
      "MaxPoll": 10,
      "Enable": 1,
      "Version": 4,
      "Alias": "cpe-br-lan",
      "MinPoll": 6,
      "Mode": "Unicast"
    },
    "path": "Device.Time.Server.1."
  },
  {
    "parameters": {
      "Enable": 0,
      "NTSNTPServer": "",
      "Certificate": ""
    },
    "path": "Device.Time.Server.1.Authentication."
  },
  {
    "parameters": {
      "PacketsDropped": 0,
      "PacketsReceived": 0,
      "PacketsSentFailed": 0,
      "PacketsSent": 0
    },
    "path": "Device.Time.Server.1.Stats."
  },
  {
    "parameters": {
      "Port": 123,
      "TTL": 255,
      "Interface": "Device.Logical.Interface.3.",
      "Status": "Up",
      "BindType": "Device",
      "MaxPoll": 10,
      "Enable": 1,
      "Version": 4,
      "Alias": "cpe-br-guest",
      "MinPoll": 6,
      "Mode": "Unicast"
    },
    "path": "Device.Time.Server.2."
  },
  {
    "parameters": {
      "Enable": 0,
      "NTSNTPServer": "",
      "Certificate": ""
    },
    "path": "Device.Time.Server.2.Authentication."
  },
  {
    "parameters": {
      "PacketsDropped": 0,
      "PacketsReceived": 0,
      "PacketsSentFailed": 0,
      "PacketsSent": 0
    },
    "path": "Device.Time.Server.2.Stats."
  },
  {
    "parameters": {
      "Port": 123,
      "TTL": 255,
      "Interface": "Device.Logical.Interface.4.",
      "Status": "Up",
      "BindType": "Device",
      "MaxPoll": 10,
      "Enable": 1,
      "Version": 4,
      "Alias": "cpe-br-lcm",
      "MinPoll": 6,
      "Mode": "Unicast"
    },
    "path": "Device.Time.Server.3."
  },
  {
    "parameters": {
      "Enable": 0,
      "NTSNTPServer": "",
      "Certificate": ""
    },
    "path": "Device.Time.Server.3.Authentication."
  },
  {
    "parameters": {
      "PacketsDropped": 0,
      "PacketsReceived": 0,
      "PacketsSentFailed": 0,
      "PacketsSent": 0
    },
    "path": "Device.Time.Server.3.Stats."
  }
];