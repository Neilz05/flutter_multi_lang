const data = [
// export const data = [
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

module.exports = { data };