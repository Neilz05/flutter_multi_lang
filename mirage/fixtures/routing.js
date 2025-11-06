const data = [
  {
    "parameters": {
      "RouterNumberOfEntries": 8
    },
    "path": "Device.Routing."
  },
  {
    "parameters": {
      "Enable": 0,
      "InterfaceSettingNumberOfEntries": 0,
      "SupportedModes": "Send"
    },
    "path": "Device.Routing.RIP."
  },
  {
    "parameters": {
      "Enable": 1,
      "InterfaceSettingNumberOfEntries": 8
    },
    "path": "Device.Routing.RouteInformation."
  },
  {
    "parameters": {
      "ManagedAddressConfiguration": 0,
      "RetransTimer": 0,
      "PreferredRouteFlag": "High",
      "Interface": "Device.IP.Interface.3.",
      "Status": "ForwardingEntryCreated",
      "Prefix": "2600:80a:458:1a20::/64",
      "RouteLifetime": "2025-07-16T03:20:41.820054116Z",
      "HomeAgent": 0,
      "SourceRouter": "fe80::aebc:d9ff:fe0c:1adc",
      "X_PRPL-COM_LastAdvertisement": 2,
      "ReachableTime": 0,
      "OtherConfiguration": 1,
      "OptionNumberOfEntries": 3
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.1."
  },
  {
    "parameters": {
      "Tag": 1,
      "Value": "0101ACBCD90C1ADC"
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.1.Option.1."
  },
  {
    "parameters": {
      "Tag": 3,
      "Value": "030440C000278D0000093A80000000002600080A04581A200000000000000000"
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.1.Option.3."
  },
  {
    "parameters": {
      "Tag": 5,
      "Value": "05010000000005D4"
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.1.Option.5."
  },
  {
    "parameters": {
      "ManagedAddressConfiguration": 0,
      "RetransTimer": 0,
      "PreferredRouteFlag": "High",
      "Interface": "Device.IP.Interface.8.",
      "Status": "NoForwardingEntry",
      "Prefix": "",
      "RouteLifetime": "0001-01-01T00:00:00Z",
      "HomeAgent": 0,
      "SourceRouter": "",
      "X_PRPL-COM_LastAdvertisement": 0,
      "ReachableTime": 0,
      "OtherConfiguration": 0,
      "OptionNumberOfEntries": 0
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.2."
  },
  {
    "parameters": {
      "ManagedAddressConfiguration": 0,
      "RetransTimer": 0,
      "PreferredRouteFlag": "High",
      "Interface": "Device.IP.Interface.9.",
      "Status": "NoForwardingEntry",
      "Prefix": "",
      "RouteLifetime": "0001-01-01T00:00:00Z",
      "HomeAgent": 0,
      "SourceRouter": "",
      "X_PRPL-COM_LastAdvertisement": 0,
      "ReachableTime": 0,
      "OtherConfiguration": 0,
      "OptionNumberOfEntries": 0
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.3."
  },
  {
    "parameters": {
      "ManagedAddressConfiguration": 0,
      "RetransTimer": 0,
      "PreferredRouteFlag": "High",
      "Interface": "Device.IP.Interface.10.",
      "Status": "NoForwardingEntry",
      "Prefix": "",
      "RouteLifetime": "0001-01-01T00:00:00Z",
      "HomeAgent": 0,
      "SourceRouter": "",
      "X_PRPL-COM_LastAdvertisement": 0,
      "ReachableTime": 0,
      "OtherConfiguration": 0,
      "OptionNumberOfEntries": 0
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.4."
  },
  {
    "parameters": {
      "ManagedAddressConfiguration": 0,
      "RetransTimer": 0,
      "PreferredRouteFlag": "High",
      "Interface": "Device.IP.Interface.8.",
      "Status": "NoForwardingEntry",
      "Prefix": "",
      "RouteLifetime": "0001-01-01T00:00:00Z",
      "HomeAgent": 0,
      "SourceRouter": "",
      "X_PRPL-COM_LastAdvertisement": 0,
      "ReachableTime": 0,
      "OtherConfiguration": 0,
      "OptionNumberOfEntries": 0
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.5."
  },
  {
    "parameters": {
      "ManagedAddressConfiguration": 0,
      "RetransTimer": 0,
      "PreferredRouteFlag": "High",
      "Interface": "Device.IP.Interface.9.",
      "Status": "NoForwardingEntry",
      "Prefix": "",
      "RouteLifetime": "0001-01-01T00:00:00Z",
      "HomeAgent": 0,
      "SourceRouter": "",
      "X_PRPL-COM_LastAdvertisement": 0,
      "ReachableTime": 0,
      "OtherConfiguration": 0,
      "OptionNumberOfEntries": 0
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.6."
  },
  {
    "parameters": {
      "ManagedAddressConfiguration": 0,
      "RetransTimer": 0,
      "PreferredRouteFlag": "High",
      "Interface": "Device.IP.Interface.10.",
      "Status": "NoForwardingEntry",
      "Prefix": "",
      "RouteLifetime": "0001-01-01T00:00:00Z",
      "HomeAgent": 0,
      "SourceRouter": "",
      "X_PRPL-COM_LastAdvertisement": 0,
      "ReachableTime": 0,
      "OtherConfiguration": 0,
      "OptionNumberOfEntries": 0
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.7."
  },
  {
    "parameters": {
      "ManagedAddressConfiguration": 0,
      "RetransTimer": 0,
      "PreferredRouteFlag": "High",
      "Interface": "Device.IP.Interface.10.",
      "Status": "NoForwardingEntry",
      "Prefix": "",
      "RouteLifetime": "0001-01-01T00:00:00Z",
      "HomeAgent": 0,
      "SourceRouter": "",
      "X_PRPL-COM_LastAdvertisement": 0,
      "ReachableTime": 0,
      "OtherConfiguration": 0,
      "OptionNumberOfEntries": 0
    },
    "path": "Device.Routing.RouteInformation.InterfaceSetting.8."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPv6ForwardingNumberOfEntries": 7,
      "IPv4ForwardingNumberOfEntries": 6,
      "Status": "Enabled",
      "Alias": "main"
    },
    "path": "Device.Routing.Router.1."
  },
  {
    "parameters": {
      "ForwardingMetric": 100,
      "StaticRoute": 0,
      "DestSubnetMask": "0.0.0.0",
      "Interface": "Device.IP.Interface.3.",
      "Status": "Enabled",
      "Enable": 1,
      "DestIPAddress": "0.0.0.0",
      "GatewayIPAddress": "10.28.35.254",
      "Origin": "IPCP",
      "ForwardingPolicy": -1,
      "Alias": "cpe-default"
    },
    "path": "Device.Routing.Router.1.IPv4Forwarding.1."
  },
  {
    "parameters": {
      "ForwardingMetric": 0,
      "StaticRoute": 0,
      "DestSubnetMask": "255.255.255.0",
      "Interface": "br-lan",
      "Status": "Enabled",
      "Enable": 1,
      "DestIPAddress": "192.168.1.0",
      "GatewayIPAddress": "",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv4Forwarding-2"
    },
    "path": "Device.Routing.Router.1.IPv4Forwarding.2."
  },
  {
    "parameters": {
      "ForwardingMetric": 0,
      "StaticRoute": 0,
      "DestSubnetMask": "255.255.255.0",
      "Interface": "br-guest",
      "Status": "Enabled",
      "Enable": 1,
      "DestIPAddress": "192.168.2.0",
      "GatewayIPAddress": "",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv4Forwarding-3"
    },
    "path": "Device.Routing.Router.1.IPv4Forwarding.3."
  },
  {
    "parameters": {
      "ForwardingMetric": 0,
      "StaticRoute": 0,
      "DestSubnetMask": "255.255.255.0",
      "Interface": "br-lcm",
      "Status": "Enabled",
      "Enable": 1,
      "DestIPAddress": "192.168.3.0",
      "GatewayIPAddress": "",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv4Forwarding-4"
    },
    "path": "Device.Routing.Router.1.IPv4Forwarding.4."
  },
  {
    "parameters": {
      "ForwardingMetric": 0,
      "StaticRoute": 0,
      "DestSubnetMask": "255.0.0.0",
      "Interface": "br-lan",
      "Status": "Enabled",
      "Enable": 1,
      "DestIPAddress": "239.0.0.0",
      "GatewayIPAddress": "",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv4Forwarding-5"
    },
    "path": "Device.Routing.Router.1.IPv4Forwarding.5."
  },
  {
    "parameters": {
      "ForwardingMetric": 0,
      "StaticRoute": 0,
      "DestSubnetMask": "255.255.255.255",
      "Interface": "pppoe-wan",
      "Status": "Enabled",
      "Enable": 1,
      "DestIPAddress": "10.28.35.254",
      "GatewayIPAddress": "",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv4Forwarding-6"
    },
    "path": "Device.Routing.Router.1.IPv4Forwarding.6."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "NextHop": "",
      "Interface": "Device.IP.Interface.1.",
      "Status": "Disabled",
      "Enable": 0,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Static",
      "ForwardingPolicy": -1,
      "Alias": "prefix_blackhole-default",
      "Type": "Blackhole",
      "DestIPPrefix": ""
    },
    "path": "Device.Routing.Router.1.IPv6Forwarding.1."
  },
  {
    "parameters": {
      "ForwardingMetric": 256,
      "NextHop": "",
      "Interface": "br-lan",
      "Status": "Enabled",
      "Enable": 1,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv6Forwarding-2",
      "Type": "Normal",
      "DestIPPrefix": "fe80::/64"
    },
    "path": "Device.Routing.Router.1.IPv6Forwarding.2."
  },
  {
    "parameters": {
      "ForwardingMetric": 256,
      "NextHop": "",
      "Interface": "pppoe-wan",
      "Status": "Enabled",
      "Enable": 1,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv6Forwarding-4",
      "Type": "Normal",
      "DestIPPrefix": "fe80::c58f:1bfb:39f9:c649/128"
    },
    "path": "Device.Routing.Router.1.IPv6Forwarding.4."
  },
  {
    "parameters": {
      "ForwardingMetric": 256,
      "NextHop": "",
      "Interface": "pppoe-wan",
      "Status": "Enabled",
      "Enable": 1,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv6Forwarding-5",
      "Type": "Normal",
      "DestIPPrefix": "fe80::aebc:d9ff:fe0c:1adc/128"
    },
    "path": "Device.Routing.Router.1.IPv6Forwarding.5."
  },
  {
    "parameters": {
      "ForwardingMetric": 1024,
      "NextHop": "fe80::aebc:d9ff:fe0c:1adc",
      "Interface": "pppoe-wan",
      "Status": "Enabled",
      "Enable": 1,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv6Forwarding-6",
      "Type": "Normal",
      "DestIPPrefix": "::/0"
    },
    "path": "Device.Routing.Router.1.IPv6Forwarding.6."
  },
  {
    "parameters": {
      "ForwardingMetric": 256,
      "NextHop": "",
      "Interface": "pppoe-wan",
      "Status": "Enabled",
      "Enable": 1,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv6Forwarding-7",
      "Type": "Normal",
      "DestIPPrefix": "2600:80a:458:1a20::/64"
    },
    "path": "Device.Routing.Router.1.IPv6Forwarding.7."
  },
  {
    "parameters": {
      "ForwardingMetric": 256,
      "NextHop": "",
      "Interface": "br-lan",
      "Status": "Enabled",
      "Enable": 1,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Automatic",
      "ForwardingPolicy": -1,
      "Alias": "cpe-IPv6Forwarding-8",
      "Type": "Normal",
      "DestIPPrefix": "2600:80a:458:9a21::/64"
    },
    "path": "Device.Routing.Router.1.IPv6Forwarding.8."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPv6ForwardingNumberOfEntries": 0,
      "IPv4ForwardingNumberOfEntries": 0,
      "Status": "Enabled",
      "Alias": "option121"
    },
    "path": "Device.Routing.Router.17."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPv6ForwardingNumberOfEntries": 1,
      "IPv4ForwardingNumberOfEntries": 1,
      "Status": "Enabled",
      "Alias": "ETH_VOIP"
    },
    "path": "Device.Routing.Router.2."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "StaticRoute": 0,
      "DestSubnetMask": "0.0.0.0",
      "Interface": "Device.IP.Interface.8.",
      "Status": "Error",
      "Enable": 1,
      "DestIPAddress": "0.0.0.0",
      "GatewayIPAddress": "",
      "Origin": "DHCPv4",
      "ForwardingPolicy": -1,
      "Alias": "cpe-default"
    },
    "path": "Device.Routing.Router.2.IPv4Forwarding.1."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "NextHop": "",
      "Interface": "Device.IP.Interface.1.",
      "Status": "Disabled",
      "Enable": 0,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Static",
      "ForwardingPolicy": -1,
      "Alias": "prefix_blackhole-default",
      "Type": "Blackhole",
      "DestIPPrefix": ""
    },
    "path": "Device.Routing.Router.2.IPv6Forwarding.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPv6ForwardingNumberOfEntries": 1,
      "IPv4ForwardingNumberOfEntries": 1,
      "Status": "Enabled",
      "Alias": "ETH_IPTV"
    },
    "path": "Device.Routing.Router.3."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "StaticRoute": 0,
      "DestSubnetMask": "0.0.0.0",
      "Interface": "Device.IP.Interface.9.",
      "Status": "Error",
      "Enable": 1,
      "DestIPAddress": "0.0.0.0",
      "GatewayIPAddress": "",
      "Origin": "DHCPv4",
      "ForwardingPolicy": -1,
      "Alias": "cpe-default"
    },
    "path": "Device.Routing.Router.3.IPv4Forwarding.1."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "NextHop": "",
      "Interface": "Device.IP.Interface.1.",
      "Status": "Disabled",
      "Enable": 0,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Static",
      "ForwardingPolicy": -1,
      "Alias": "prefix_blackhole-default",
      "Type": "Blackhole",
      "DestIPPrefix": ""
    },
    "path": "Device.Routing.Router.3.IPv6Forwarding.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPv6ForwardingNumberOfEntries": 1,
      "IPv4ForwardingNumberOfEntries": 1,
      "Status": "Enabled",
      "Alias": "ETH_MGMT"
    },
    "path": "Device.Routing.Router.4."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "StaticRoute": 0,
      "DestSubnetMask": "0.0.0.0",
      "Interface": "Device.IP.Interface.10.",
      "Status": "Error",
      "Enable": 1,
      "DestIPAddress": "0.0.0.0",
      "GatewayIPAddress": "",
      "Origin": "DHCPv4",
      "ForwardingPolicy": -1,
      "Alias": "cpe-default"
    },
    "path": "Device.Routing.Router.4.IPv4Forwarding.1."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "NextHop": "",
      "Interface": "Device.IP.Interface.1.",
      "Status": "Disabled",
      "Enable": 0,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Static",
      "ForwardingPolicy": -1,
      "Alias": "prefix_blackhole-default",
      "Type": "Blackhole",
      "DestIPPrefix": ""
    },
    "path": "Device.Routing.Router.4.IPv6Forwarding.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPv6ForwardingNumberOfEntries": 1,
      "IPv4ForwardingNumberOfEntries": 1,
      "Status": "Enabled",
      "Alias": "GPON_VOIP"
    },
    "path": "Device.Routing.Router.5."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "StaticRoute": 0,
      "DestSubnetMask": "0.0.0.0",
      "Interface": "Device.IP.Interface.8.",
      "Status": "Error",
      "Enable": 1,
      "DestIPAddress": "0.0.0.0",
      "GatewayIPAddress": "",
      "Origin": "DHCPv4",
      "ForwardingPolicy": -1,
      "Alias": "cpe-default"
    },
    "path": "Device.Routing.Router.5.IPv4Forwarding.1."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "NextHop": "",
      "Interface": "Device.IP.Interface.1.",
      "Status": "Disabled",
      "Enable": 0,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Static",
      "ForwardingPolicy": -1,
      "Alias": "prefix_blackhole-default",
      "Type": "Blackhole",
      "DestIPPrefix": ""
    },
    "path": "Device.Routing.Router.5.IPv6Forwarding.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPv6ForwardingNumberOfEntries": 1,
      "IPv4ForwardingNumberOfEntries": 1,
      "Status": "Enabled",
      "Alias": "GPON_IPTV"
    },
    "path": "Device.Routing.Router.6."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "StaticRoute": 0,
      "DestSubnetMask": "0.0.0.0",
      "Interface": "Device.IP.Interface.9.",
      "Status": "Error",
      "Enable": 1,
      "DestIPAddress": "0.0.0.0",
      "GatewayIPAddress": "",
      "Origin": "DHCPv4",
      "ForwardingPolicy": -1,
      "Alias": "cpe-default"
    },
    "path": "Device.Routing.Router.6.IPv4Forwarding.1."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "NextHop": "",
      "Interface": "Device.IP.Interface.1.",
      "Status": "Disabled",
      "Enable": 0,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Static",
      "ForwardingPolicy": -1,
      "Alias": "prefix_blackhole-default",
      "Type": "Blackhole",
      "DestIPPrefix": ""
    },
    "path": "Device.Routing.Router.6.IPv6Forwarding.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "IPv6ForwardingNumberOfEntries": 1,
      "IPv4ForwardingNumberOfEntries": 1,
      "Status": "Enabled",
      "Alias": "GPON_MGMT"
    },
    "path": "Device.Routing.Router.7."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "StaticRoute": 0,
      "DestSubnetMask": "0.0.0.0",
      "Interface": "Device.IP.Interface.10.",
      "Status": "Error",
      "Enable": 1,
      "DestIPAddress": "0.0.0.0",
      "GatewayIPAddress": "",
      "Origin": "DHCPv4",
      "ForwardingPolicy": -1,
      "Alias": "cpe-default"
    },
    "path": "Device.Routing.Router.7.IPv4Forwarding.1."
  },
  {
    "parameters": {
      "ForwardingMetric": -1,
      "NextHop": "",
      "Interface": "Device.IP.Interface.1.",
      "Status": "Disabled",
      "Enable": 0,
      "ExpirationTime": "9999-12-31T23:59:59Z",
      "Origin": "Static",
      "ForwardingPolicy": -1,
      "Alias": "prefix_blackhole-default",
      "Type": "Blackhole",
      "DestIPPrefix": ""
    },
    "path": "Device.Routing.Router.7.IPv6Forwarding.1."
  }
];

module.exports = { data };