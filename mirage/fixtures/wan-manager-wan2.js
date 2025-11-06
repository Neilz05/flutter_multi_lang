export const data = [
  {
    "parameters": {
      "PhysicalType": "GPON",
      "EnableSensing": 1,
      "IPv6DNSMode": "Dynamic",
      "Origin": "user",
      "Alias": "GPON",
      "Status": "Enabled",
      "DNSMode": "Dynamic",
      "Name": "GPON"
    },
    "path": "WANManager.WAN.2."
  },
  {
    "parameters": {
      "X_SC_VlanList": "1104",
      "Password": "",
      "IPv6Reference": "Device.IP.Interface.3.",
      "IPv4Reference": "Device.IP.Interface.3.",
      "VlanPriority": 0,
      "UserName": "",
      "Name": "wan",
      "Type": "vlan",
      "DefaultRouteReference": "Device.Routing.Router.main.IPv4Forwarding.1.",
      "DeferredIPv6Instances": "Device.IP.Interface.2.,Device.IP.Interface.5.,Device.IP.Interface.6.",
      "IPv4Mode": "ppp4",
      "IPv6AddressDelegate": "",
      "IPv6Mode": "ppp6",
      "DHCPv6Reference": "Device.DHCPv6.Client.wan.",
      "Alias": "HSIA",
      "DHCPv4Reference": "",
      "VlanID": 1104,
      "BridgeReference": ""
    },
    "path": "WANManager.WAN.2.Intf.1."
  },
  {
    "parameters": {
      "X_SC_VlanList": "1102",
      "Password": "",
      "IPv6Reference": "Device.IP.Interface.8.",
      "IPv4Reference": "Device.IP.Interface.8.",
      "VlanPriority": 5,
      "UserName": "",
      "Name": "voip",
      "Type": "vlan",
      "DefaultRouteReference": "Device.Routing.Router.GPON_VOIP.IPv4Forwarding.1.",
      "DeferredIPv6Instances": "",
      "IPv4Mode": "dhcp4",
      "IPv6AddressDelegate": "",
      "IPv6Mode": "none",
      "DHCPv6Reference": "",
      "Alias": "GPON_VOIP",
      "DHCPv4Reference": "Device.DHCPv4.Client.voip.",
      "VlanID": 1102,
      "BridgeReference": ""
    },
    "path": "WANManager.WAN.2.Intf.2."
  },
  {
    "parameters": {
      "X_SC_VlanList": "1103",
      "Password": "",
      "IPv6Reference": "Device.IP.Interface.9.",
      "IPv4Reference": "Device.IP.Interface.9.",
      "VlanPriority": 2,
      "UserName": "",
      "Name": "iptv",
      "Type": "vlan",
      "DefaultRouteReference": "Device.Routing.Router.GPON_IPTV.IPv4Forwarding.1.",
      "DeferredIPv6Instances": "",
      "IPv4Mode": "dhcp4",
      "IPv6AddressDelegate": "",
      "IPv6Mode": "none",
      "DHCPv6Reference": "",
      "Alias": "GPON_IPTV",
      "DHCPv4Reference": "Device.DHCPv4.Client.iptv.",
      "VlanID": 1103,
      "BridgeReference": ""
    },
    "path": "WANManager.WAN.2.Intf.3."
  },
  {
    "parameters": {
      "X_SC_VlanList": "1101,0",
      "Password": "",
      "IPv6Reference": "Device.IP.Interface.10.",
      "IPv4Reference": "Device.IP.Interface.10.",
      "VlanPriority": 3,
      "UserName": "",
      "Name": "mgmt",
      "Type": "vlan",
      "DefaultRouteReference": "Device.Routing.Router.GPON_MGMT.IPv4Forwarding.1.",
      "DeferredIPv6Instances": "",
      "IPv4Mode": "dhcp4",
      "IPv6AddressDelegate": "",
      "IPv6Mode": "none",
      "DHCPv6Reference": "",
      "Alias": "GPON_MGMT",
      "DHCPv4Reference": "Device.DHCPv4.Client.mgmt.",
      "VlanID": 1101,
      "BridgeReference": ""
    },
    "path": "WANManager.WAN.2.Intf.4."
  }
];