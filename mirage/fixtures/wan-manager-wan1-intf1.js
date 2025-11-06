const data = [
// export const data = [
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
    "path": "WANManager.WAN.1.Intf.1."
  }
];

module.exports = { data };