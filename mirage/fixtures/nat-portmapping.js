export const data = [
  {
    "parameters": {
      "Alias": "cpe-PortMapping-1",
      "AllInterfaces": 0,
      "Description": "libminiupnpc",
      "Enable": 1,
      "ExternalPort": 33995 ,
      "ExternalPortEndRange": 0,
      "Interface": "Device.IP.Interface.1.",
      "InternalClient": "192.168.1.100",
      "InternalPort": 33995,
      "LeaseDuration": 0,
      "Origin": "Static",
      "Protocol": "TCP",
      "RemainingLeaseTime": 0,
      "RemoteHost": "",
      "ScheduleRef": "",
      "Status": "Enabled",
      "X_PRPL-COM_Log": 1
    },
    "path": "Device.NAT.PortMapping.1."
  },
  {
    "parameters": {
      "Alias": "cpe-PortMapping-2",
      "AllInterfaces": 1,
      "Description": "Game Server (UDP)",
      "Enable": 1,
      "ExternalPort": 7777,
      "ExternalPortEndRange": 7780,
      "Interface": "",
      "InternalClient": "192.168.1.150",
      "InternalPort": 7777,
      "LeaseDuration": 86400,
      "Origin": "UPnP",
      "Protocol": "UDP",
      "RemainingLeaseTime": 86300,
      "RemoteHost": "",
      "ScheduleRef": "",
      "Status": "Enabled",
      "X_PRPL-COM_Log": 0
    },
    "path": "Device.NAT.PortMapping.2."
  },
  {
    "parameters": {
      "Alias": "cpe-PortMapping-3",
      "AllInterfaces": 0,
      "Description": "Disabled SSH Rule",
      "Enable": 0,
      "ExternalPort": 22,
      "ExternalPortEndRange": 0,
      "Interface": "Device.IP.Interface.2.",
      "InternalClient": "192.168.1.200",
      "InternalPort": 22,
      "LeaseDuration": 0,
      "Origin": "Static",
      "Protocol": "TCP",
      "RemainingLeaseTime": 0,
      "RemoteHost": "203.0.113.5",
      "ScheduleRef": "Nightly",
      "Status": "Disabled",
      "X_PRPL-COM_Log": 1
    },
    "path": "Device.NAT.PortMapping.3."
  }
]