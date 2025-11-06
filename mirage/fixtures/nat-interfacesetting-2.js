let data = [
  {
    "parameters": {
      "Enable": 1,
      "X_PRPL-COM_NATInterfaceNumberOfEntries": 3,
      "Interface": "Device.Logical.Interface.5.",
      "Alias": "voip",
      "Status": "Enabled"
    },
    "path": "Device.NAT.InterfaceSetting.2."
  },
  {
    "parameters": {
      "Interface": "Device.IP.Interface.2.",
      "Alias": "lan"
    },
    "path": "Device.NAT.InterfaceSetting.2.X_PRPL-COM_NATInterface.1."
  },
  {
    "parameters": {
      "Interface": "Device.IP.Interface.5.",
      "Alias": "guest"
    },
    "path": "Device.NAT.InterfaceSetting.2.X_PRPL-COM_NATInterface.2."
  },
  {
    "parameters": {
      "Interface": "Device.IP.Interface.6.",
      "Alias": "lcm"
    },
    "path": "Device.NAT.InterfaceSetting.2.X_PRPL-COM_NATInterface.3."
  }
]

export { data };