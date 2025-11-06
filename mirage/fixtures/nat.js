let data = [
  {
    "parameters": {
      "InterfaceSettingNumberOfEntries": 3,
      "X_PRPL-COM_MaximumConntrackEntries": 65536,
      "PortMappingNumberOfEntries": 0,
      "X_PRPL-COM_NumberOfConntrackEntries": 31,
      "X_PRPL-COM_MaxPortTriggerNumberOfEntries": 100,
      "PortMappingAllowedOrigins": "User,System,UPnp,Controller,Static,UPnP_IWF,Internal",
      "X_PRPL-COM_MaxPortMappingNumberOfEntries": 20,
      "PortTriggerNumberOfEntries": 0
    },
    "path": "Device.NAT."
  },
  {
    "parameters": {
      "Enable": 1,
      "X_PRPL-COM_NATInterfaceNumberOfEntries": 3,
      "Interface": "Device.Logical.Interface.1.",
      "Alias": "wan",
      "Status": "Error_Misconfigured"
    },
    "path": "Device.NAT.InterfaceSetting.1."
  },
  {
    "parameters": {
      "Interface": "Device.IP.Interface.2.",
      "Alias": "lan"
    },
    "path": "Device.NAT.InterfaceSetting.1.X_PRPL-COM_NATInterface.1."
  },
  {
    "parameters": {
      "Interface": "Device.IP.Interface.5.",
      "Alias": "guest"
    },
    "path": "Device.NAT.InterfaceSetting.1.X_PRPL-COM_NATInterface.2."
  },
  {
    "parameters": {
      "Interface": "Device.IP.Interface.6.",
      "Alias": "lcm"
    },
    "path": "Device.NAT.InterfaceSetting.1.X_PRPL-COM_NATInterface.3."
  },
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
  },
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
// module.exports = { data };

module.exports = { data };