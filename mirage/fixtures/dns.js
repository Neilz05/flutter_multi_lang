let data = [
  {
    "parameters": {
      "X_PRPL-COM_HostNumberOfEntries": 4,
      "X_PRPL-COM_ForwardZoneNumberOfEntries": 0,
      "SupportedRecordTypes": "A,AAAA,SRV,PTR"
    },
    "path": "Device.DNS."
  },
  {
    "parameters": {
      "Enable": 1,
      "ServerNumberOfEntries": 1,
      "Status": "Enabled"
    },
    "path": "Device.DNS.Client."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "127.0.0.1",
      "Interface": "Device.IP.Interface.1.",
      "Alias": "lo",
      "Status": "Enabled",
      "Type": "Static"
    },
    "path": "Device.DNS.Client.Server.1."
  },
  {
    "parameters": {},
    "path": "Device.DNS.Diagnostics."
  },
  {
    "parameters": {
      "SuccessCount": 0,
      "DiagnosticsState": "None",
      "ResultNumberOfEntries": 0,
      "Interface": "",
      "Timeout": 0,
      "NumberOfRepetitions": 0,
      "DNSServer": "",
      "HostName": ""
    },
    "path": "Device.DNS.Diagnostics.NSLookupDiagnostics."
  },
  {
    "parameters": {
      "X_PRPL-COM_ConfigNumberOfEntries": 4,
      "Enable": 0,
      "ForwardNumberOfEntries": 10,
      "Status": "Enabled"
    },
    "path": "Device.DNS.Relay."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "",
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "dhcpv4-1",
      "Status": "Error",
      "Type": "DHCPv4"
    },
    "path": "Device.DNS.Relay.Forwarding.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "",
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "cellular-2",
      "Status": "Error",
      "Type": "3GPP-NAS"
    },
    "path": "Device.DNS.Relay.Forwarding.10."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "",
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "dhcpv4-2",
      "Status": "Error",
      "Type": "DHCPv4"
    },
    "path": "Device.DNS.Relay.Forwarding.2."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "7a4b:d880:8d0f:8430:38ba:3808:a88c:aafe",
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "dhcpv6-1",
      "Status": "Error",
      "Type": "DHCPv6"
    },
    "path": "Device.DNS.Relay.Forwarding.3."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "7a4b:d880:8d0f:8430:38ba:3808:a88c:aaff",
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "dhcpv6-2",
      "Status": "Error",
      "Type": "DHCPv6"
    },
    "path": "Device.DNS.Relay.Forwarding.4."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "",
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "ra-1",
      "Status": "Error",
      "Type": "RouterAdvertisement"
    },
    "path": "Device.DNS.Relay.Forwarding.5."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "",
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "ra-2",
      "Status": "Error",
      "Type": "RouterAdvertisement"
    },
    "path": "Device.DNS.Relay.Forwarding.6."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "",
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "ppp-1",
      "Status": "Error",
      "Type": "IPCP"
    },
    "path": "Device.DNS.Relay.Forwarding.7."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "",
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "ppp-2",
      "Status": "Error",
      "Type": "IPCP"
    },
    "path": "Device.DNS.Relay.Forwarding.8."
  },
  {
    "parameters": {
      "Enable": 1,
      "DNSServer": "",
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "cellular-1",
      "Status": "Error",
      "Type": "3GPP-NAS"
    },
    "path": "Device.DNS.Relay.Forwarding.9."
  },
  {
    "parameters": {
      "CacheMinTTL": 0,
      "CacheMaxTTL": 86400,
      "Interface": "Device.Logical.Interface.2.",
      "DomainName": "home.arpa",
      "IPv6DNSMode": "Static",
      "Alias": "wan",
      "DNSMode": "Static",
      "ForwardingRef": "",
      "CacheSize": 4000
    },
    "path": "Device.DNS.Relay.X_PRPLWARE-COM_Config.1."
  },
  {
    "parameters": {
      "CacheMinTTL": 0,
      "CacheMaxTTL": 86400,
      "Interface": "Device.Logical.Interface.3.",
      "DomainName": "home.arpa",
      "IPv6DNSMode": "Any",
      "Alias": "guest",
      "DNSMode": "Any",
      "ForwardingRef": "",
      "CacheSize": 4000
    },
    "path": "Device.DNS.Relay.X_PRPLWARE-COM_Config.2."
  },
  {
    "parameters": {
      "CacheMinTTL": 0,
      "CacheMaxTTL": 86400,
      "Interface": "Device.Logical.Interface.4.",
      "DomainName": "home.arpa",
      "IPv6DNSMode": "Any",
      "Alias": "lcm",
      "DNSMode": "Any",
      "ForwardingRef": "",
      "CacheSize": 4000
    },
    "path": "Device.DNS.Relay.X_PRPLWARE-COM_Config.3."
  },
  {
    "parameters": {
      "CacheMinTTL": 0,
      "CacheMaxTTL": 86400,
      "Interface": "Device.IP.Interface.1.",
      "DomainName": "home.arpa",
      "IPv6DNSMode": "Any",
      "Alias": "lo",
      "DNSMode": "Any",
      "ForwardingRef": "",
      "CacheSize": 4000
    },
    "path": "Device.DNS.Relay.X_PRPLWARE-COM_Config.4."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPAddressNumberOfEntries": 2,
      "Origin": "Static",
      "Name": "prplOS.lan",
      "Interface": "Device.Logical.Interface.2.",
      "Alias": "deviceinfo-lan"
    },
    "path": "Device.DNS.X_PRPL-COM_Host.1."
  },
  {
    "parameters": {
      "IPAddress": "192.168.1.1",
      "Alias": "cpe-IPAddress-1"
    },
    "path": "Device.DNS.X_PRPL-COM_Host.1.IPAddress.1."
  },
  {
    "parameters": {
      "IPAddress": "fe80::1aef:c0ff:fe00:280",
      "Alias": "cpe-IPAddress-2"
    },
    "path": "Device.DNS.X_PRPL-COM_Host.1.IPAddress.2."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPAddressNumberOfEntries": 1,
      "Origin": "Static",
      "Name": "prplOS.lan",
      "Interface": "Device.Logical.Interface.3.",
      "Alias": "deviceinfo-guest"
    },
    "path": "Device.DNS.X_PRPL-COM_Host.2."
  },
  {
    "parameters": {
      "IPAddress": "192.168.2.1",
      "Alias": "cpe-IPAddress-1"
    },
    "path": "Device.DNS.X_PRPL-COM_Host.2.IPAddress.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPAddressNumberOfEntries": 1,
      "Origin": "Static",
      "Name": "prplOS.lan",
      "Interface": "Device.Logical.Interface.4.",
      "Alias": "deviceinfo-lcm"
    },
    "path": "Device.DNS.X_PRPL-COM_Host.3."
  },
  {
    "parameters": {
      "IPAddress": "192.168.3.1",
      "Alias": "cpe-IPAddress-1"
    },
    "path": "Device.DNS.X_PRPL-COM_Host.3.IPAddress.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPAddressNumberOfEntries": 1,
      "Origin": "DHCPv4",
      "Name": "DESKTOP-N4P14H7",
      "Interface": "Device.IP.Interface.3.",
      "Alias": "cpe-X_PRPL-COM_Host-4"
    },
    "path": "Device.DNS.X_PRPL-COM_Host.4."
  },
  {
    "parameters": {
      "IPAddress": "192.168.1.2",
      "Alias": "cpe-IPAddress-1"
    },
    "path": "Device.DNS.X_PRPL-COM_Host.4.IPAddress.1."
  },
  {
    "parameters": {
      "Enable": 1
    },
    "path": "Device.DNS.X_PRPL-COM_RebindProtection."
  },
  {
    "parameters": {
      "Address": "127.0.0.0/8"
    },
    "path": "Device.DNS.X_PRPL-COM_RebindProtection.IPExceptions.1."
  },
  {
    "parameters": {
      "Address": "::1/128"
    },
    "path": "Device.DNS.X_PRPL-COM_RebindProtection.IPExceptions.2."
  },
   {
      "path": 'Device.DNS.Relay.Forwarding.10.',
      "parameters": {
        "Alias": "wan",
        "DNSServer": "8.8.8.8",
        "Enable": 1,
        "Status": "OK",
        "Interface": "",
        "Type": "Static"
      }
    },
    {
      "path": 'Device.DNS.Relay.Forwarding.11.',
      "parameters": {
        "Alias": "static-1",
        "DNSServer": "10.47.20.1",
        "Enable": 1,
        "Status": "Error",
        "Interface": "",
        "Type": "3GPP-NAS"
      }
    },
    {
      "path": 'Device.DNS.Relay.Forwarding.12.',
      "parameters": {
        "Alias": "static-2",
        "DNSServer": "1.1.1.1",
        "Enable": 1,
        "Status": "OK",
        "Interface": "",
        "Type": "3GPP-NAS"
      }
    }
]
export { data };