let data = [
  {
    "parameters": {
      "Enable": 1,
      "X_PRPL-COM_NATInterfaceNumberOfEntries": 3,
      "Interface": "Device.Logical.Interface.7.",
      "Alias": "iptv",
      "Status": "Enabled"
    },
    "path": "Device.NAT.InterfaceSetting.3."
  },
  {
    "parameters": {
      "Interface": "Device.IP.Interface.2.",
      "Alias": "lan"
    },
    "path": "Device.NAT.InterfaceSetting.3.X_PRPL-COM_NATInterface.1."
  },
  {
    "parameters": {
      "Interface": "Device.IP.Interface.5.",
      "Alias": "guest"
    },
    "path": "Device.NAT.InterfaceSetting.3.X_PRPL-COM_NATInterface.2."
  },
  {
    "parameters": {
      "Interface": "Device.IP.Interface.6.",
      "Alias": "lcm"
    },
    "path": "Device.NAT.InterfaceSetting.3.X_PRPL-COM_NATInterface.3."
  },
  {
    "parameters": {
      "HostNumberOfEntries": 0
    },
    "path": "Device.NAT.X_PRPL-COM_StaticNAT."
  }
]

module.exports = { data };