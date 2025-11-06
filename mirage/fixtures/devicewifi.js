const data = [
  {
    "parameters": {
      "X_SC_SSIDIsolation": 0,
      "X_SC_SSIDSplit": 0
    },
    "path": "Device.WiFi."
  },
  {
    "parameters": {
      "MultiAPProfile": 0,
      "MBOAssocDisallowReason": "Off",
      "RadioReference": "WiFi.Radio.Wl1",
      "ActiveVideoAssociatedDeviceNumberOfEntries": 0,
      "WMMCapability": 0,
      "UAPSDEnable": 0,
      "BridgeInterface": "br-lan",
      "Index": 21,
      "MaxAssociatedDevices": 64,
      "IEEE80211kEnabled": 1,
      "DiscoveryMethodEnabled": "Default",
      "CpeOperationMode": "Router",
      "ActiveAssociatedDeviceNumberOfEntries": 0,
      "DefaultDeviceType": "Data",
      "RetryLimit": 3,
      "MCEnable": 0,
      "MBOEnable": 0,
      "IsolationEnable": 0,
      "CustomAlias": "WiFi-2G",
      "AssociatedDeviceNumberOfEntries": 0,
      "SSIDReference": "Device.WiFi.SSID.1",
      "MACFilterAddressList": "",
      "Status": "Enabled",
      "Enable": 1,
      "APBridgeDisable": 0,
      "MACAddressControlEnabled": 0,
      "dbgAPFile": "",
      "ReferenceApRelay": "",
      "WMMEnable": 0,
      "WDSEnable": 1,
      "UAPSDCapability": 0,
      "MultiAPType": "FronthaulBSS",
      "MultiAPVlanId": 0,
      "ApRole": "Off",
      "SSIDAdvertisementEnabled": 1,
      "Alias": "wl1",
      "dbgAPEnable": 0
    },
    "path": "Device.WiFi.AccessPoint.1."
  },
  {
    "parameters": {
      "Fail": 0,
      "FastReconnects": 0,
      "ResetCounters": 0,
      "FailSecurity": 0,
      "Success": 0,
      "Disconnect": 0
    },
    "path": "Device.WiFi.AccessPoint.1.AssociationCount."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "Default"
    },
    "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.1."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnStateChange"
    },
    "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.2."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnScan"
    },
    "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.3."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "User"
    },
    "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.4."
  },
  {
    "parameters": {
      "BssMaxIdlePeriod": -1
    },
    "path": "Device.WiFi.AccessPoint.1.DriverConfig."
  },
  {
    "parameters": {
      "AccessNetworkType": 2,
      "L2TrafficInspect": "",
      "Enable": 0,
      "DgafDisable": 0,
      "VenueGroup": 2,
      "Interworking": 1,
      "Internet": 0,
      "Additional": 0,
      "IcmpV4Echo": 1,
      "VenueName": "",
      "VenueType": 8,
      "WanMetrics": "",
      "DomainName": "",
      "Hs2Ie": 0,
      "RoamingConsortium": "",
      "OperatingClass": "",
      "HeSSID": "",
      "P2PEnable": 0,
      "GasDelay": 0,
      "Anqp3gpp_CellNet": ""
    },
    "path": "Device.WiFi.AccessPoint.1.HotSpot2."
  },
  {
    "parameters": {
      "Enabled": 0,
      "FTOverDSEnable": 0,
      "MobilityDomain": 0,
      "NASIdentifier": "764018D6A81C8FEA",
      "R0KHKey": "0B503EAA46C959F56489E33592007C7D"
    },
    "path": "Device.WiFi.AccessPoint.1.IEEE80211r."
  },
  {
    "parameters": {
      "InterworkingEnable": 0,
      "QoSMapSet": ""
    },
    "path": "Device.WiFi.AccessPoint.1.IEEE80211u."
  },
  {
    "parameters": {
      "TempBlacklistEnable": 1,
      "Mode": "Off"
    },
    "path": "Device.WiFi.AccessPoint.1.MACFiltering."
  },
  {
    "parameters": {
      "ErrorsSent": 0,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "PacketsSent": 0,
      "EstServiceParametersVI": "",
      "UnicastBytesSent": 0,
      "BroadcastBytesReceived": 0,
      "EstServiceParametersVO": "",
      "LinkID": 0,
      "EstServiceParametersBE": "",
      "UnicastBytesReceived": 0,
      "MLORole": "",
      "PacketsReceived": 0,
      "EstServiceParametersBK": "",
      "MulticastBytesSent": 0
    },
    "path": "Device.WiFi.AccessPoint.1.MLOStats."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.AccessPoint.1.ProbeFiltering."
  },
  {
    "parameters": {
      "RssiInterval": 10,
      "HistoryEnable": 1,
      "HistoryIntervalCoeff": 1,
      "Enable": 0,
      "SendEventOnDisassoc": 1,
      "AveragingFactor": 500,
      "Interval": 1000,
      "HistoryLen": 10,
      "SendPeriodicEvent": 0,
      "SendEventOnAssoc": 1
    },
    "path": "Device.WiFi.AccessPoint.1.RssiEventing."
  },
  {
    "parameters": {
      "RadiusCalledStationId": "",
      "MFPConfig": "Disabled",
      "SAEPassphrase": "",
      "RadiusOwnIPAddress": "",
      "RadiusChargeableUserId": 0,
      "EncryptionMode": "Default",
      "RadiusNASIdentifier": "",
      "RekeyingInterval": 3600,
      "OWETransitionInterface": "",
      "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal",
      "ModeEnabled": "WPA2-WPA3-Personal",
      "RadiusServerPort": 1812,
      "RadiusSecret": "",
      "TransitionDisable": "",
      "KeyPassPhrase": "12345678",
      "SHA256Enable": 0,
      "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
      "PreSharedKey": "",
      "RadiusServerIPAddr": "",
      "RadiusDefaultSessionTimeout": 0,
      "WEPKey": "123456789ABCD",
      "SPPAmsdu": -1
    },
    "path": "Device.WiFi.AccessPoint.1.Security."
  },
  {
    "parameters": {
      "Enable": 0
    },
    "path": "Device.WiFi.AccessPoint.1.VendorIEs."
  },
  {
    "parameters": {
      "RestartOnRequest": 0,
      "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay",
      "PairingInProgress": 0,
      "Status": "Disabled",
      "CertModeEnable": 0,
      "SelfPIN": "85778474",
      "Enable": 1,
      "UUID": "4c4d5748-4e5b-f64b-fc5a-48454c4d5748",
      "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay",
      "RelayCredentialsEnable": 0,
      "Version": "2.0",
      "Configured": 1
    },
    "path": "Device.WiFi.AccessPoint.1.WPS."
  },
  {
    "parameters": {
      "MultiAPProfile": 0,
      "MBOAssocDisallowReason": "Off",
      "RadioReference": "WiFi.Radio.Wl0",
      "ActiveVideoAssociatedDeviceNumberOfEntries": 0,
      "WMMCapability": 0,
      "UAPSDEnable": 0,
      "BridgeInterface": "br-lan",
      "Index": 20,
      "MaxAssociatedDevices": 64,
      "IEEE80211kEnabled": 1,
      "DiscoveryMethodEnabled": "Default",
      "CpeOperationMode": "Router",
      "ActiveAssociatedDeviceNumberOfEntries": 0,
      "DefaultDeviceType": "Data",
      "RetryLimit": 3,
      "MCEnable": 0,
      "MBOEnable": 0,
      "IsolationEnable": 0,
      "CustomAlias": "WiFi-5G",
      "AssociatedDeviceNumberOfEntries": 1,
      "SSIDReference": "Device.WiFi.SSID.2",
      "MACFilterAddressList": "",
      "Status": "Enabled",
      "Enable": 1,
      "APBridgeDisable": 0,
      "MACAddressControlEnabled": 0,
      "dbgAPFile": "",
      "ReferenceApRelay": "",
      "WMMEnable": 0,
      "WDSEnable": 1,
      "UAPSDCapability": 0,
      "MultiAPType": "FronthaulBSS",
      "MultiAPVlanId": 0,
      "ApRole": "Off",
      "SSIDAdvertisementEnabled": 1,
      "Alias": "wl0",
      "dbgAPEnable": 0
    },
    "path": "Device.WiFi.AccessPoint.2."
  },
  {
    "parameters": {
      "AuthenticationState": 0,
      "UplinkShortGuard": 0,
      "TxPacketCount": 36,
      "DownlinkBandwidth": 80,
      "RxMulticastPacketCount": 0,
      "RxSupportedHeMCS": "",
      "TxSupportedHe160MCS": "",
      "SecurityModeEnabled": "WPA3-Personal",
      "UNIIBandsCapabilities": "",
      "RxUnicastPacketCount": 0,
      "MaxDownlinkRateSupported": 0,
      "TxBytes": 3356,
      "MultipleRetryCount": 0,
      "DisassociationTime": "2025-07-13T11:32:45Z",
      "HeCapabilities": "",
      "MaxTxSpatialStreamsSupported": 1,
      "TxSupportedHeMCS": "",
      "SupportedHtMCS": "",
      "TxSupportedHe80x80MCS": "",
      "VendorOUI": "",
      "TxUnicastPacketCount": 0,
      "SignalNoiseRatio": 0,
      "MaxDownlinkRateReached": 1200900,
      "NoiseByChain": "",
      "MACAddress": "DA:67:B6:35:2D:82",
      "Noise": 0,
      "AvgSignalStrengthByChain": -32,
      "TxMulticastPacketCount": 0,
      "Rx_RetransmissionsFailed": 0,
      "PowerSave": 0,
      "EhtCapabilities": "",
      "AvgSignalStrength": 0,
      "RrmOnChannelMaxDuration": 0,
      "MaxRxSpatialStreamsSupported": 1,
      "RrmCapabilities": "",
      "DownlinkRateSpec": "leg_0_80_1_0",
      "UplinkMCS": 0,
      "DeviceType": "Data",
      "RxBytes": 11762,
      "RxPacketCount": 98,
      "FrequencyCapabilities": "",
      "Tx_RetransmissionsFailed": 0,
      "Capabilities": "",
      "MaxUplinkRateReached": 864800,
      "UplinkBandwidth": 20,
      "EncryptionMode": "Default",
      "DevicePriority": 1,
      "MUMimoTxPktsCount": 0,
      "Inactive": 0,
      "SignalStrengthHistory": "-54,-39,-42,-39",
      "VhtCapabilities": "",
      "RxSupportedHe80x80MCS": "",
      "RxSupportedVhtMCS": "",
      "RrmOffChannelMaxDuration": 0,
      "LastDataDownlinkRate": 1200900,
      "MUUserPositionId": 0,
      "MaxUplinkRateSupported": 864800,
      "AssociationTime": "2025-07-13T11:32:37Z",
      "RetryCount": 0,
      "LinkBandwidth": "80MHz",
      "ChargeableUserId": "",
      "MUMimoTxPktsPercentage": 0,
      "TxErrors": 0,
      "UplinkRateSpec": "leg_0_20_1_0",
      "Tx_Retransmissions": 0,
      "RxSupportedHe160MCS": "",
      "MLOMode": "Unknown",
      "MaxBandwidthSupported": "Unknown",
      "DownlinkMCS": 0,
      "VendorCapabilities": "",
      "RxErrors": 0,
      "DownlinkShortGuard": 0,
      "TxSupportedVhtMCS": "",
      "ConnectionDuration": 8,
      "LastStateChange": "2025-07-13T11:32:45Z",
      "SupportedMCS": "",
      "ActiveNumberOfAffiliatedSta": 0,
      "Retransmissions": 0,
      "LastDataUplinkRate": 258000,
      "OperatingStandard": "Unknown",
      "Rx_Retransmissions": 0,
      "SignalStrength": -39,
      "Active": 0,
      "HtCapabilities": "",
      "SignalStrengthByChain": "-32.0",
      "MUGroupId": 0
    },
    "path": "Device.WiFi.AccessPoint.2.AssociatedDevice.1."
  },
  {
    "parameters": {
      "TxSupportedHe80x80MCS": "",
      "VendorOUI": "",
      "RxSupportedHe160MCS": "",
      "EncryptionMode": "Default",
      "EhtCapabilities": "",
      "RxSupportedHeMCS": "",
      "VhtCapabilities": "",
      "TxSupportedVhtMCS": "",
      "TxSupportedHe160MCS": "",
      "SecurityModeEnabled": "Unknown",
      "RrmOnChannelMaxDuration": 0,
      "RxSupportedHe80x80MCS": "",
      "RxSupportedVhtMCS": "",
      "SupportedMCS": "",
      "HeCapabilities": "",
      "RrmCapabilities": "",
      "RrmOffChannelMaxDuration": 0,
      "FrequencyCapabilities": "",
      "HtCapabilities": "",
      "TxSupportedHeMCS": "",
      "LinkBandwidth": "Unknown",
      "SupportedHtMCS": ""
    },
    "path": "Device.WiFi.AccessPoint.2.AssociatedDevice.1.ProbeReqCaps."
  },
  {
    "parameters": {
      "Fail": 0,
      "FastReconnects": 1,
      "ResetCounters": 0,
      "FailSecurity": 0,
      "Success": 2,
      "Disconnect": 2
    },
    "path": "Device.WiFi.AccessPoint.2.AssociationCount."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "Default"
    },
    "path": "Device.WiFi.AccessPoint.2.AssociationCount.FastReconnectTypes.1."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnStateChange"
    },
    "path": "Device.WiFi.AccessPoint.2.AssociationCount.FastReconnectTypes.2."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnScan"
    },
    "path": "Device.WiFi.AccessPoint.2.AssociationCount.FastReconnectTypes.3."
  },
  {
    "parameters": {
      "Count": 1,
      "Type": "User"
    },
    "path": "Device.WiFi.AccessPoint.2.AssociationCount.FastReconnectTypes.4."
  },
  {
    "parameters": {
      "BssMaxIdlePeriod": -1
    },
    "path": "Device.WiFi.AccessPoint.2.DriverConfig."
  },
  {
    "parameters": {
      "AccessNetworkType": 2,
      "L2TrafficInspect": "",
      "Enable": 0,
      "DgafDisable": 0,
      "VenueGroup": 2,
      "Interworking": 1,
      "Internet": 0,
      "Additional": 0,
      "IcmpV4Echo": 1,
      "VenueName": "",
      "VenueType": 8,
      "WanMetrics": "",
      "DomainName": "",
      "Hs2Ie": 0,
      "RoamingConsortium": "",
      "OperatingClass": "",
      "HeSSID": "",
      "P2PEnable": 0,
      "GasDelay": 0,
      "Anqp3gpp_CellNet": ""
    },
    "path": "Device.WiFi.AccessPoint.2.HotSpot2."
  },
  {
    "parameters": {
      "Enabled": 0,
      "FTOverDSEnable": 0,
      "MobilityDomain": 0,
      "NASIdentifier": "75408BF32860AB10",
      "R0KHKey": "79EE24093BFBAC4A1864CE337611952C"
    },
    "path": "Device.WiFi.AccessPoint.2.IEEE80211r."
  },
  {
    "parameters": {
      "InterworkingEnable": 0,
      "QoSMapSet": ""
    },
    "path": "Device.WiFi.AccessPoint.2.IEEE80211u."
  },
  {
    "parameters": {
      "TempBlacklistEnable": 1,
      "Mode": "Off"
    },
    "path": "Device.WiFi.AccessPoint.2.MACFiltering."
  },
  {
    "parameters": {
      "ErrorsSent": 0,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "PacketsSent": 0,
      "EstServiceParametersVI": "",
      "UnicastBytesSent": 0,
      "BroadcastBytesReceived": 0,
      "EstServiceParametersVO": "",
      "LinkID": 0,
      "EstServiceParametersBE": "",
      "UnicastBytesReceived": 0,
      "MLORole": "",
      "PacketsReceived": 0,
      "EstServiceParametersBK": "",
      "MulticastBytesSent": 0
    },
    "path": "Device.WiFi.AccessPoint.2.MLOStats."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.AccessPoint.2.ProbeFiltering."
  },
  {
    "parameters": {
      "RssiInterval": 10,
      "HistoryEnable": 1,
      "HistoryIntervalCoeff": 1,
      "Enable": 0,
      "SendEventOnDisassoc": 1,
      "AveragingFactor": 500,
      "Interval": 1000,
      "HistoryLen": 10,
      "SendPeriodicEvent": 0,
      "SendEventOnAssoc": 1
    },
    "path": "Device.WiFi.AccessPoint.2.RssiEventing."
  },
  {
    "parameters": {
      "RadiusCalledStationId": "",
      "MFPConfig": "Disabled",
      "SAEPassphrase": "",
      "RadiusOwnIPAddress": "",
      "RadiusChargeableUserId": 0,
      "EncryptionMode": "Default",
      "RadiusNASIdentifier": "",
      "RekeyingInterval": 3600,
      "OWETransitionInterface": "",
      "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal",
      "ModeEnabled": "WPA2-WPA3-Personal",
      "RadiusServerPort": 1812,
      "RadiusSecret": "",
      "TransitionDisable": "",
      "KeyPassPhrase": "12345678",
      "SHA256Enable": 0,
      "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
      "PreSharedKey": "",
      "RadiusServerIPAddr": "",
      "RadiusDefaultSessionTimeout": 0,
      "WEPKey": "123456789ABCD",
      "SPPAmsdu": -1
    },
    "path": "Device.WiFi.AccessPoint.2.Security."
  },
  {
    "parameters": {
      "Enable": 0
    },
    "path": "Device.WiFi.AccessPoint.2.VendorIEs."
  },
  {
    "parameters": {
      "RestartOnRequest": 0,
      "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay",
      "PairingInProgress": 0,
      "Status": "Disabled",
      "CertModeEnable": 0,
      "SelfPIN": "85778474",
      "Enable": 1,
      "UUID": "4c4d5748-4e5b-f64b-fc5a-48454c4d5748",
      "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay",
      "RelayCredentialsEnable": 0,
      "Version": "2.0",
      "Configured": 1
    },
    "path": "Device.WiFi.AccessPoint.2.WPS."
  },
  {
    "parameters": {
      "MultiAPProfile": 0,
      "MBOAssocDisallowReason": "Off",
      "RadioReference": "WiFi.Radio.Wl1",
      "ActiveVideoAssociatedDeviceNumberOfEntries": 0,
      "WMMCapability": 0,
      "UAPSDEnable": 0,
      "BridgeInterface": "br-lan",
      "Index": 36,
      "MaxAssociatedDevices": 32,
      "IEEE80211kEnabled": 1,
      "DiscoveryMethodEnabled": "Default",
      "CpeOperationMode": "Router",
      "ActiveAssociatedDeviceNumberOfEntries": 0,
      "DefaultDeviceType": "Data",
      "RetryLimit": 3,
      "MCEnable": 0,
      "MBOEnable": 0,
      "IsolationEnable": 0,
      "CustomAlias": "Backhaul-2G",
      "AssociatedDeviceNumberOfEntries": 0,
      "SSIDReference": "Device.WiFi.SSID.3",
      "MACFilterAddressList": "",
      "Status": "Enabled",
      "Enable": 1,
      "APBridgeDisable": 0,
      "MACAddressControlEnabled": 0,
      "dbgAPFile": "",
      "ReferenceApRelay": "",
      "WMMEnable": 0,
      "WDSEnable": 1,
      "UAPSDCapability": 0,
      "MultiAPType": "BackhaulBSS",
      "MultiAPVlanId": 0,
      "ApRole": "Off",
      "SSIDAdvertisementEnabled": 0,
      "Alias": "wl1.1",
      "dbgAPEnable": 0
    },
    "path": "Device.WiFi.AccessPoint.3."
  },
  {
    "parameters": {
      "Fail": 0,
      "FastReconnects": 0,
      "ResetCounters": 0,
      "FailSecurity": 0,
      "Success": 0,
      "Disconnect": 0
    },
    "path": "Device.WiFi.AccessPoint.3.AssociationCount."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "Default"
    },
    "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.1."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnStateChange"
    },
    "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.2."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnScan"
    },
    "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.3."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "User"
    },
    "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.4."
  },
  {
    "parameters": {
      "BssMaxIdlePeriod": -1
    },
    "path": "Device.WiFi.AccessPoint.3.DriverConfig."
  },
  {
    "parameters": {
      "AccessNetworkType": 2,
      "L2TrafficInspect": "",
      "Enable": 0,
      "DgafDisable": 0,
      "VenueGroup": 2,
      "Interworking": 1,
      "Internet": 0,
      "Additional": 0,
      "IcmpV4Echo": 1,
      "VenueName": "",
      "VenueType": 8,
      "WanMetrics": "",
      "DomainName": "",
      "Hs2Ie": 0,
      "RoamingConsortium": "",
      "OperatingClass": "",
      "HeSSID": "",
      "P2PEnable": 0,
      "GasDelay": 0,
      "Anqp3gpp_CellNet": ""
    },
    "path": "Device.WiFi.AccessPoint.3.HotSpot2."
  },
  {
    "parameters": {
      "Enabled": 0,
      "FTOverDSEnable": 0,
      "MobilityDomain": 0,
      "NASIdentifier": "C594672D1F7FF979",
      "R0KHKey": "7D0BE51135A2866C32EB7C3CBD576A43"
    },
    "path": "Device.WiFi.AccessPoint.3.IEEE80211r."
  },
  {
    "parameters": {
      "InterworkingEnable": 0,
      "QoSMapSet": ""
    },
    "path": "Device.WiFi.AccessPoint.3.IEEE80211u."
  },
  {
    "parameters": {
      "TempBlacklistEnable": 1,
      "Mode": "Off"
    },
    "path": "Device.WiFi.AccessPoint.3.MACFiltering."
  },
  {
    "parameters": {
      "ErrorsSent": 0,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "PacketsSent": 0,
      "EstServiceParametersVI": "",
      "UnicastBytesSent": 0,
      "BroadcastBytesReceived": 0,
      "EstServiceParametersVO": "",
      "LinkID": 0,
      "EstServiceParametersBE": "",
      "UnicastBytesReceived": 0,
      "MLORole": "",
      "PacketsReceived": 0,
      "EstServiceParametersBK": "",
      "MulticastBytesSent": 0
    },
    "path": "Device.WiFi.AccessPoint.3.MLOStats."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.AccessPoint.3.ProbeFiltering."
  },
  {
    "parameters": {
      "RssiInterval": 10,
      "HistoryEnable": 1,
      "HistoryIntervalCoeff": 1,
      "Enable": 0,
      "SendEventOnDisassoc": 1,
      "AveragingFactor": 500,
      "Interval": 1000,
      "HistoryLen": 10,
      "SendPeriodicEvent": 0,
      "SendEventOnAssoc": 1
    },
    "path": "Device.WiFi.AccessPoint.3.RssiEventing."
  },
  {
    "parameters": {
      "RadiusCalledStationId": "",
      "MFPConfig": "Disabled",
      "SAEPassphrase": "",
      "RadiusOwnIPAddress": "",
      "RadiusChargeableUserId": 0,
      "EncryptionMode": "Default",
      "RadiusNASIdentifier": "",
      "RekeyingInterval": 3600,
      "OWETransitionInterface": "",
      "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal",
      "ModeEnabled": "WPA2-WPA3-Personal",
      "RadiusServerPort": 1812,
      "RadiusSecret": "",
      "TransitionDisable": "",
      "KeyPassPhrase": "J5DDBFSGFYK1XUE4GIW5LCRLO4BD6V0G",
      "SHA256Enable": 0,
      "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
      "PreSharedKey": "",
      "RadiusServerIPAddr": "",
      "RadiusDefaultSessionTimeout": 0,
      "WEPKey": "123456789ABCD",
      "SPPAmsdu": -1
    },
    "path": "Device.WiFi.AccessPoint.3.Security."
  },
  {
    "parameters": {
      "Enable": 0
    },
    "path": "Device.WiFi.AccessPoint.3.VendorIEs."
  },
  {
    "parameters": {
      "RestartOnRequest": 0,
      "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay",
      "PairingInProgress": 0,
      "Status": "Ongoing",
      "CertModeEnable": 0,
      "SelfPIN": "85778474",
      "Enable": 1,
      "UUID": "4c4d5748-4e5b-f64b-fc5a-48454c4d5748",
      "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay",
      "RelayCredentialsEnable": 0,
      "Version": "2.0",
      "Configured": 1
    },
    "path": "Device.WiFi.AccessPoint.3.WPS."
  },
  {
    "parameters": {
      "MultiAPProfile": 0,
      "MBOAssocDisallowReason": "Off",
      "RadioReference": "WiFi.Radio.Wl0",
      "ActiveVideoAssociatedDeviceNumberOfEntries": 0,
      "WMMCapability": 0,
      "UAPSDEnable": 0,
      "BridgeInterface": "br-lan",
      "Index": 35,
      "MaxAssociatedDevices": 32,
      "IEEE80211kEnabled": 1,
      "DiscoveryMethodEnabled": "Default",
      "CpeOperationMode": "Router",
      "ActiveAssociatedDeviceNumberOfEntries": 1,
      "DefaultDeviceType": "Data",
      "RetryLimit": 3,
      "MCEnable": 0,
      "MBOEnable": 0,
      "IsolationEnable": 0,
      "CustomAlias": "Backhaul-5G",
      "AssociatedDeviceNumberOfEntries": 1,
      "SSIDReference": "Device.WiFi.SSID.4",
      "MACFilterAddressList": "",
      "Status": "Enabled",
      "Enable": 1,
      "APBridgeDisable": 0,
      "MACAddressControlEnabled": 0,
      "dbgAPFile": "",
      "ReferenceApRelay": "",
      "WMMEnable": 0,
      "WDSEnable": 1,
      "UAPSDCapability": 0,
      "MultiAPType": "BackhaulBSS",
      "MultiAPVlanId": 0,
      "ApRole": "Off",
      "SSIDAdvertisementEnabled": 0,
      "Alias": "wl0.1",
      "dbgAPEnable": 0
    },
    "path": "Device.WiFi.AccessPoint.4."
  },
  {
    "parameters": {
      "AuthenticationState": 1,
      "UplinkShortGuard": 0,
      "TxPacketCount": 6156,
      "DownlinkBandwidth": 160,
      "RxMulticastPacketCount": 0,
      "RxSupportedHeMCS": "",
      "TxSupportedHe160MCS": "",
      "SecurityModeEnabled": "WPA2-WPA3-Personal",
      "UNIIBandsCapabilities": "",
      "RxUnicastPacketCount": 0,
      "MaxDownlinkRateSupported": 0,
      "TxBytes": 1049463,
      "MultipleRetryCount": 0,
      "DisassociationTime": "2025-07-13T11:20:32Z",
      "HeCapabilities": "",
      "MaxTxSpatialStreamsSupported": 0,
      "TxSupportedHeMCS": "",
      "SupportedHtMCS": "",
      "TxSupportedHe80x80MCS": "",
      "VendorOUI": "",
      "TxUnicastPacketCount": 0,
      "SignalNoiseRatio": 0,
      "MaxDownlinkRateReached": 3674200,
      "NoiseByChain": "",
      "MACAddress": "78:B3:9F:38:5C:65",
      "Noise": 0,
      "AvgSignalStrengthByChain": -38,
      "TxMulticastPacketCount": 0,
      "Rx_RetransmissionsFailed": 0,
      "PowerSave": 0,
      "EhtCapabilities": "",
      "AvgSignalStrength": 0,
      "RrmOnChannelMaxDuration": 0,
      "MaxRxSpatialStreamsSupported": 0,
      "RrmCapabilities": "",
      "DownlinkRateSpec": "unk_0_0_0_0",
      "UplinkMCS": 0,
      "DeviceType": "Data",
      "RxBytes": 901917,
      "RxPacketCount": 5602,
      "FrequencyCapabilities": "",
      "Tx_RetransmissionsFailed": 0,
      "Capabilities": "",
      "MaxUplinkRateReached": 4322600,
      "UplinkBandwidth": 160,
      "EncryptionMode": "Default",
      "DevicePriority": 1,
      "MUMimoTxPktsCount": 0,
      "Inactive": 0,
      "SignalStrengthHistory": "-50,-35,-46,-47",
      "VhtCapabilities": "",
      "RxSupportedHe80x80MCS": "",
      "RxSupportedVhtMCS": "",
      "RrmOffChannelMaxDuration": 0,
      "LastDataDownlinkRate": 3241900,
      "MUUserPositionId": 0,
      "MaxUplinkRateSupported": 0,
      "AssociationTime": "2025-07-13T11:20:53Z",
      "RetryCount": 0,
      "LinkBandwidth": "Unknown",
      "ChargeableUserId": "",
      "MUMimoTxPktsPercentage": 0,
      "TxErrors": 3,
      "UplinkRateSpec": "unk_0_0_0_0",
      "Tx_Retransmissions": 0,
      "RxSupportedHe160MCS": "",
      "MLOMode": "Unknown",
      "MaxBandwidthSupported": "Unknown",
      "DownlinkMCS": 0,
      "VendorCapabilities": "",
      "RxErrors": 0,
      "DownlinkShortGuard": 0,
      "TxSupportedVhtMCS": "",
      "ConnectionDuration": 1089,
      "LastStateChange": "2025-07-13T11:20:53Z",
      "SupportedMCS": "",
      "ActiveNumberOfAffiliatedSta": 0,
      "Retransmissions": 0,
      "LastDataUplinkRate": 2450300,
      "OperatingStandard": "Unknown",
      "Rx_Retransmissions": 0,
      "SignalStrength": -46,
      "Active": 1,
      "HtCapabilities": "",
      "SignalStrengthByChain": "-38.0",
      "MUGroupId": 0
    },
    "path": "Device.WiFi.AccessPoint.4.AssociatedDevice.1."
  },
  {
    "parameters": {
      "TxSupportedHe80x80MCS": "",
      "VendorOUI": "",
      "RxSupportedHe160MCS": "",
      "EncryptionMode": "Default",
      "EhtCapabilities": "",
      "RxSupportedHeMCS": "",
      "VhtCapabilities": "",
      "TxSupportedVhtMCS": "",
      "TxSupportedHe160MCS": "",
      "SecurityModeEnabled": "Unknown",
      "RrmOnChannelMaxDuration": 0,
      "RxSupportedHe80x80MCS": "",
      "RxSupportedVhtMCS": "",
      "SupportedMCS": "",
      "HeCapabilities": "",
      "RrmCapabilities": "",
      "RrmOffChannelMaxDuration": 0,
      "FrequencyCapabilities": "",
      "HtCapabilities": "",
      "TxSupportedHeMCS": "",
      "LinkBandwidth": "Unknown",
      "SupportedHtMCS": ""
    },
    "path": "Device.WiFi.AccessPoint.4.AssociatedDevice.1.ProbeReqCaps."
  },
  {
    "parameters": {
      "Fail": 0,
      "FastReconnects": 2,
      "ResetCounters": 0,
      "FailSecurity": 0,
      "Success": 3,
      "Disconnect": 2
    },
    "path": "Device.WiFi.AccessPoint.4.AssociationCount."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "Default"
    },
    "path": "Device.WiFi.AccessPoint.4.AssociationCount.FastReconnectTypes.1."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnStateChange"
    },
    "path": "Device.WiFi.AccessPoint.4.AssociationCount.FastReconnectTypes.2."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnScan"
    },
    "path": "Device.WiFi.AccessPoint.4.AssociationCount.FastReconnectTypes.3."
  },
  {
    "parameters": {
      "Count": 2,
      "Type": "User"
    },
    "path": "Device.WiFi.AccessPoint.4.AssociationCount.FastReconnectTypes.4."
  },
  {
    "parameters": {
      "BssMaxIdlePeriod": -1
    },
    "path": "Device.WiFi.AccessPoint.4.DriverConfig."
  },
  {
    "parameters": {
      "AccessNetworkType": 2,
      "L2TrafficInspect": "",
      "Enable": 0,
      "DgafDisable": 0,
      "VenueGroup": 2,
      "Interworking": 1,
      "Internet": 0,
      "Additional": 0,
      "IcmpV4Echo": 1,
      "VenueName": "",
      "VenueType": 8,
      "WanMetrics": "",
      "DomainName": "",
      "Hs2Ie": 0,
      "RoamingConsortium": "",
      "OperatingClass": "",
      "HeSSID": "",
      "P2PEnable": 0,
      "GasDelay": 0,
      "Anqp3gpp_CellNet": ""
    },
    "path": "Device.WiFi.AccessPoint.4.HotSpot2."
  },
  {
    "parameters": {
      "Enabled": 0,
      "FTOverDSEnable": 0,
      "MobilityDomain": 0,
      "NASIdentifier": "0F3D597B0DC3CF44",
      "R0KHKey": "B31537FE016197A479FEC390F1438A57"
    },
    "path": "Device.WiFi.AccessPoint.4.IEEE80211r."
  },
  {
    "parameters": {
      "InterworkingEnable": 0,
      "QoSMapSet": ""
    },
    "path": "Device.WiFi.AccessPoint.4.IEEE80211u."
  },
  {
    "parameters": {
      "TempBlacklistEnable": 1,
      "Mode": "Off"
    },
    "path": "Device.WiFi.AccessPoint.4.MACFiltering."
  },
  {
    "parameters": {
      "ErrorsSent": 0,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "PacketsSent": 0,
      "EstServiceParametersVI": "",
      "UnicastBytesSent": 0,
      "BroadcastBytesReceived": 0,
      "EstServiceParametersVO": "",
      "LinkID": 0,
      "EstServiceParametersBE": "",
      "UnicastBytesReceived": 0,
      "MLORole": "",
      "PacketsReceived": 0,
      "EstServiceParametersBK": "",
      "MulticastBytesSent": 0
    },
    "path": "Device.WiFi.AccessPoint.4.MLOStats."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.AccessPoint.4.ProbeFiltering."
  },
  {
    "parameters": {
      "RssiInterval": 10,
      "HistoryEnable": 1,
      "HistoryIntervalCoeff": 1,
      "Enable": 0,
      "SendEventOnDisassoc": 1,
      "AveragingFactor": 500,
      "Interval": 1000,
      "HistoryLen": 10,
      "SendPeriodicEvent": 0,
      "SendEventOnAssoc": 1
    },
    "path": "Device.WiFi.AccessPoint.4.RssiEventing."
  },
  {
    "parameters": {
      "RadiusCalledStationId": "",
      "MFPConfig": "Disabled",
      "SAEPassphrase": "",
      "RadiusOwnIPAddress": "",
      "RadiusChargeableUserId": 0,
      "EncryptionMode": "Default",
      "RadiusNASIdentifier": "",
      "RekeyingInterval": 3600,
      "OWETransitionInterface": "",
      "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal",
      "ModeEnabled": "WPA2-WPA3-Personal",
      "RadiusServerPort": 1812,
      "RadiusSecret": "",
      "TransitionDisable": "",
      "KeyPassPhrase": "J5DDBFSGFYK1XUE4GIW5LCRLO4BD6V0G",
      "SHA256Enable": 0,
      "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
      "PreSharedKey": "",
      "RadiusServerIPAddr": "",
      "RadiusDefaultSessionTimeout": 0,
      "WEPKey": "123456789ABCD",
      "SPPAmsdu": -1
    },
    "path": "Device.WiFi.AccessPoint.4.Security."
  },
  {
    "parameters": {
      "Enable": 0
    },
    "path": "Device.WiFi.AccessPoint.4.VendorIEs."
  },
  {
    "parameters": {
      "RestartOnRequest": 0,
      "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay",
      "PairingInProgress": 0,
      "Status": "Ongoing",
      "CertModeEnable": 0,
      "SelfPIN": "85778474",
      "Enable": 1,
      "UUID": "4c4d5748-4e5b-f64b-fc5a-48454c4d5748",
      "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay",
      "RelayCredentialsEnable": 0,
      "Version": "2.0",
      "Configured": 1
    },
    "path": "Device.WiFi.AccessPoint.4.WPS."
  },
  {
    "parameters": {
      "MultiAPProfile": 0,
      "MBOAssocDisallowReason": "Off",
      "RadioReference": "WiFi.Radio.Wl1",
      "ActiveVideoAssociatedDeviceNumberOfEntries": 0,
      "WMMCapability": 0,
      "UAPSDEnable": 0,
      "BridgeInterface": "br-guest",
      "Index": 33,
      "MaxAssociatedDevices": 32,
      "IEEE80211kEnabled": 0,
      "DiscoveryMethodEnabled": "Default",
      "CpeOperationMode": "Router",
      "ActiveAssociatedDeviceNumberOfEntries": 0,
      "DefaultDeviceType": "Guest",
      "RetryLimit": 3,
      "MCEnable": 0,
      "MBOEnable": 0,
      "IsolationEnable": 1,
      "CustomAlias": "WiFi-2G-Guest",
      "AssociatedDeviceNumberOfEntries": 0,
      "SSIDReference": "Device.WiFi.SSID.5",
      "MACFilterAddressList": "",
      "Status": "Enabled",
      "Enable": 0,
      "APBridgeDisable": 0,
      "MACAddressControlEnabled": 0,
      "dbgAPFile": "",
      "ReferenceApRelay": "",
      "WMMEnable": 0,
      "WDSEnable": 0,
      "UAPSDCapability": 0,
      "MultiAPType": "",
      "MultiAPVlanId": 0,
      "ApRole": "Off",
      "SSIDAdvertisementEnabled": 1,
      "Alias": "wl1.2",
      "dbgAPEnable": 0
    },
    "path": "Device.WiFi.AccessPoint.5."
  },
  {
    "parameters": {
      "Fail": 0,
      "FastReconnects": 0,
      "ResetCounters": 0,
      "FailSecurity": 0,
      "Success": 0,
      "Disconnect": 0
    },
    "path": "Device.WiFi.AccessPoint.5.AssociationCount."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "Default"
    },
    "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.1."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnStateChange"
    },
    "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.2."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnScan"
    },
    "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.3."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "User"
    },
    "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.4."
  },
  {
    "parameters": {
      "BssMaxIdlePeriod": -1
    },
    "path": "Device.WiFi.AccessPoint.5.DriverConfig."
  },
  {
    "parameters": {
      "AccessNetworkType": 2,
      "L2TrafficInspect": "",
      "Enable": 0,
      "DgafDisable": 0,
      "VenueGroup": 2,
      "Interworking": 1,
      "Internet": 0,
      "Additional": 0,
      "IcmpV4Echo": 1,
      "VenueName": "",
      "VenueType": 8,
      "WanMetrics": "",
      "DomainName": "",
      "Hs2Ie": 0,
      "RoamingConsortium": "",
      "OperatingClass": "",
      "HeSSID": "",
      "P2PEnable": 0,
      "GasDelay": 0,
      "Anqp3gpp_CellNet": ""
    },
    "path": "Device.WiFi.AccessPoint.5.HotSpot2."
  },
  {
    "parameters": {
      "Enabled": 0,
      "FTOverDSEnable": 0,
      "MobilityDomain": 0,
      "NASIdentifier": "BFB4020186F8E4F5",
      "R0KHKey": "3A1290BEC7F97969817CE4227621591A"
    },
    "path": "Device.WiFi.AccessPoint.5.IEEE80211r."
  },
  {
    "parameters": {
      "InterworkingEnable": 0,
      "QoSMapSet": ""
    },
    "path": "Device.WiFi.AccessPoint.5.IEEE80211u."
  },
  {
    "parameters": {
      "TempBlacklistEnable": 1,
      "Mode": "Off"
    },
    "path": "Device.WiFi.AccessPoint.5.MACFiltering."
  },
  {
    "parameters": {
      "ErrorsSent": 0,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "PacketsSent": 0,
      "EstServiceParametersVI": "",
      "UnicastBytesSent": 0,
      "BroadcastBytesReceived": 0,
      "EstServiceParametersVO": "",
      "LinkID": 0,
      "EstServiceParametersBE": "",
      "UnicastBytesReceived": 0,
      "MLORole": "",
      "PacketsReceived": 0,
      "EstServiceParametersBK": "",
      "MulticastBytesSent": 0
    },
    "path": "Device.WiFi.AccessPoint.5.MLOStats."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.AccessPoint.5.ProbeFiltering."
  },
  {
    "parameters": {
      "RssiInterval": 10,
      "HistoryEnable": 1,
      "HistoryIntervalCoeff": 1,
      "Enable": 0,
      "SendEventOnDisassoc": 1,
      "AveragingFactor": 500,
      "Interval": 1000,
      "HistoryLen": 10,
      "SendPeriodicEvent": 0,
      "SendEventOnAssoc": 1
    },
    "path": "Device.WiFi.AccessPoint.5.RssiEventing."
  },
  {
    "parameters": {
      "RadiusCalledStationId": "",
      "MFPConfig": "Disabled",
      "SAEPassphrase": "",
      "RadiusOwnIPAddress": "",
      "RadiusChargeableUserId": 0,
      "EncryptionMode": "Default",
      "RadiusNASIdentifier": "",
      "RekeyingInterval": 3600,
      "OWETransitionInterface": "",
      "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal",
      "ModeEnabled": "WPA2-WPA3-Personal",
      "RadiusServerPort": 1812,
      "RadiusSecret": "",
      "TransitionDisable": "",
      "KeyPassPhrase": "passwordGuest",
      "SHA256Enable": 0,
      "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
      "PreSharedKey": "",
      "RadiusServerIPAddr": "",
      "RadiusDefaultSessionTimeout": 0,
      "WEPKey": "123456789ABCD",
      "SPPAmsdu": -1
    },
    "path": "Device.WiFi.AccessPoint.5.Security."
  },
  {
    "parameters": {
      "Enable": 0
    },
    "path": "Device.WiFi.AccessPoint.5.VendorIEs."
  },
  {
    "parameters": {
      "RestartOnRequest": 0,
      "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay",
      "PairingInProgress": 0,
      "Status": "Disabled",
      "CertModeEnable": 0,
      "SelfPIN": "85778474",
      "Enable": 0,
      "UUID": "4c4d5748-4e5b-f64b-fc5a-48454c4d5748",
      "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay",
      "RelayCredentialsEnable": 0,
      "Version": "2.0",
      "Configured": 1
    },
    "path": "Device.WiFi.AccessPoint.5.WPS."
  },
  {
    "parameters": {
      "MultiAPProfile": 0,
      "MBOAssocDisallowReason": "Off",
      "RadioReference": "WiFi.Radio.Wl0",
      "ActiveVideoAssociatedDeviceNumberOfEntries": 0,
      "WMMCapability": 0,
      "UAPSDEnable": 0,
      "BridgeInterface": "br-guest",
      "Index": 34,
      "MaxAssociatedDevices": 32,
      "IEEE80211kEnabled": 0,
      "DiscoveryMethodEnabled": "Default",
      "CpeOperationMode": "Router",
      "ActiveAssociatedDeviceNumberOfEntries": 0,
      "DefaultDeviceType": "Guest",
      "RetryLimit": 3,
      "MCEnable": 0,
      "MBOEnable": 0,
      "IsolationEnable": 1,
      "CustomAlias": "WiFi-5G-Guest",
      "AssociatedDeviceNumberOfEntries": 0,
      "SSIDReference": "Device.WiFi.SSID.6",
      "MACFilterAddressList": "",
      "Status": "Enabled",
      "Enable": 0,
      "APBridgeDisable": 0,
      "MACAddressControlEnabled": 0,
      "dbgAPFile": "",
      "ReferenceApRelay": "",
      "WMMEnable": 0,
      "WDSEnable": 0,
      "UAPSDCapability": 0,
      "MultiAPType": "",
      "MultiAPVlanId": 0,
      "ApRole": "Off",
      "SSIDAdvertisementEnabled": 1,
      "Alias": "wl0.2",
      "dbgAPEnable": 0
    },
    "path": "Device.WiFi.AccessPoint.6."
  },
  {
    "parameters": {
      "Fail": 0,
      "FastReconnects": 0,
      "ResetCounters": 0,
      "FailSecurity": 0,
      "Success": 0,
      "Disconnect": 0
    },
    "path": "Device.WiFi.AccessPoint.6.AssociationCount."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "Default"
    },
    "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.1."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnStateChange"
    },
    "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.2."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "OnScan"
    },
    "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.3."
  },
  {
    "parameters": {
      "Count": 0,
      "Type": "User"
    },
    "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.4."
  },
  {
    "parameters": {
      "BssMaxIdlePeriod": -1
    },
    "path": "Device.WiFi.AccessPoint.6.DriverConfig."
  },
  {
    "parameters": {
      "AccessNetworkType": 2,
      "L2TrafficInspect": "",
      "Enable": 0,
      "DgafDisable": 0,
      "VenueGroup": 2,
      "Interworking": 1,
      "Internet": 0,
      "Additional": 0,
      "IcmpV4Echo": 1,
      "VenueName": "",
      "VenueType": 8,
      "WanMetrics": "",
      "DomainName": "",
      "Hs2Ie": 0,
      "RoamingConsortium": "",
      "OperatingClass": "",
      "HeSSID": "",
      "P2PEnable": 0,
      "GasDelay": 0,
      "Anqp3gpp_CellNet": ""
    },
    "path": "Device.WiFi.AccessPoint.6.HotSpot2."
  },
  {
    "parameters": {
      "Enabled": 0,
      "FTOverDSEnable": 0,
      "MobilityDomain": 0,
      "NASIdentifier": "5BAB2E6A97CD86AB",
      "R0KHKey": "89C9329959AE075675D03042F0AA67A5"
    },
    "path": "Device.WiFi.AccessPoint.6.IEEE80211r."
  },
  {
    "parameters": {
      "InterworkingEnable": 0,
      "QoSMapSet": ""
    },
    "path": "Device.WiFi.AccessPoint.6.IEEE80211u."
  },
  {
    "parameters": {
      "TempBlacklistEnable": 1,
      "Mode": "Off"
    },
    "path": "Device.WiFi.AccessPoint.6.MACFiltering."
  },
  {
    "parameters": {
      "ErrorsSent": 0,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "PacketsSent": 0,
      "EstServiceParametersVI": "",
      "UnicastBytesSent": 0,
      "BroadcastBytesReceived": 0,
      "EstServiceParametersVO": "",
      "LinkID": 0,
      "EstServiceParametersBE": "",
      "UnicastBytesReceived": 0,
      "MLORole": "",
      "PacketsReceived": 0,
      "EstServiceParametersBK": "",
      "MulticastBytesSent": 0
    },
    "path": "Device.WiFi.AccessPoint.6.MLOStats."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.AccessPoint.6.ProbeFiltering."
  },
  {
    "parameters": {
      "RssiInterval": 10,
      "HistoryEnable": 1,
      "HistoryIntervalCoeff": 1,
      "Enable": 0,
      "SendEventOnDisassoc": 1,
      "AveragingFactor": 500,
      "Interval": 1000,
      "HistoryLen": 10,
      "SendPeriodicEvent": 0,
      "SendEventOnAssoc": 1
    },
    "path": "Device.WiFi.AccessPoint.6.RssiEventing."
  },
  {
    "parameters": {
      "RadiusCalledStationId": "",
      "MFPConfig": "Disabled",
      "SAEPassphrase": "",
      "RadiusOwnIPAddress": "",
      "RadiusChargeableUserId": 0,
      "EncryptionMode": "Default",
      "RadiusNASIdentifier": "",
      "RekeyingInterval": 3600,
      "OWETransitionInterface": "",
      "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal",
      "ModeEnabled": "WPA2-WPA3-Personal",
      "RadiusServerPort": 1812,
      "RadiusSecret": "",
      "TransitionDisable": "",
      "KeyPassPhrase": "passwordGuest",
      "SHA256Enable": 0,
      "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
      "PreSharedKey": "",
      "RadiusServerIPAddr": "",
      "RadiusDefaultSessionTimeout": 0,
      "WEPKey": "123456789ABCD",
      "SPPAmsdu": -1
    },
    "path": "Device.WiFi.AccessPoint.6.Security."
  },
  {
    "parameters": {
      "Enable": 0
    },
    "path": "Device.WiFi.AccessPoint.6.VendorIEs."
  },
  {
    "parameters": {
      "RestartOnRequest": 0,
      "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay",
      "PairingInProgress": 0,
      "Status": "Disabled",
      "CertModeEnable": 0,
      "SelfPIN": "85778474",
      "Enable": 0,
      "UUID": "4c4d5748-4e5b-f64b-fc5a-48454c4d5748",
      "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay",
      "RelayCredentialsEnable": 0,
      "Version": "2.0",
      "Configured": 1
    },
    "path": "Device.WiFi.AccessPoint.6.WPS."
  },
  {
    "parameters": {
      "Enable": 1,
      "DelayTime": 1000,
      "BootDelayTime": 4000
    },
    "path": "Device.WiFi.AutoCommitMgr."
  },
  {
    "parameters": {
      "SteerEventNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements."
  },
  {
    "parameters": {
      "AssociationEventDataNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.AssociationEvent."
  },
  {
    "parameters": {
      "LoadBalancingTaskEnabled": 0,
      "LinkMetricsRequestInterval": 0,
      "BackhaulOptimizationEnabled": 0,
      "SteeringDisassociationTimer": 0,
      "DaisyChainingDisabled": 0,
      "DFSReentry": 0,
      "ChannelSelectionTaskEnabled": 0,
      "BandSteeringEnabled": 0,
      "SteeringCurrentBonus": 0,
      "OptimalPathPreferSignalStrength": 0,
      "ClientRoamingEnabled": 0,
      "HealthCheckTaskEnabled": 0,
      "DynamicChannelSelectionTaskEnabled": 0,
      "StatisticsPollingTaskEnabled": 0,
      "StatisticsPollingRateSec": 1,
      "Client_11kRoaming": 1
    },
    "path": "Device.WiFi.DataElements.Configuration."
  },
  {
    "parameters": {
      "SPRuleOutput": 0,
      "DSCPMap": ""
    },
    "path": "Device.WiFi.DataElements.Configuration.QoS."
  },
  {
    "parameters": {
      "DisassociationEventDataNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.DisassociationEvent."
  },
  {
    "parameters": {
      "FailedConnectionEventDataNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.FailedConnectionEvent."
  },
  {
    "parameters": {
      "ID": "78:B3:9F:16:7E:36",
      "ControllerID": "78:B3:9F:16:7E:36",
      "DeviceNumberOfEntries": 2,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "AccessPointNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network."
  },
  {
    "parameters": {
      "MultiAPProfile": 4,
      "APMLDNumberOfEntries": 2,
      "MaxReportingRate": 30,
      "SPRuleNumberOfEntries": 0,
      "CollectionInterval": 60000,
      "DSCPMap": "",
      "RadioNumberOfEntries": 2,
      "MaxPrioritizationRules": 1,
      "SoftwareVersion": "",
      "ManufacturerModel": "FG4278Bv3",
      "ExecutionEnv": "",
      "ReportUnsuccessfulAssociations": 0,
      "MaxVIDs": 32,
      "CountryCode": "DE",
      "InterfaceNumberOfEntries": 5,
      "SerialNumber": "SN0123456789AB",
      "ID": "78:B3:9F:16:7E:36",
      "BTMSteeringDisallowedSTAListNumberOfEntries": 0,
      "PrioritizationSupport": 1,
      "Manufacturer": "Sercomm",
      "LocalSteeringDisallowedSTANumberOfEntries": 0,
      "X_SC_Hostname": "FG4278Bv3",
      "X_SC_IPV4Address": "192.168.1.1",
      "SupportsVBSS": 1,
      "APMetricsReportingInterval": 60
    },
    "path": "Device.WiFi.DataElements.Network.Device.1."
  },
  {
    "parameters": {
      "STAMLDNumberOfEntries": 0,
      "MLDMACAddress": "78:B3:9F:16:7E:36"
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.APMLD.1."
  },
  {
    "parameters": {
      "STAMLDNumberOfEntries": 1,
      "MLDMACAddress": "7A:B3:9F:16:7F:37"
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.APMLD.2."
  },
  {
    "parameters": {
      "IsbSTA": 1,
      "IPv4Address": "192.168.1.10",
      "MLDMACAddress": "78:B3:9F:38:5C:65",
      "Hostname": "RP762B_0006",
      "AffiliatedSTANumberOfEntries": 2
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.APMLD.2.STAMLD.3."
  },
  {
    "parameters": {
      "MACAddress": "78:B3:9F:38:5C:65"
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.APMLD.2.STAMLD.3.AffiliatedSTA.1."
  },
  {
    "parameters": {
      "MACAddress": "78:B3:9F:38:5C:61"
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.APMLD.2.STAMLD.3.AffiliatedSTA.2."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 0,
      "MediaType": "IEEE_802_3U_FAST_ETHERNET",
      "Name": "78:B3:9F:16:7E:30",
      "Status": "Up",
      "MACAddress": "78:B3:9F:16:7E:30"
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.1."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.1.Stats."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 0,
      "MediaType": "UNKNOWN_MEDIA",
      "Name": "78:B3:9F:16:7E:36",
      "Status": "Up",
      "MACAddress": "78:B3:9F:16:7E:36"
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.2."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.2.Stats."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 1,
      "MediaType": "UNKNOWN_MEDIA",
      "Name": "7A:B3:9F:16:7F:37",
      "Status": "Up",
      "MACAddress": "7A:B3:9F:16:7F:37"
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.3."
  },
  {
    "parameters": {
      "ID": "7A:B3:9F:38:5C:61",
      "IsIEEE1905": 1
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.3.Neighbor.3."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.3.Stats."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 0,
      "MediaType": "UNKNOWN_MEDIA",
      "Name": "78:B3:9F:16:7E:35",
      "Status": "Up",
      "MACAddress": "78:B3:9F:16:7E:35"
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.4."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.4.Stats."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 0,
      "MediaType": "UNKNOWN_MEDIA",
      "Name": "7A:B3:9F:16:80:36",
      "Status": "Up",
      "MACAddress": "7A:B3:9F:16:80:36"
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.5."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Interface.5.Stats."
  },
  {
    "parameters": {
      "AgentInitiatedRCPIBasedSteering": 0,
      "UnassociatedSTALinkMetricsCurrentlyOn": 0,
      "UnassociatedSTALinkMetricsCurrentlyOff": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.MultiAPCapabilities."
  },
  {
    "parameters": {
      "ManufacturerOUI": "",
      "LastContactTime": "2020-08-31T11:22:39Z",
      "AssocIEEE1905DeviceRef": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.MultiAPDevice."
  },
  {
    "parameters": {
      "BackhaulDeviceID": "",
      "X_SC_Speedtest": 0,
      "LinkType": "None",
      "BackhaulMACAddress": "",
      "MACAddress": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.MultiAPDevice.Backhaul."
  },
  {
    "parameters": {
      "TrafficSeparationCombinedBackhaul": 0,
      "TrafficSeparationCombinedFronthaul": 0,
      "Noise": 0,
      "BSSNumberOfEntries": 2,
      "ChannelUtilizationReportingThreshold": 0,
      "APMetricsWiFi6": 0,
      "UnassociatedSTANumberOfEntries": 0,
      "SteeringPolicy": 0,
      "ScanResultNumberOfEntries": 0,
      "AssociatedSTATrafficStatsInclusionPolicy": 0,
      "ReceiveSelf": 0,
      "Enabled": 0,
      "ReceiveOther": 0,
      "ChipsetVendor": "",
      "RCPISteeringThreshold": 0,
      "STAReportingRCPIThreshold": 0,
      "ID": "78:B3:9F:16:7E:35",
      "ChannelUtilizationThreshold": 0,
      "STAReportingRCPIHysteresisMarginOverride": 0,
      "CurrentOperatingClassesNumberOfEntries": 1,
      "AssociatedSTALinkMetricsInclusionPolicy": 0,
      "Transmit": 0,
      "Utilization": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1."
  },
  {
    "parameters": {
      "BackhaulUse": 0,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "UnicastBytesSent": 0,
      "EstServiceParametersVI": 0,
      "BroadcastBytesReceived": 0,
      "STANumberOfEntries": 0,
      "EstServiceParametersVO": 0,
      "Enabled": 0,
      "FronthaulUse": 1,
      "SSID": "0",
      "EstServiceParametersBE": 0,
      "BSSID": "78:B3:9F:16:7E:35",
      "UnicastBytesReceived": 0,
      "LastChange": 0,
      "EstServiceParametersBK": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "MulticastBytesSent": 0,
      "ByteCounterUnits": 0,
      "IsVBSS": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.BSS.1."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BTMQueryResponses": 0,
      "BlacklistAttempts": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.BSS.1.MultiAPSteering."
  },
  {
    "parameters": {
      "BackhaulUse": 1,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "UnicastBytesSent": 0,
      "EstServiceParametersVI": 0,
      "BroadcastBytesReceived": 0,
      "STANumberOfEntries": 1,
      "EstServiceParametersVO": 0,
      "Enabled": 0,
      "FronthaulUse": 0,
      "SSID": "0",
      "EstServiceParametersBE": 0,
      "BSSID": "7A:B3:9F:16:80:36",
      "UnicastBytesReceived": 0,
      "LastChange": 0,
      "EstServiceParametersBK": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "MulticastBytesSent": 0,
      "ByteCounterUnits": 0,
      "IsVBSS": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.BSS.2."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BTMQueryResponses": 0,
      "BlacklistAttempts": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.BSS.2.MultiAPSteering."
  },
  {
    "parameters": {
      "TIDQueueSizesNumberOfEntries": 0,
      "UtilizationTransmit": 0,
      "ErrorsSent": 0,
      "MeasurementReportNumberOfEntries": 0,
      "UtilizationReceive": 0,
      "PacketsSent": 0,
      "BytesSent": 0,
      "BytesReceived": 0,
      "X_SC_LinkQuality": "Warning",
      "MACAddress": "78:B3:9F:38:5C:61",
      "LastConnectTime": 0,
      "ErrorsReceived": 0,
      "EstMACDataRateUplink": 0,
      "ClientCapabilities": "",
      "IPV6Address": "0",
      "Hostname": "RP762B_0006",
      "LastDataDownlinkRate": 325,
      "LastDataUplinkRate": 0,
      "PacketsReceived": 0,
      "SignalStrength": 74,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "EstMACDataRateDownlink": 0,
      "IPV4Address": "192.168.1.10",
      "RetransCount": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.BSS.2.STA.2."
  },
  {
    "parameters": {
      "Noise": 0,
      "AssociationTime": "2020-08-31T11:22:39Z",
      "SteeringHistoryNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.BSS.2.STA.2.MultiAPSTA."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BlacklistFailures": 0,
      "BlacklistSuccesses": 0,
      "BlacklistAttempts": 0,
      "NoCandidateAPFailures": 0,
      "LastSteerTime": 0,
      "BTMQueryResponses": 0,
      "BTMSuccesses": 0,
      "BTMFailures": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.BSS.2.STA.2.MultiAPSTA.SteeringSummaryStats."
  },
  {
    "parameters": {
      "MACAddress": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.BackhaulSta."
  },
  {
    "parameters": {
      "CACMethodNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.CACCapability."
  },
  {
    "parameters": {
      "OperatingClass": 0,
      "Status": 255,
      "Channel": 0,
      "PairsNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.CACCompletion."
  },
  {
    "parameters": {
      "AKMFrontHaulNumberOfEntries": 0,
      "AKMBackhaulNumberOfEntries": 0,
      "OperatingClassesNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.Capabilities."
  },
  {
    "parameters": {
      "ApplyVBSSIDRestrictions": 0,
      "ApplyVBSSIDFixedBitsRestrictions": 0,
      "MaxVBSS": 0,
      "ApplyVBSSIDMatchMaskRestrictions": 0,
      "VBSSIDFixedBitsMask": "",
      "VBSSIDFixedBitsValue": "",
      "VBSSsSubtract": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.Capabilities.VBSSCapabilities."
  },
  {
    "parameters": {
      "TxPower": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "Channel": 1,
      "Class": 10
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.CurrentOperatingClasses.1."
  },
  {
    "parameters": {
      "OnBootOnly": 0,
      "OpClassChannelsNumberOfEntries": 0,
      "Impact": 0,
      "MinimumInterval": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.ScanCapability."
  },
  {
    "parameters": {
      "SRGOBSSPDMaxOffset": 0,
      "HESIGASpatialReuseValue15Allowed": 0,
      "PSRDisallowed": 0,
      "SRGInformationValid": 0,
      "NonSRGOffsetValid": 0,
      "PartialBSSColor": 0,
      "SRGBSSColorBitmap": "",
      "BSSColor": 0,
      "SRGPartialBSSIDBitmap": "",
      "NonSRGOBSSPDMaxOffset": 0,
      "SRGOBSSPDMinOffset": 0,
      "NeighborBSSColorInUseBitmap": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.1.SpatialReuse."
  },
  {
    "parameters": {
      "TrafficSeparationCombinedBackhaul": 0,
      "TrafficSeparationCombinedFronthaul": 0,
      "Noise": 0,
      "BSSNumberOfEntries": 2,
      "ChannelUtilizationReportingThreshold": 0,
      "APMetricsWiFi6": 0,
      "UnassociatedSTANumberOfEntries": 0,
      "SteeringPolicy": 0,
      "ScanResultNumberOfEntries": 0,
      "AssociatedSTATrafficStatsInclusionPolicy": 0,
      "ReceiveSelf": 0,
      "Enabled": 0,
      "ReceiveOther": 0,
      "ChipsetVendor": "",
      "RCPISteeringThreshold": 0,
      "STAReportingRCPIThreshold": 0,
      "ID": "78:B3:9F:16:7E:36",
      "ChannelUtilizationThreshold": 0,
      "STAReportingRCPIHysteresisMarginOverride": 0,
      "CurrentOperatingClassesNumberOfEntries": 1,
      "AssociatedSTALinkMetricsInclusionPolicy": 0,
      "Transmit": 0,
      "Utilization": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2."
  },
  {
    "parameters": {
      "BackhaulUse": 0,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "UnicastBytesSent": 0,
      "EstServiceParametersVI": 0,
      "BroadcastBytesReceived": 0,
      "STANumberOfEntries": 0,
      "EstServiceParametersVO": 0,
      "Enabled": 0,
      "FronthaulUse": 1,
      "SSID": "0",
      "EstServiceParametersBE": 0,
      "BSSID": "78:B3:9F:16:7E:36",
      "UnicastBytesReceived": 0,
      "LastChange": 0,
      "EstServiceParametersBK": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "MulticastBytesSent": 0,
      "ByteCounterUnits": 0,
      "IsVBSS": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.BSS.1."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BTMQueryResponses": 0,
      "BlacklistAttempts": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.BSS.1.MultiAPSteering."
  },
  {
    "parameters": {
      "BackhaulUse": 1,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "UnicastBytesSent": 0,
      "EstServiceParametersVI": 0,
      "BroadcastBytesReceived": 0,
      "STANumberOfEntries": 1,
      "EstServiceParametersVO": 0,
      "Enabled": 0,
      "FronthaulUse": 0,
      "SSID": "0",
      "EstServiceParametersBE": 0,
      "BSSID": "7A:B3:9F:16:7F:37",
      "UnicastBytesReceived": 0,
      "LastChange": 0,
      "EstServiceParametersBK": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "MulticastBytesSent": 0,
      "ByteCounterUnits": 0,
      "IsVBSS": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.BSS.2."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BTMQueryResponses": 0,
      "BlacklistAttempts": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.BSS.2.MultiAPSteering."
  },
  {
    "parameters": {
      "TIDQueueSizesNumberOfEntries": 0,
      "UtilizationTransmit": 0,
      "ErrorsSent": 3,
      "MeasurementReportNumberOfEntries": 0,
      "UtilizationReceive": 0,
      "PacketsSent": 6138,
      "BytesSent": 0,
      "BytesReceived": 0,
      "X_SC_LinkQuality": "Good",
      "MACAddress": "78:B3:9F:38:5C:65",
      "LastConnectTime": 0,
      "ErrorsReceived": 0,
      "EstMACDataRateUplink": 0,
      "ClientCapabilities": "",
      "IPV6Address": "0",
      "Hostname": "RP762B_0006",
      "LastDataDownlinkRate": 3062,
      "LastDataUplinkRate": 3891,
      "PacketsReceived": 5589,
      "SignalStrength": 126,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "EstMACDataRateDownlink": 0,
      "IPV4Address": "192.168.1.10",
      "RetransCount": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.BSS.2.STA.4."
  },
  {
    "parameters": {
      "Noise": 0,
      "AssociationTime": "2020-08-31T11:22:39Z",
      "SteeringHistoryNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.BSS.2.STA.4.MultiAPSTA."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BlacklistFailures": 0,
      "BlacklistSuccesses": 0,
      "BlacklistAttempts": 0,
      "NoCandidateAPFailures": 0,
      "LastSteerTime": 0,
      "BTMQueryResponses": 0,
      "BTMSuccesses": 0,
      "BTMFailures": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.BSS.2.STA.4.MultiAPSTA.SteeringSummaryStats."
  },
  {
    "parameters": {
      "MACAddress": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.BackhaulSta."
  },
  {
    "parameters": {
      "CACMethodNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.CACCapability."
  },
  {
    "parameters": {
      "OperatingClass": 0,
      "Status": 255,
      "Channel": 0,
      "PairsNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.CACCompletion."
  },
  {
    "parameters": {
      "AKMFrontHaulNumberOfEntries": 0,
      "AKMBackhaulNumberOfEntries": 0,
      "OperatingClassesNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.Capabilities."
  },
  {
    "parameters": {
      "ApplyVBSSIDRestrictions": 0,
      "ApplyVBSSIDFixedBitsRestrictions": 0,
      "MaxVBSS": 0,
      "ApplyVBSSIDMatchMaskRestrictions": 0,
      "VBSSIDFixedBitsMask": "",
      "VBSSIDFixedBitsValue": "",
      "VBSSsSubtract": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.Capabilities.VBSSCapabilities."
  },
  {
    "parameters": {
      "TxPower": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "Channel": 161,
      "Class": 120
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.CurrentOperatingClasses.1."
  },
  {
    "parameters": {
      "OnBootOnly": 0,
      "OpClassChannelsNumberOfEntries": 0,
      "Impact": 0,
      "MinimumInterval": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.ScanCapability."
  },
  {
    "parameters": {
      "SRGOBSSPDMaxOffset": 0,
      "HESIGASpatialReuseValue15Allowed": 0,
      "PSRDisallowed": 0,
      "SRGInformationValid": 0,
      "NonSRGOffsetValid": 0,
      "PartialBSSColor": 0,
      "SRGBSSColorBitmap": "",
      "BSSColor": 0,
      "SRGPartialBSSIDBitmap": "",
      "NonSRGOBSSPDMaxOffset": 0,
      "SRGOBSSPDMinOffset": 0,
      "NeighborBSSColorInUseBitmap": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.Radio.2.SpatialReuse."
  },
  {
    "parameters": {
      "SSID": "",
      "VID": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.1.SSIDtoVIDMapping."
  },
  {
    "parameters": {
      "MultiAPProfile": 4,
      "APMLDNumberOfEntries": 2,
      "MaxReportingRate": 30,
      "SPRuleNumberOfEntries": 0,
      "CollectionInterval": 60000,
      "DSCPMap": "",
      "RadioNumberOfEntries": 2,
      "MaxPrioritizationRules": 1,
      "SoftwareVersion": "",
      "ManufacturerModel": "RP762B",
      "ExecutionEnv": "",
      "ReportUnsuccessfulAssociations": 0,
      "MaxVIDs": 32,
      "CountryCode": "DE",
      "InterfaceNumberOfEntries": 7,
      "SerialNumber": "SEEL251900006",
      "ID": "7A:B3:9F:38:5C:61",
      "BTMSteeringDisallowedSTAListNumberOfEntries": 0,
      "PrioritizationSupport": 1,
      "Manufacturer": "SERCOMM",
      "LocalSteeringDisallowedSTANumberOfEntries": 0,
      "X_SC_Hostname": "RP762B_0006",
      "X_SC_IPV4Address": "192.168.1.10",
      "SupportsVBSS": 1,
      "APMetricsReportingInterval": 60
    },
    "path": "Device.WiFi.DataElements.Network.Device.2."
  },
  {
    "parameters": {
      "STAMLDNumberOfEntries": 0,
      "MLDMACAddress": "78:B3:9F:38:5C:67"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.APMLD.1."
  },
  {
    "parameters": {
      "STAMLDNumberOfEntries": 1,
      "MLDMACAddress": "78:B3:9F:38:5C:66"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.APMLD.2."
  },
  {
    "parameters": {
      "IsbSTA": 0,
      "IPv4Address": "192.168.1.12",
      "MLDMACAddress": "DA:67:B6:35:2D:82",
      "Hostname": "iPhone",
      "AffiliatedSTANumberOfEntries": 2
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.APMLD.2.STAMLD.1."
  },
  {
    "parameters": {
      "MACAddress": "2E:2A:9B:8F:2B:F6"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.APMLD.2.STAMLD.1.AffiliatedSTA.1."
  },
  {
    "parameters": {
      "MACAddress": "6A:E6:B2:B8:0D:EC"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.APMLD.2.STAMLD.1.AffiliatedSTA.2."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 2,
      "MediaType": "UNKNOWN_MEDIA",
      "Name": "78:B3:9F:38:5C:65",
      "Status": "Up",
      "MACAddress": "78:B3:9F:38:5C:65"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.1."
  },
  {
    "parameters": {
      "ID": "78:B3:9F:16:7E:36",
      "IsIEEE1905": 1
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.1.Neighbor.2."
  },
  {
    "parameters": {
      "ID": "78:B3:9F:16:7E:30",
      "IsIEEE1905": 1
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.1.Neighbor.3."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.1.Stats."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 0,
      "MediaType": "IEEE_802_3AB_GIGABIT_ETHERNET",
      "Name": "78:B3:9F:38:5C:60",
      "Status": "Up",
      "MACAddress": "78:B3:9F:38:5C:60"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.2."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.2.Stats."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 0,
      "MediaType": "UNKNOWN_MEDIA",
      "Name": "78:B3:9F:38:5C:63",
      "Status": "Up",
      "MACAddress": "78:B3:9F:38:5C:63"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.3."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.3.Stats."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 0,
      "MediaType": "UNKNOWN_MEDIA",
      "Name": "78:B3:9F:38:5C:62",
      "Status": "Up",
      "MACAddress": "78:B3:9F:38:5C:62"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.4."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.4.Stats."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 0,
      "MediaType": "UNKNOWN_MEDIA",
      "Name": "78:B3:9F:38:5C:67",
      "Status": "Up",
      "MACAddress": "78:B3:9F:38:5C:67"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.5."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.5.Stats."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 0,
      "MediaType": "UNKNOWN_MEDIA",
      "Name": "78:B3:9F:38:5C:66",
      "Status": "Up",
      "MACAddress": "78:B3:9F:38:5C:66"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.6."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.6.Stats."
  },
  {
    "parameters": {
      "NeighborNumberOfEntries": 0,
      "MediaType": "IEEE_802_3AB_GIGABIT_ETHERNET",
      "Name": "96:E9:69:1C:64:2E",
      "Status": "Up",
      "MACAddress": "96:E9:69:1C:64:2E"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.7."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "PacketsReceived": 0,
      "MulticastPacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "BroadcastPacketsReceived": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Interface.7.Stats."
  },
  {
    "parameters": {
      "AgentInitiatedRCPIBasedSteering": 0,
      "UnassociatedSTALinkMetricsCurrentlyOn": 0,
      "UnassociatedSTALinkMetricsCurrentlyOff": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.MultiAPCapabilities."
  },
  {
    "parameters": {
      "ManufacturerOUI": "",
      "LastContactTime": "2020-08-31T11:22:39Z",
      "AssocIEEE1905DeviceRef": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.MultiAPDevice."
  },
  {
    "parameters": {
      "BackhaulDeviceID": "78:B3:9F:16:7E:36",
      "X_SC_Speedtest": 0,
      "LinkType": "Wi-Fi",
      "BackhaulMACAddress": "7A:B3:9F:16:80:36",
      "MACAddress": "78:B3:9F:38:5C:61"
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.MultiAPDevice.Backhaul."
  },
  {
    "parameters": {
      "TrafficSeparationCombinedBackhaul": 0,
      "TrafficSeparationCombinedFronthaul": 0,
      "Noise": 0,
      "BSSNumberOfEntries": 2,
      "ChannelUtilizationReportingThreshold": 0,
      "APMetricsWiFi6": 0,
      "UnassociatedSTANumberOfEntries": 0,
      "SteeringPolicy": 0,
      "ScanResultNumberOfEntries": 0,
      "AssociatedSTATrafficStatsInclusionPolicy": 0,
      "ReceiveSelf": 0,
      "Enabled": 0,
      "ReceiveOther": 0,
      "ChipsetVendor": "",
      "RCPISteeringThreshold": 0,
      "STAReportingRCPIThreshold": 0,
      "ID": "78:B3:9F:38:5C:65",
      "ChannelUtilizationThreshold": 0,
      "STAReportingRCPIHysteresisMarginOverride": 0,
      "CurrentOperatingClassesNumberOfEntries": 1,
      "AssociatedSTALinkMetricsInclusionPolicy": 0,
      "Transmit": 0,
      "Utilization": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1."
  },
  {
    "parameters": {
      "BackhaulUse": 1,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "UnicastBytesSent": 0,
      "EstServiceParametersVI": 0,
      "BroadcastBytesReceived": 0,
      "STANumberOfEntries": 0,
      "EstServiceParametersVO": 0,
      "Enabled": 0,
      "FronthaulUse": 0,
      "SSID": "0",
      "EstServiceParametersBE": 0,
      "BSSID": "78:B3:9F:38:5C:67",
      "UnicastBytesReceived": 0,
      "LastChange": 0,
      "EstServiceParametersBK": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "MulticastBytesSent": 0,
      "ByteCounterUnits": 0,
      "IsVBSS": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.BSS.1."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BTMQueryResponses": 0,
      "BlacklistAttempts": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.BSS.1.MultiAPSteering."
  },
  {
    "parameters": {
      "BackhaulUse": 0,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "UnicastBytesSent": 0,
      "EstServiceParametersVI": 0,
      "BroadcastBytesReceived": 0,
      "STANumberOfEntries": 1,
      "EstServiceParametersVO": 0,
      "Enabled": 0,
      "FronthaulUse": 1,
      "SSID": "0",
      "EstServiceParametersBE": 0,
      "BSSID": "78:B3:9F:38:5C:66",
      "UnicastBytesReceived": 0,
      "LastChange": 0,
      "EstServiceParametersBK": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "MulticastBytesSent": 0,
      "ByteCounterUnits": 0,
      "IsVBSS": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.BSS.2."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BTMQueryResponses": 0,
      "BlacklistAttempts": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.BSS.2.MultiAPSteering."
  },
  {
    "parameters": {
      "TIDQueueSizesNumberOfEntries": 0,
      "UtilizationTransmit": 0,
      "ErrorsSent": 1,
      "MeasurementReportNumberOfEntries": 0,
      "UtilizationReceive": 0,
      "PacketsSent": 124,
      "BytesSent": 0,
      "BytesReceived": 0,
      "X_SC_LinkQuality": "Good",
      "MACAddress": "6A:E6:B2:B8:0D:EC",
      "LastConnectTime": 0,
      "ErrorsReceived": 0,
      "EstMACDataRateUplink": 0,
      "ClientCapabilities": "",
      "IPV6Address": "0",
      "Hostname": "iPhone",
      "LastDataDownlinkRate": 1134,
      "LastDataUplinkRate": 24,
      "PacketsReceived": 715,
      "SignalStrength": 164,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "EstMACDataRateDownlink": 0,
      "IPV4Address": "192.168.1.12",
      "RetransCount": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.BSS.2.STA.8."
  },
  {
    "parameters": {
      "Noise": 0,
      "AssociationTime": "2020-08-31T11:22:39Z",
      "SteeringHistoryNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.BSS.2.STA.8.MultiAPSTA."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BlacklistFailures": 0,
      "BlacklistSuccesses": 0,
      "BlacklistAttempts": 0,
      "NoCandidateAPFailures": 0,
      "LastSteerTime": 0,
      "BTMQueryResponses": 0,
      "BTMSuccesses": 0,
      "BTMFailures": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.BSS.2.STA.8.MultiAPSTA.SteeringSummaryStats."
  },
  {
    "parameters": {
      "MACAddress": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.BackhaulSta."
  },
  {
    "parameters": {
      "CACMethodNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.CACCapability."
  },
  {
    "parameters": {
      "OperatingClass": 0,
      "Status": 255,
      "Channel": 0,
      "PairsNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.CACCompletion."
  },
  {
    "parameters": {
      "AKMFrontHaulNumberOfEntries": 0,
      "AKMBackhaulNumberOfEntries": 0,
      "OperatingClassesNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.Capabilities."
  },
  {
    "parameters": {
      "ApplyVBSSIDRestrictions": 0,
      "ApplyVBSSIDFixedBitsRestrictions": 0,
      "MaxVBSS": 0,
      "ApplyVBSSIDMatchMaskRestrictions": 0,
      "VBSSIDFixedBitsMask": "",
      "VBSSIDFixedBitsValue": "",
      "VBSSsSubtract": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.Capabilities.VBSSCapabilities."
  },
  {
    "parameters": {
      "TxPower": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "Channel": 149,
      "Class": 90
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.CurrentOperatingClasses.1."
  },
  {
    "parameters": {
      "OnBootOnly": 0,
      "OpClassChannelsNumberOfEntries": 0,
      "Impact": 0,
      "MinimumInterval": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.ScanCapability."
  },
  {
    "parameters": {
      "SRGOBSSPDMaxOffset": 0,
      "HESIGASpatialReuseValue15Allowed": 0,
      "PSRDisallowed": 0,
      "SRGInformationValid": 0,
      "NonSRGOffsetValid": 0,
      "PartialBSSColor": 0,
      "SRGBSSColorBitmap": "",
      "BSSColor": 0,
      "SRGPartialBSSIDBitmap": "",
      "NonSRGOBSSPDMaxOffset": 0,
      "SRGOBSSPDMinOffset": 0,
      "NeighborBSSColorInUseBitmap": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.1.SpatialReuse."
  },
  {
    "parameters": {
      "TrafficSeparationCombinedBackhaul": 0,
      "TrafficSeparationCombinedFronthaul": 0,
      "Noise": 0,
      "BSSNumberOfEntries": 2,
      "ChannelUtilizationReportingThreshold": 0,
      "APMetricsWiFi6": 0,
      "UnassociatedSTANumberOfEntries": 0,
      "SteeringPolicy": 0,
      "ScanResultNumberOfEntries": 0,
      "AssociatedSTATrafficStatsInclusionPolicy": 0,
      "ReceiveSelf": 0,
      "Enabled": 0,
      "ReceiveOther": 0,
      "ChipsetVendor": "",
      "RCPISteeringThreshold": 0,
      "STAReportingRCPIThreshold": 0,
      "ID": "78:B3:9F:38:5C:61",
      "ChannelUtilizationThreshold": 0,
      "STAReportingRCPIHysteresisMarginOverride": 0,
      "CurrentOperatingClassesNumberOfEntries": 1,
      "AssociatedSTALinkMetricsInclusionPolicy": 0,
      "Transmit": 0,
      "Utilization": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2."
  },
  {
    "parameters": {
      "BackhaulUse": 1,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "UnicastBytesSent": 0,
      "EstServiceParametersVI": 0,
      "BroadcastBytesReceived": 0,
      "STANumberOfEntries": 0,
      "EstServiceParametersVO": 0,
      "Enabled": 0,
      "FronthaulUse": 0,
      "SSID": "0",
      "EstServiceParametersBE": 0,
      "BSSID": "78:B3:9F:38:5C:63",
      "UnicastBytesReceived": 0,
      "LastChange": 0,
      "EstServiceParametersBK": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "MulticastBytesSent": 0,
      "ByteCounterUnits": 0,
      "IsVBSS": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.BSS.5."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BTMQueryResponses": 0,
      "BlacklistAttempts": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.BSS.5.MultiAPSteering."
  },
  {
    "parameters": {
      "BackhaulUse": 0,
      "MulticastBytesReceived": 0,
      "BroadcastBytesSent": 0,
      "UnicastBytesSent": 0,
      "EstServiceParametersVI": 0,
      "BroadcastBytesReceived": 0,
      "STANumberOfEntries": 1,
      "EstServiceParametersVO": 0,
      "Enabled": 0,
      "FronthaulUse": 1,
      "SSID": "0",
      "EstServiceParametersBE": 0,
      "BSSID": "78:B3:9F:38:5C:62",
      "UnicastBytesReceived": 0,
      "LastChange": 0,
      "EstServiceParametersBK": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "MulticastBytesSent": 0,
      "ByteCounterUnits": 0,
      "IsVBSS": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.BSS.6."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BTMQueryResponses": 0,
      "BlacklistAttempts": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.BSS.6.MultiAPSteering."
  },
  {
    "parameters": {
      "TIDQueueSizesNumberOfEntries": 0,
      "UtilizationTransmit": 0,
      "ErrorsSent": 0,
      "MeasurementReportNumberOfEntries": 0,
      "UtilizationReceive": 0,
      "PacketsSent": 0,
      "BytesSent": 0,
      "BytesReceived": 0,
      "X_SC_LinkQuality": "Good",
      "MACAddress": "2E:2A:9B:8F:2B:F6",
      "LastConnectTime": 0,
      "ErrorsReceived": 0,
      "EstMACDataRateUplink": 0,
      "ClientCapabilities": "",
      "IPV6Address": "0",
      "Hostname": "iPhone",
      "LastDataDownlinkRate": 229,
      "LastDataUplinkRate": 0,
      "PacketsReceived": 0,
      "SignalStrength": 220,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "EstMACDataRateDownlink": 0,
      "IPV4Address": "192.168.1.12",
      "RetransCount": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.BSS.6.STA.3."
  },
  {
    "parameters": {
      "Noise": 0,
      "AssociationTime": "2020-08-31T11:22:39Z",
      "SteeringHistoryNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.BSS.6.STA.3.MultiAPSTA."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BlacklistFailures": 0,
      "BlacklistSuccesses": 0,
      "BlacklistAttempts": 0,
      "NoCandidateAPFailures": 0,
      "LastSteerTime": 0,
      "BTMQueryResponses": 0,
      "BTMSuccesses": 0,
      "BTMFailures": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.BSS.6.STA.3.MultiAPSTA.SteeringSummaryStats."
  },
  {
    "parameters": {
      "MACAddress": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.BackhaulSta."
  },
  {
    "parameters": {
      "CACMethodNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.CACCapability."
  },
  {
    "parameters": {
      "OperatingClass": 0,
      "Status": 255,
      "Channel": 0,
      "PairsNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.CACCompletion."
  },
  {
    "parameters": {
      "AKMFrontHaulNumberOfEntries": 0,
      "AKMBackhaulNumberOfEntries": 0,
      "OperatingClassesNumberOfEntries": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.Capabilities."
  },
  {
    "parameters": {
      "ApplyVBSSIDRestrictions": 0,
      "ApplyVBSSIDFixedBitsRestrictions": 0,
      "MaxVBSS": 0,
      "ApplyVBSSIDMatchMaskRestrictions": 0,
      "VBSSIDFixedBitsMask": "",
      "VBSSIDFixedBitsValue": "",
      "VBSSsSubtract": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.Capabilities.VBSSCapabilities."
  },
  {
    "parameters": {
      "TxPower": 0,
      "TimeStamp": "2020-08-31T11:22:39Z",
      "Channel": 1,
      "Class": 30
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.CurrentOperatingClasses.1."
  },
  {
    "parameters": {
      "OnBootOnly": 0,
      "OpClassChannelsNumberOfEntries": 0,
      "Impact": 0,
      "MinimumInterval": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.ScanCapability."
  },
  {
    "parameters": {
      "SRGOBSSPDMaxOffset": 0,
      "HESIGASpatialReuseValue15Allowed": 0,
      "PSRDisallowed": 0,
      "SRGInformationValid": 0,
      "NonSRGOffsetValid": 0,
      "PartialBSSColor": 0,
      "SRGBSSColorBitmap": "",
      "BSSColor": 0,
      "SRGPartialBSSIDBitmap": "",
      "NonSRGOBSSPDMaxOffset": 0,
      "SRGOBSSPDMinOffset": 0,
      "NeighborBSSColorInUseBitmap": ""
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.Radio.2.SpatialReuse."
  },
  {
    "parameters": {
      "SSID": "",
      "VID": 0
    },
    "path": "Device.WiFi.DataElements.Network.Device.2.SSIDtoVIDMapping."
  },
  {
    "parameters": {
      "BTMAttempts": 0,
      "BlacklistFailures": 0,
      "BlacklistSuccesses": 0,
      "BlacklistAttempts": 0,
      "NoCandidateAPFailures": 0,
      "BTMQueryResponses": 0,
      "BTMSuccesses": 0,
      "BTMFailures": 0
    },
    "path": "Device.WiFi.DataElements.Network.MultiAPSteeringSummaryStats."
  },
  {
    "parameters": {
      "SupportedOperatingChannelBandwidth": "Auto,20MHz,40MHz",
      "SupportedStandards": "b,g,n,bg,gn,bgn,ax,be",
      "ChannelsInUse": "6",
      "Channel": 6,
      "TransmitPowerSupported": "6,12,25,50,100,-1",
      "Name": "wl1",
      "dbgRADFile": "",
      "FirmwareVersion": "",
      "MCS": 0,
      "IEEE80211rSupported": 1,
      "IntelligentAirtimeSchedulingEnable": 1,
      "dbgRADEnable": 0,
      "Upstream": 0,
      "RetryLimit": 7,
      "RxPowerSaveRepeaterEnable": 0,
      "STA_Mode": 0,
      "LastChange": 1346,
      "OperatingClass": 81,
      "RadCapabilitiesHePhysStr": "SU_BEAMFORMER,SU_BEAMFORMEE,BEAMFORMEE_STS_LE_80MHZ",
      "PacketAggregationEnable": 1,
      "TransmitPower": 100,
      "IEEE80211kSupported": 1,
      "AutoChannelRefreshPeriod": 86400,
      "RTSThreshold": 2347,
      "PreambleType": "auto",
      "LastStatusChangeTimeStamp": "2025-07-13T11:16:36Z",
      "DFSChannelChangeEventTimestamp": "0001-01-01T00:00:00Z",
      "WDS_Mode": 0,
      "Noise": 0,
      "Interference": 0,
      "ImplicitBeamFormingEnabled": 1,
      "BaseMACAddress": "78:B3:9F:16:7E:35",
      "BasicDataTransmitRates": "1,2,5.5,11",
      "SupportedDataTransmitRates": "1,2,5.5,6,9,11,12,18,24,36,48,54",
      "HeCapsEnabled": "",
      "ActiveAssociatedDevices": 0,
      "GuardInterval": "Auto",
      "MultiUserMIMOSupported": 1,
      "STASupported_Mode": 0,
      "RIFSEnabled": "Default",
      "RadCapabilitiesHTStr": "CAP_40,SHORT_GI_20,SHORT_GI_40,MODE_40",
      "HeCapsSupported": "DL_OFDMA,UL_OFDMA,DL_MUMIMO",
      "PossibleChannels": "1,2,3,4,5,6,7,8,9,10,11,12,13,14",
      "IEEE80211_Caps": "WEP TKIP AES AES_CCM SAE EXPL_BF IMPL_BF MU_MIMO SAE_PWE",
      "AirtimeFairnessEnabled": 1,
      "AutoChannelEnable": 1,
      "RadCapabilitiesVHTStr": "",
      "ChannelBandwidthChangeReason": "MANUAL",
      "IEEE80211hEnabled": 0,
      "OperatingChannelBandwidth": "Auto",
      "ExtensionChannel": "Auto",
      "RxBeamformingCapsAvailable": "HE_SU_BF,HE_MU_BF,EHT_SU_BF",
      "ExplicitBeamFormingSupported": 1,
      "AutoBandwidthSelectMode": "Default",
      "DTIMPeriod": 3,
      "LowerLayers": "",
      "OperationalDataTransmitRates": "1,2,5.5,6,9,11,12,18,24,36,48,54",
      "ImplicitBeamFormingSupported": 1,
      "ActiveAntennaCtrl": -1,
      "RxChainCtrl": -1,
      "MaxChannelBandwidth": "40MHz",
      "Index": 21,
      "AutoChannelSupported": 1,
      "WPS_Enrollee_Mode": 0,
      "MaxAssociatedDevices": 32,
      "MultiAPTypesSupported": "FronthaulBSS,BackhaulBSS,BackhaulSTA",
      "DelayApUpPeriod": 10,
      "ChannelLoad": 0,
      "TxBeamformingCapsEnabled": "DEFAULT",
      "RxPowerSaveEnabled": 0,
      "TxChainCtrl": -1,
      "OperatingStandardsFormat": "Legacy",
      "ObssCoexistenceEnable": 1,
      "ExplicitBeamFormingEnabled": 1,
      "LongRetryLimit": 6,
      "CustomAlias": "Wl1",
      "MaxSupportedSSIDs": 8,
      "SupportedFrequencyBands": "2.4GHz",
      "IEEE80211hSupported": 0,
      "RegulatoryDomain": "AE",
      "TxBeamformingCapsAvailable": "HE_SU_BF,HE_MU_BF,EHT_SU_BF,EHT_MU_80_BF,EHT_MU_160_BF,EHT_MU_320_BF",
      "ActiveVideoAssociatedDevices": 0,
      "HECapabilities": "ICBCwAIDFQAAjAA=",
      "WET_Mode": 0,
      "Status": "Up",
      "Enable": 1,
      "CurrentOperatingChannelBandwidth": "20MHz",
      "OfdmaEnable": 1,
      "KickRoamingStation": 1,
      "AP_Mode": 1,
      "DFSChannelChangeEventCounter": 0,
      "MaxBitRate": 688,
      "OperatingStandards": "be",
      "VendorPCISig": "whm-scm",
      "RxBeamformingCapsEnabled": "DEFAULT",
      "MultiUserMIMOEnabled": 0,
      "ChannelChangeReason": "INITIAL",
      "OperatingFrequencyBand": "2.4GHz",
      "BeaconPeriod": 100,
      "HTCapabilities": "YhA=",
      "Alias": "Wl1",
      "TargetWakeTimeEnable": 1
    },
    "path": "Device.WiFi.Radio.1."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.Radio.1.Capabilities."
  },
  {
    "parameters": {
      "EMLMRSupport": 0,
      "STRSupport": 0,
      "NSTRSupport": 0,
      "EMLSRSupport": 0
    },
    "path": "Device.WiFi.Radio.1.Capabilities.WiFi7APRole."
  },
  {
    "parameters": {
      "EMLMRSupport": 0,
      "STRSupport": 0,
      "NSTRSupport": 0,
      "EMLSRSupport": 0
    },
    "path": "Device.WiFi.Radio.1.Capabilities.WiFi7STARole."
  },
  {
    "parameters": {
      "ChangeLogSize": 10,
      "ClearedDfsChannels": "",
      "RadioStatus": "Up",
      "AcsBootChannel": -1,
      "ChanspecShowing": "Sync",
      "RadarTriggeredDfsChannels": ""
    },
    "path": "Device.WiFi.Radio.1.ChannelMgt."
  },
  {
    "parameters": {
      "AllowProvider": 0,
      "Available": 0,
      "PreclearEnable": 0,
      "Status": "Off",
      "Channel": 0,
      "Bandwidth": "Auto"
    },
    "path": "Device.WiFi.Radio.1.ChannelMgt.BgDfs."
  },
  {
    "parameters": {
      "NrClearSuccess": 0,
      "NrClearStopChange": 0,
      "NrClearFailRadar": 0,
      "Alias": "Background",
      "NrClearStopQuit": 0,
      "NrClearStart": 0,
      "NrClearFailOther": 0
    },
    "path": "Device.WiFi.Radio.1.ChannelMgt.BgDfs.Stats.1."
  },
  {
    "parameters": {
      "NewBandwidth": "20MHz",
      "NrSta": 0,
      "NrVideoSta": 0,
      "TargetChannel": 0,
      "ChannelChangeReasonExt": "",
      "NewChannel": 6,
      "ChannelChangeReason": "INITIAL",
      "TargetBandwidth": "20MHz",
      "TimeStamp": "2025-07-13T11:17:10Z",
      "TargetChangeTime": "2025-07-13T11:16:16Z",
      "OldChannel": 1,
      "OldBandwidth": "20MHz"
    },
    "path": "Device.WiFi.Radio.1.ChannelMgt.ChannelChanges.2."
  },
  {
    "parameters": {
      "Frequency": "2.4GHz",
      "Channel": 6,
      "Bandwidth": "20MHz",
      "Reason": "INITIAL",
      "ReasonExt": "",
      "LastChangeTime": "2025-07-13T11:17:10Z"
    },
    "path": "Device.WiFi.Radio.1.ChannelMgt.CurrentChanspec."
  },
  {
    "parameters": {
      "Frequency": "2.4GHz",
      "Channel": 6,
      "Bandwidth": "20MHz",
      "Reason": "INITIAL",
      "ReasonExt": "",
      "LastChangeTime": "2025-07-13T11:17:10Z"
    },
    "path": "Device.WiFi.Radio.1.ChannelMgt.TargetChanspec."
  },
  {
    "parameters": {
      "FileLogLimit": 4,
      "EventLogLimit": 4
    },
    "path": "Device.WiFi.Radio.1.DFS."
  },
  {
    "parameters": {
      "FragmentationThreshold": -1,
      "RtsThreshold": -1,
      "BroadcastMaxBwCapability": -1,
      "Ampdu": -1,
      "TxBurst": -1,
      "Amsdu": -1,
      "TPCMode": "Auto",
      "VhtOmnEnabled": 1,
      "TxBeamforming": -1
    },
    "path": "Device.WiFi.Radio.1.DriverConfig."
  },
  {
    "parameters": {
      "NrRxAntenna": 4,
      "NrActiveTxAntenna": -1,
      "NrActiveRxAntenna": -1,
      "NrTxAntenna": 4
    },
    "path": "Device.WiFi.Radio.1.DriverStatus."
  },
  {
    "parameters": {
      "LastOccurrence": "2025-07-13T11:17:14Z",
      "Info": "0x08000000 0x00000000 / 0x00000000 0x00000000",
      "Key": "FsmCommit",
      "Value": 3
    },
    "path": "Device.WiFi.Radio.1.EventCounter.1."
  },
  {
    "parameters": {
      "LastOccurrence": "0001-01-01T00:00:00Z",
      "Info": "0",
      "Key": "FsmReset",
      "Value": 0
    },
    "path": "Device.WiFi.Radio.1.EventCounter.2."
  },
  {
    "parameters": {
      "LastOccurrence": "0001-01-01T00:00:00Z",
      "Info": "",
      "Key": "DoubleAssoc",
      "Value": 0
    },
    "path": "Device.WiFi.Radio.1.EventCounter.3."
  },
  {
    "parameters": {
      "LastOccurrence": "0001-01-01T00:00:00Z",
      "Info": "",
      "Key": "EpAssocFail",
      "Value": 0
    },
    "path": "Device.WiFi.Radio.1.EventCounter.4."
  },
  {
    "parameters": {
      "MBSSIDAdvertisementMode": "Auto",
      "SRGOBSSPDMaxOffset": 0,
      "BssColorPartial": 0,
      "HESIGASpatialReuseValue15Allowed": 0,
      "PSRDisallowed": 0,
      "SRGInformationValid": 0,
      "BssColor": 0,
      "NonSRGOffsetValid": 0,
      "SRGBSSColorBitmap": "",
      "SRGPartialBSSIDBitmap": "",
      "NonSRGOBSSPDMaxOffset": 0,
      "SRGOBSSPDMinOffset": 0
    },
    "path": "Device.WiFi.Radio.1.IEEE80211ax."
  },
  {
    "parameters": {
      "EMLSREnable": -1,
      "EMLMREnable": -1
    },
    "path": "Device.WiFi.Radio.1.IEEE80211be."
  },
  {
    "parameters": {
      "UseBaseMacOffset": 0,
      "UseLocalBitForGuest": 1,
      "NrBssRequired": 0,
      "LocalGuestMacOffset": 256,
      "BaseMacOffset": 0
    },
    "path": "Device.WiFi.Radio.1.MACConfig."
  },
  {
    "parameters": {
      "Enable": 1,
      "OffChannelSupported": 0
    },
    "path": "Device.WiFi.Radio.1.NaStaMonitor."
  },
  {
    "parameters": {
      "RssiInterval": 10,
      "Enable": 0,
      "AveragingFactor": 500,
      "Interval": 1000
    },
    "path": "Device.WiFi.Radio.1.NaStaMonitor.RssiEventing."
  },
  {
    "parameters": {
      "Available": "",
      "Enabled": "",
      "Status": ""
    },
    "path": "Device.WiFi.Radio.1.RadCaps."
  },
  {
    "parameters": {
      "MaxChannelsPerScan": -1,
      "FastScanReasons": "Ssid",
      "ScanChannelCount": -1,
      "ScanRequestInterval": -1,
      "HomeTime": -1,
      "ActiveChannelTime": -1,
      "PassiveChannelTime": -1
    },
    "path": "Device.WiFi.Radio.1.ScanConfig."
  },
  {
    "parameters": {
      "NrCoChannelAP": 0,
      "ScanInProgress": 0
    },
    "path": "Device.WiFi.Radio.1.ScanResults."
  },
  {
    "parameters": {
      "NrScanRequested": 0,
      "NrScanDone": 0,
      "NrScanBlocked": 0,
      "NrScanError": 0
    },
    "path": "Device.WiFi.Radio.1.ScanStats."
  },
  {
    "parameters": {
      "Enable": 0
    },
    "path": "Device.WiFi.Radio.1.Sensing."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 1127050,
      "PacketsSent": 3986,
      "BytesReceived": 0,
      "Noise": 0,
      "DiscardPacketsReceived": 51,
      "ErrorsReceived": 0,
      "MulticastPacketsReceived": 0,
      "UnknownProtoPacketsReceived": 0,
      "X_000E50_KNoise": -98,
      "X_000E50_ChannelUtilization": 99,
      "MultipleRetryCount": 0,
      "Temperature": 0,
      "X_000E50_Glitch": 2900,
      "FailedRetransCount": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "X_000E50_BadPLCP": 2,
      "PacketsReceived": 0,
      "DiscardPacketsSent": 105,
      "X_000E50_TXOP": 1,
      "RetransCount": 2,
      "BroadcastPacketsReceived": 0,
      "RetryCount": 0
    },
    "path": "Device.WiFi.Radio.1.Stats."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.1.Stats.WmmBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.1.Stats.WmmBytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.1.Stats.WmmFailedBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.1.Stats.WmmFailedReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.1.Stats.WmmFailedSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.1.Stats.WmmFailedbytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.1.Stats.WmmPacketsReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.1.Stats.WmmPacketsSent."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.Radio.1.Vendor."
  },
  {
    "parameters": {
      "SupportedOperatingChannelBandwidth": "Auto,20MHz,40MHz,80MHz,160MHz",
      "SupportedStandards": "a,n,an,ac,ax,be",
      "ChannelsInUse": "149,153,157,161,165,169,173,177",
      "Channel": 161,
      "TransmitPowerSupported": "6,12,25,50,100,-1",
      "Name": "wl0",
      "dbgRADFile": "",
      "FirmwareVersion": "",
      "MCS": 0,
      "IEEE80211rSupported": 1,
      "IntelligentAirtimeSchedulingEnable": 1,
      "dbgRADEnable": 0,
      "Upstream": 0,
      "RetryLimit": 7,
      "RxPowerSaveRepeaterEnable": 0,
      "STA_Mode": 0,
      "LastChange": 1339,
      "OperatingClass": 129,
      "RadCapabilitiesHePhysStr": "40_80MHZ_5GHZ,160MHZ_5GHZ,SU_BEAMFORMER,SU_BEAMFORMEE,BEAMFORMEE_STS_LE_80MHZ",
      "PacketAggregationEnable": 1,
      "TransmitPower": 100,
      "IEEE80211kSupported": 1,
      "AutoChannelRefreshPeriod": 86400,
      "RTSThreshold": 2347,
      "PreambleType": "auto",
      "LastStatusChangeTimeStamp": "2025-07-13T11:16:43Z",
      "DFSChannelChangeEventTimestamp": "0001-01-01T00:00:00Z",
      "WDS_Mode": 1,
      "Noise": 0,
      "Interference": 0,
      "ImplicitBeamFormingEnabled": 1,
      "BaseMACAddress": "78:B3:9F:16:7E:36",
      "BasicDataTransmitRates": "6,12,24",
      "SupportedDataTransmitRates": "6,9,12,18,24,36,48,54",
      "HeCapsEnabled": "",
      "ActiveAssociatedDevices": 1,
      "GuardInterval": "Auto",
      "MultiUserMIMOSupported": 1,
      "STASupported_Mode": 0,
      "RIFSEnabled": "Default",
      "RadCapabilitiesHTStr": "CAP_40,SHORT_GI_20,SHORT_GI_40,MODE_40",
      "HeCapsSupported": "DL_OFDMA,UL_OFDMA,DL_MUMIMO",
      "PossibleChannels": "36,40,44,48,52,56,60,64,100,104,108,112,116,120,124,128,132,136,140,144,149,153,157,161,165,169,173,177",
      "IEEE80211_Caps": "160MHz WEP TKIP AES AES_CCM SAE EXPL_BF IMPL_BF MU_MIMO DFS_OFFLOAD SAE_PWE",
      "AirtimeFairnessEnabled": 1,
      "AutoChannelEnable": 1,
      "RadCapabilitiesVHTStr": "RX_LDPC,SGI_80,SGI_160,TX_STBC,RX_STBC,SU_BFR,SU_BFE,LINK_ADAPT_CAP",
      "ChannelBandwidthChangeReason": "INITIAL",
      "IEEE80211hEnabled": 1,
      "OperatingChannelBandwidth": "Auto",
      "ExtensionChannel": "Auto",
      "RxBeamformingCapsAvailable": "VHT_SU_BF,HE_SU_BF,HE_MU_BF,EHT_SU_BF",
      "ExplicitBeamFormingSupported": 1,
      "AutoBandwidthSelectMode": "MaxCleared",
      "DTIMPeriod": 3,
      "LowerLayers": "",
      "OperationalDataTransmitRates": "6,9,12,18,24,36,48,54",
      "ImplicitBeamFormingSupported": 1,
      "ActiveAntennaCtrl": -1,
      "RxChainCtrl": -1,
      "MaxChannelBandwidth": "160MHz",
      "Index": 20,
      "AutoChannelSupported": 1,
      "WPS_Enrollee_Mode": 0,
      "MaxAssociatedDevices": 32,
      "MultiAPTypesSupported": "FronthaulBSS,BackhaulBSS,BackhaulSTA",
      "DelayApUpPeriod": 10,
      "ChannelLoad": 0,
      "TxBeamformingCapsEnabled": "DEFAULT",
      "RxPowerSaveEnabled": 0,
      "TxChainCtrl": -1,
      "OperatingStandardsFormat": "Legacy",
      "ObssCoexistenceEnable": 0,
      "ExplicitBeamFormingEnabled": 1,
      "LongRetryLimit": 6,
      "CustomAlias": "Wl0",
      "MaxSupportedSSIDs": 8,
      "SupportedFrequencyBands": "5GHz",
      "IEEE80211hSupported": 1,
      "RegulatoryDomain": "AE",
      "TxBeamformingCapsAvailable": "VHT_SU_BF,HE_SU_BF,HE_MU_BF,EHT_SU_BF,EHT_MU_80_BF,EHT_MU_160_BF,EHT_MU_320_BF",
      "ActiveVideoAssociatedDevices": 0,
      "HECapabilities": "TCBCwAIbFQAAjAA=",
      "WET_Mode": 0,
      "Status": "Up",
      "Enable": 1,
      "CurrentOperatingChannelBandwidth": "160MHz",
      "OfdmaEnable": 1,
      "KickRoamingStation": 1,
      "AP_Mode": 1,
      "DFSChannelChangeEventCounter": 0,
      "MaxBitRate": 5764,
      "OperatingStandards": "be",
      "VendorPCISig": "whm-scm",
      "RxBeamformingCapsEnabled": "DEFAULT",
      "MultiUserMIMOEnabled": 1,
      "ChannelChangeReason": "INITIAL",
      "OperatingFrequencyBand": "5GHz",
      "BeaconPeriod": 100,
      "HTCapabilities": "YhA=",
      "Alias": "Wl0",
      "TargetWakeTimeEnable": 1
    },
    "path": "Device.WiFi.Radio.2."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.Radio.2.Capabilities."
  },
  {
    "parameters": {
      "EMLMRSupport": 0,
      "STRSupport": 0,
      "NSTRSupport": 0,
      "EMLSRSupport": 0
    },
    "path": "Device.WiFi.Radio.2.Capabilities.WiFi7APRole."
  },
  {
    "parameters": {
      "EMLMRSupport": 0,
      "STRSupport": 0,
      "NSTRSupport": 0,
      "EMLSRSupport": 0
    },
    "path": "Device.WiFi.Radio.2.Capabilities.WiFi7STARole."
  },
  {
    "parameters": {
      "ChangeLogSize": 10,
      "ClearedDfsChannels": "",
      "RadioStatus": "Up",
      "AcsBootChannel": -1,
      "ChanspecShowing": "Sync",
      "RadarTriggeredDfsChannels": ""
    },
    "path": "Device.WiFi.Radio.2.ChannelMgt."
  },
  {
    "parameters": {
      "AllowProvider": 0,
      "Available": 0,
      "PreclearEnable": 1,
      "Status": "Off",
      "Channel": 0,
      "Bandwidth": "Auto"
    },
    "path": "Device.WiFi.Radio.2.ChannelMgt.BgDfs."
  },
  {
    "parameters": {
      "NrClearSuccess": 0,
      "NrClearStopChange": 0,
      "NrClearFailRadar": 0,
      "Alias": "Background",
      "NrClearStopQuit": 0,
      "NrClearStart": 0,
      "NrClearFailOther": 0
    },
    "path": "Device.WiFi.Radio.2.ChannelMgt.BgDfs.Stats.1."
  },
  {
    "parameters": {
      "NewBandwidth": "160MHz",
      "NrSta": 0,
      "NrVideoSta": 0,
      "TargetChannel": 0,
      "ChannelChangeReasonExt": "",
      "NewChannel": 161,
      "ChannelChangeReason": "INITIAL",
      "TargetBandwidth": "160MHz",
      "TimeStamp": "2025-07-13T11:17:10Z",
      "TargetChangeTime": "2025-07-13T11:16:17Z",
      "OldChannel": 52,
      "OldBandwidth": "80MHz"
    },
    "path": "Device.WiFi.Radio.2.ChannelMgt.ChannelChanges.2."
  },
  {
    "parameters": {
      "Frequency": "5GHz",
      "Channel": 161,
      "Bandwidth": "160MHz",
      "Reason": "INITIAL",
      "ReasonExt": "",
      "LastChangeTime": "2025-07-13T11:17:10Z"
    },
    "path": "Device.WiFi.Radio.2.ChannelMgt.CurrentChanspec."
  },
  {
    "parameters": {
      "Frequency": "5GHz",
      "Channel": 161,
      "Bandwidth": "160MHz",
      "Reason": "INITIAL",
      "ReasonExt": "",
      "LastChangeTime": "2025-07-13T11:17:10Z"
    },
    "path": "Device.WiFi.Radio.2.ChannelMgt.TargetChanspec."
  },
  {
    "parameters": {
      "FileLogLimit": 4,
      "EventLogLimit": 4
    },
    "path": "Device.WiFi.Radio.2.DFS."
  },
  {
    "parameters": {
      "FragmentationThreshold": -1,
      "RtsThreshold": -1,
      "BroadcastMaxBwCapability": -1,
      "Ampdu": -1,
      "TxBurst": -1,
      "Amsdu": -1,
      "TPCMode": "Auto",
      "VhtOmnEnabled": 1,
      "TxBeamforming": -1
    },
    "path": "Device.WiFi.Radio.2.DriverConfig."
  },
  {
    "parameters": {
      "NrRxAntenna": 4,
      "NrActiveTxAntenna": -1,
      "NrActiveRxAntenna": -1,
      "NrTxAntenna": 4
    },
    "path": "Device.WiFi.Radio.2.DriverStatus."
  },
  {
    "parameters": {
      "LastOccurrence": "2025-07-13T11:17:10Z",
      "Info": "0x08000000 0x00000000 / 0x00000000 0x00000000",
      "Key": "FsmCommit",
      "Value": 3
    },
    "path": "Device.WiFi.Radio.2.EventCounter.1."
  },
  {
    "parameters": {
      "LastOccurrence": "0001-01-01T00:00:00Z",
      "Info": "0",
      "Key": "FsmReset",
      "Value": 0
    },
    "path": "Device.WiFi.Radio.2.EventCounter.2."
  },
  {
    "parameters": {
      "LastOccurrence": "0001-01-01T00:00:00Z",
      "Info": "",
      "Key": "DoubleAssoc",
      "Value": 0
    },
    "path": "Device.WiFi.Radio.2.EventCounter.3."
  },
  {
    "parameters": {
      "LastOccurrence": "0001-01-01T00:00:00Z",
      "Info": "",
      "Key": "EpAssocFail",
      "Value": 0
    },
    "path": "Device.WiFi.Radio.2.EventCounter.4."
  },
  {
    "parameters": {
      "MBSSIDAdvertisementMode": "Auto",
      "SRGOBSSPDMaxOffset": 0,
      "BssColorPartial": 0,
      "HESIGASpatialReuseValue15Allowed": 0,
      "PSRDisallowed": 0,
      "SRGInformationValid": 0,
      "BssColor": 0,
      "NonSRGOffsetValid": 0,
      "SRGBSSColorBitmap": "",
      "SRGPartialBSSIDBitmap": "",
      "NonSRGOBSSPDMaxOffset": 0,
      "SRGOBSSPDMinOffset": 0
    },
    "path": "Device.WiFi.Radio.2.IEEE80211ax."
  },
  {
    "parameters": {
      "EMLSREnable": -1,
      "EMLMREnable": -1
    },
    "path": "Device.WiFi.Radio.2.IEEE80211be."
  },
  {
    "parameters": {
      "UseBaseMacOffset": 0,
      "UseLocalBitForGuest": 1,
      "NrBssRequired": 0,
      "LocalGuestMacOffset": 256,
      "BaseMacOffset": 0
    },
    "path": "Device.WiFi.Radio.2.MACConfig."
  },
  {
    "parameters": {
      "Enable": 1,
      "OffChannelSupported": 0
    },
    "path": "Device.WiFi.Radio.2.NaStaMonitor."
  },
  {
    "parameters": {
      "RssiInterval": 10,
      "Enable": 0,
      "AveragingFactor": 500,
      "Interval": 1000
    },
    "path": "Device.WiFi.Radio.2.NaStaMonitor.RssiEventing."
  },
  {
    "parameters": {
      "Available": "",
      "Enabled": "DFS_AHEAD DELAY_COMMIT",
      "Status": ""
    },
    "path": "Device.WiFi.Radio.2.RadCaps."
  },
  {
    "parameters": {
      "MaxChannelsPerScan": -1,
      "FastScanReasons": "Ssid",
      "ScanChannelCount": -1,
      "ScanRequestInterval": -1,
      "HomeTime": -1,
      "ActiveChannelTime": -1,
      "PassiveChannelTime": -1
    },
    "path": "Device.WiFi.Radio.2.ScanConfig."
  },
  {
    "parameters": {
      "NrCoChannelAP": 0,
      "ScanInProgress": 0
    },
    "path": "Device.WiFi.Radio.2.ScanResults."
  },
  {
    "parameters": {
      "NrScanRequested": 0,
      "NrScanDone": 0,
      "NrScanBlocked": 0,
      "NrScanError": 0
    },
    "path": "Device.WiFi.Radio.2.ScanStats."
  },
  {
    "parameters": {
      "Enable": 0
    },
    "path": "Device.WiFi.Radio.2.Sensing."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 1137607,
      "PacketsSent": 4099,
      "BytesReceived": 19433,
      "Noise": 0,
      "DiscardPacketsReceived": 65,
      "ErrorsReceived": 0,
      "MulticastPacketsReceived": 67,
      "UnknownProtoPacketsReceived": 0,
      "X_000E50_KNoise": -94,
      "X_000E50_ChannelUtilization": 77,
      "MultipleRetryCount": 0,
      "Temperature": 0,
      "X_000E50_Glitch": 239,
      "FailedRetransCount": 11,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "X_000E50_BadPLCP": 4,
      "PacketsReceived": 226,
      "DiscardPacketsSent": 152,
      "X_000E50_TXOP": 23,
      "RetransCount": 2112,
      "BroadcastPacketsReceived": 0,
      "RetryCount": 0
    },
    "path": "Device.WiFi.Radio.2.Stats."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.2.Stats.WmmBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.2.Stats.WmmBytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.2.Stats.WmmFailedBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.2.Stats.WmmFailedReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.2.Stats.WmmFailedSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.2.Stats.WmmFailedbytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.2.Stats.WmmPacketsReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.Radio.2.Stats.WmmPacketsSent."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.Radio.2.Vendor."
  },
  {
    "parameters": {
      "Status": "Up",
      "LastStatusChangeTimeStamp": "2025-07-13T11:16:36Z",
      "SSID": "eand167E30-2G-TTT1",
      "LowerLayers": "Device.WiFi.Radio.1",
      "MLDUnit": 0,
      "MACAddress": "78:B3:9F:16:7E:35",
      "BSSID": "78:b3:9f:16:7e:35",
      "LastChange": 1346,
      "Enable": 1,
      "Index": 21,
      "Name": "wl1",
      "CustomAlias": "WiFi-2G",
      "Alias": "WiFi-2G"
    },
    "path": "Device.WiFi.SSID.1."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 563654,
      "PacketsSent": 1995,
      "BytesReceived": 0,
      "DiscardPacketsReceived": 45,
      "ErrorsReceived": 0,
      "MulticastPacketsReceived": 0,
      "UnknownProtoPacketsReceived": 0,
      "MultipleRetryCount": 0,
      "FailedRetransCount": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "PacketsReceived": 0,
      "DiscardPacketsSent": 72,
      "RetransCount": 0,
      "BroadcastPacketsReceived": 0,
      "RetryCount": 0
    },
    "path": "Device.WiFi.SSID.1.Stats."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.1.Stats.WmmBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.1.Stats.WmmBytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.1.Stats.WmmFailedBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.1.Stats.WmmFailedReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.1.Stats.WmmFailedSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.1.Stats.WmmFailedbytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.1.Stats.WmmPacketsReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.1.Stats.WmmPacketsSent."
  },
  {
    "parameters": {
      "Status": "Up",
      "LastStatusChangeTimeStamp": "2025-07-13T11:16:43Z",
      "SSID": "eand167E30-2G-TTT2",
      "LowerLayers": "Device.WiFi.Radio.2",
      "MLDUnit": 0,
      "MACAddress": "78:B3:9F:16:7E:36",
      "BSSID": "78:b3:9f:16:7e:36",
      "LastChange": 1339,
      "Enable": 1,
      "Index": 20,
      "Name": "wl0",
      "CustomAlias": "WiFi-5G",
      "Alias": "WiFi-5G"
    },
    "path": "Device.WiFi.SSID.2."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 572788,
      "PacketsSent": 2105,
      "BytesReceived": 18384,
      "DiscardPacketsReceived": 58,
      "ErrorsReceived": 0,
      "MulticastPacketsReceived": 63,
      "UnknownProtoPacketsReceived": 0,
      "MultipleRetryCount": 0,
      "FailedRetransCount": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "PacketsReceived": 216,
      "DiscardPacketsSent": 95,
      "RetransCount": 0,
      "BroadcastPacketsReceived": 0,
      "RetryCount": 0
    },
    "path": "Device.WiFi.SSID.2.Stats."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.2.Stats.WmmBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.2.Stats.WmmBytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.2.Stats.WmmFailedBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.2.Stats.WmmFailedReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.2.Stats.WmmFailedSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.2.Stats.WmmFailedbytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.2.Stats.WmmPacketsReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.2.Stats.WmmPacketsSent."
  },
  {
    "parameters": {
      "Status": "Up",
      "LastStatusChangeTimeStamp": "2025-07-13T11:16:22Z",
      "SSID": "BHSSID-FJO0X51NB13Q0KCC",
      "LowerLayers": "Device.WiFi.Radio.1",
      "MLDUnit": 1,
      "MACAddress": "7A:B3:9F:16:80:36",
      "BSSID": "7a:b3:9f:16:80:36",
      "LastChange": 1360,
      "Enable": 1,
      "Index": 36,
      "Name": "wl1.1",
      "CustomAlias": "Backhaul-2G",
      "Alias": "Backhaul-2G"
    },
    "path": "Device.WiFi.SSID.3."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 563396,
      "PacketsSent": 1991,
      "BytesReceived": 0,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "MulticastPacketsReceived": 0,
      "UnknownProtoPacketsReceived": 0,
      "MultipleRetryCount": 0,
      "FailedRetransCount": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "PacketsReceived": 0,
      "DiscardPacketsSent": 33,
      "RetransCount": 0,
      "BroadcastPacketsReceived": 0,
      "RetryCount": 0
    },
    "path": "Device.WiFi.SSID.3.Stats."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.3.Stats.WmmBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.3.Stats.WmmBytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.3.Stats.WmmFailedBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.3.Stats.WmmFailedReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.3.Stats.WmmFailedSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.3.Stats.WmmFailedbytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.3.Stats.WmmPacketsReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.3.Stats.WmmPacketsSent."
  },
  {
    "parameters": {
      "Status": "Up",
      "LastStatusChangeTimeStamp": "2025-07-13T11:16:43Z",
      "SSID": "BHSSID-FJO0X51NB13Q0KCC",
      "LowerLayers": "Device.WiFi.Radio.2",
      "MLDUnit": 1,
      "MACAddress": "7A:B3:9F:16:7F:37",
      "BSSID": "7a:b3:9f:16:7f:37",
      "LastChange": 1339,
      "Enable": 1,
      "Index": 35,
      "Name": "wl0.1",
      "CustomAlias": "Backhaul-5G",
      "Alias": "Backhaul-5G"
    },
    "path": "Device.WiFi.SSID.4."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 564819,
      "PacketsSent": 1994,
      "BytesReceived": 1049,
      "DiscardPacketsReceived": 0,
      "ErrorsReceived": 0,
      "MulticastPacketsReceived": 4,
      "UnknownProtoPacketsReceived": 0,
      "MultipleRetryCount": 0,
      "FailedRetransCount": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "PacketsReceived": 10,
      "DiscardPacketsSent": 57,
      "RetransCount": 0,
      "BroadcastPacketsReceived": 0,
      "RetryCount": 0
    },
    "path": "Device.WiFi.SSID.4.Stats."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.4.Stats.WmmBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.4.Stats.WmmBytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.4.Stats.WmmFailedBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.4.Stats.WmmFailedReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.4.Stats.WmmFailedSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.4.Stats.WmmFailedbytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.4.Stats.WmmPacketsReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.4.Stats.WmmPacketsSent."
  },
  {
    "parameters": {
      "Status": "Up",
      "LastStatusChangeTimeStamp": "2025-07-13T11:16:22Z",
      "SSID": "eand167E30-2G-GUEST",
      "LowerLayers": "Device.WiFi.Radio.1",
      "MLDUnit": -1,
      "MACAddress": "7A:B3:9F:16:80:37",
      "BSSID": "7a:b3:9f:16:80:37",
      "LastChange": 1360,
      "Enable": 0,
      "Index": 33,
      "Name": "wl1.2",
      "CustomAlias": "WiFi-2G-Guest",
      "Alias": "WiFi-2G-Guest"
    },
    "path": "Device.WiFi.SSID.5."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "DiscardPacketsReceived": 6,
      "ErrorsReceived": 0,
      "MulticastPacketsReceived": 0,
      "UnknownProtoPacketsReceived": 0,
      "MultipleRetryCount": 0,
      "FailedRetransCount": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "PacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "RetransCount": 0,
      "BroadcastPacketsReceived": 0,
      "RetryCount": 0
    },
    "path": "Device.WiFi.SSID.5.Stats."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.5.Stats.WmmBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.5.Stats.WmmBytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.5.Stats.WmmFailedBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.5.Stats.WmmFailedReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.5.Stats.WmmFailedSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.5.Stats.WmmFailedbytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.5.Stats.WmmPacketsReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.5.Stats.WmmPacketsSent."
  },
  {
    "parameters": {
      "Status": "Up",
      "LastStatusChangeTimeStamp": "2025-07-13T11:16:22Z",
      "SSID": "eand167E30-2G-GUEST",
      "LowerLayers": "Device.WiFi.Radio.2",
      "MLDUnit": -1,
      "MACAddress": "7A:B3:9F:16:7F:30",
      "BSSID": "7a:b3:9f:16:7f:30",
      "LastChange": 1360,
      "Enable": 0,
      "Index": 34,
      "Name": "wl0.2",
      "CustomAlias": "WiFi-5G-Guest",
      "Alias": "WiFi-5G-Guest"
    },
    "path": "Device.WiFi.SSID.6."
  },
  {
    "parameters": {
      "MulticastPacketsSent": 0,
      "ErrorsSent": 0,
      "BroadcastPacketsSent": 0,
      "BytesSent": 0,
      "PacketsSent": 0,
      "BytesReceived": 0,
      "DiscardPacketsReceived": 7,
      "ErrorsReceived": 0,
      "MulticastPacketsReceived": 0,
      "UnknownProtoPacketsReceived": 0,
      "MultipleRetryCount": 0,
      "FailedRetransCount": 0,
      "UnicastPacketsSent": 0,
      "UnicastPacketsReceived": 0,
      "PacketsReceived": 0,
      "DiscardPacketsSent": 0,
      "RetransCount": 0,
      "BroadcastPacketsReceived": 0,
      "RetryCount": 0
    },
    "path": "Device.WiFi.SSID.6.Stats."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.6.Stats.WmmBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.6.Stats.WmmBytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.6.Stats.WmmFailedBytesReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.6.Stats.WmmFailedReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.6.Stats.WmmFailedSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.6.Stats.WmmFailedbytesSent."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.6.Stats.WmmPacketsReceived."
  },
  {
    "parameters": {
      "AC_VI": 0,
      "AC_BK": 0,
      "AC_BE": 0,
      "AC_VO": 0
    },
    "path": "Device.WiFi.SSID.6.Stats.WmmPacketsSent."
  },
  {
    "parameters": {},
    "path": "Device.WiFi.Vendor."
  },
  {
    "parameters": {
      "DaisyChainEnable": 1,
      "IEEE1905PacketFwd": 0,
      "Enable": 1,
      "DebugLogSize": 512,
      "IEEE1905PacketFwdIfname": "eth0",
      "DebugLogFile": "/tmp/onefi_ctrl.log",
      "DebugLogLevel": "0x70007",
      "Mode": 1
    },
    "path": "Device.WiFi.X_000E50_MultiAP."
  },
  {
    "parameters": {
      "Enable": 0,
      "Hysteresis": 10,
      "SpeedThreshild": 350
    },
    "path": "Device.WiFi.X_000E50_MultiAP.SpeedTest."
  },
  {
    "parameters": {
      "BHTargetBSSWeightCfg": "14,7,6,5,6,9,5,6,0x0AB",
      "TargetBSSStaCntThld": 3,
      "BounceDetect": "60,2,180",
      "TargetBSSWeightCfgFar": "10,7,6,0,6,25,4,0x02B",
      "BHWeakClientThldCfg5G": "1000,-55,3,80,50,20,0x06",
      "WeakClientThldCfg5G": "1000,-65,3,80,50,20,0x07",
      "Prefer5GClientThldCfg": "1000,-50,3,0x02",
      "BandSteeringEnable": 1,
      "BHTargetBSSWeightCfgFar": "9,7,6,5,6,14,4,6,0x0AB",
      "TargetBSSWeightCfg": "10,7,6,5,6,14,5,0x02B",
      "BHWeakClientThldCfg2G": "1000,-70,3,80,50,20,0x06",
      "WeakClientThldCfg2G": "1000,-75,3,80,50,20,0x07",
      "TargetBSSAdvantageThld": 200
    },
    "path": "Device.WiFi.X_000E50_MultiAP.Steering."
  },
  {
    "parameters": {
      "Enable": 0,
      "WiFiEnable": 0,
      "ListNumberOfEntries": 0
    },
    "path": "Device.WiFi.X_SC_Schedule."
  },
  {
    "parameters": {
      "DefaultPin": "85778474",
      "OUI": "",
      "ModelNumber": "",
      "UUID": "4c4d5748-4e5b-f64b-fc5a-48454c4d5748",
      "OsVersion": "",
      "DevName": "",
      "ModelUrl": "",
      "ModelDescription": "FG4278Bv3 Sercomm",
      "SerialNumber": "",
      "wpsUUIDShared": 0,
      "ModelName": "FG4278Bv3",
      "Manufacturer": "Sercomm",
      "ManufacturerUrl": "",
      "FriendlyName": "",
      "wpsSupVer": 2
    },
    "path": "Device.WiFi.wps_DefParam."
  }
];

module.exports = { data };