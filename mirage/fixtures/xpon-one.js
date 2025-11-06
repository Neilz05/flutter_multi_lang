let data = [
  {
    "parameters": {
      "Enable": 0,
      "EthernetUNINumberOfEntries": 1,
      "EquipmentID": "MyEquipment",
      "Name": "ONU_ONE",
      "Version": "v1.2.3",
      "SoftwareImageNumberOfEntries": 2,
      "ANINumberOfEntries": 1
    },
    "path": "Device.XPON.ONU.1."
  },
  {
    "parameters": {
      "LastChange": 14170,
      "PONMode": "XGS-PON",
      "TransceiverNumberOfEntries": 1,
      "Enable": 0,
      "Name": "MyANI",
      "Status": "Dormant",
      "Alias": "cpe-ANI-1"
    },
    "path": "Device.XPON.ONU.1.ANI.1."
  },
  {
    "parameters": {
      "DiscardPacketsReceived": 0,
      "PacketsReceived": 1106759,
      "ErrorsReceived": 0,
      "DiscardPacketsSent": 0,
      "PacketsSent": 0
    },
    "path": "Device.XPON.ONU.1.ANI.1.Stats."
  },
  {
    "parameters": {
      "TcontNumberOfEntries": 2
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC."
  },
  {
    "parameters": {
      "LCDG": 0,
      "MIS": 0,
      "SUF": 0,
      "LOF": 0,
      "SD": 0,
      "RDI": 0,
      "SF": 0,
      "ROGUE": 0,
      "LODS": 0,
      "LOS": 0,
      "PEE": 0,
      "MEM": 0,
      "TF": 0,
      "DACT": 0,
      "DIS": 0
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.Alarms."
  },
  {
    "parameters": {
      "HexadecimalPassword": 0,
      "Password": ""
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.Authentication."
  },
  {
    "parameters": {
      "PortNumberOfEntries": 4
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.GEM."
  },
  {
    "parameters": {
      "PortType": "multicast",
      "Direction": "ANI-to-UNI",
      "PortID": 4095,
      "GemTcontID": 255
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.GEM.Port.1."
  },
  {
    "parameters": {
      "DiscardPacketsReceived": 0,
      "FramesReceived": 0,
      "TxBytes": 0,
      "FramesSent": 0,
      "RxBytes": 0
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.GEM.Port.1.PM."
  },
  {
    "parameters": {
      "PortType": "unicast",
      "Direction": "bidirectional",
      "PortID": 3807,
      "GemTcontID": 1
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.GEM.Port.2."
  },
  {
    "parameters": {
      "DiscardPacketsReceived": 0,
      "FramesReceived": 263449,
      "TxBytes": 0,
      "FramesSent": 0,
      "RxBytes": 200725572
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.GEM.Port.2.PM."
  },
  {
    "parameters": {
      "PortType": "unicast",
      "Direction": "bidirectional",
      "PortID": 3806,
      "GemTcontID": 1
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.GEM.Port.3."
  },
  {
    "parameters": {
      "DiscardPacketsReceived": 0,
      "FramesReceived": 831307,
      "TxBytes": 0,
      "FramesSent": 0,
      "RxBytes": 1002969110
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.GEM.Port.3.PM."
  },
  {
    "parameters": {
      "PortType": "unicast",
      "Direction": "bidirectional",
      "PortID": 3808,
      "GemTcontID": 2
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.GEM.Port.4."
  },
  {
    "parameters": {
      "DiscardPacketsReceived": 0,
      "FramesReceived": 10221,
      "TxBytes": 0,
      "FramesSent": 0,
      "RxBytes": 840193
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.GEM.Port.4.PM."
  },
  {
    "parameters": {
      "VendorID": "XYZ",
      "ONUID": 71,
      "ONUState": "O5",
      "SerialNumber": "SCOMA180007A"
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.ONUActivation."
  },
  {
    "parameters": {},
    "path": "Device.XPON.ONU.1.ANI.1.TC.PM."
  },
  {
    "parameters": {
      "FramesReceived": 0,
      "FramesSent": 0,
      "KeyErrors": 0,
      "FrameHeaderHECErrors": 0
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.PM.GEM."
  },
  {
    "parameters": {
      "BaselineMessagesReceived": 1753,
      "ExtendedMessagesReceived": 0,
      "MICErrors": 0,
      "TxFrames": 1824,
      "RxFrames": 1753
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.PM.OMCI."
  },
  {
    "parameters": {
      "CorrectedFECBytes": 0,
      "PSBdHECErrorCount": 0,
      "HeaderHECErrorCount": 0,
      "CorrectedFECCodewords": 0,
      "TotalFECCodewords": 0,
      "UnknownProfile": 0,
      "UncorrectableFECCodewords": 0
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.PM.PHY."
  },
  {
    "parameters": {
      "UpstreamMessageCount": 0,
      "MICErrors": 0,
      "DownstreamMessageCount": 0,
      "RangingTime": 0
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.PM.PLOAM."
  },
  {
    "parameters": {
      "SignalDegrade": 10,
      "SignalFail": 8
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.PerformanceThresholds."
  },
  {
    "parameters": {
      "ID": 1,
      "AllocID": 327,
      "TxGemFrames": 0
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.Tcont.1."
  },
  {
    "parameters": {
      "ID": 2,
      "AllocID": 583,
      "TxGemFrames": 0
    },
    "path": "Device.XPON.ONU.1.ANI.1.TC.Tcont.2."
  },
  {
    "parameters": {
      "NominalBitRateUpstream": 0,
      "NominalBitRateDownstream": 0,
      "VendorRevision": "Version_1",
      "Temperature": 44,
      "Voltage": 3247,
      "PONMode": "XGS-PON",
      "ID": 0,
      "TxPower": 27,
      "Bias": 13,
      "VendorName": "AIROHA",
      "VendorPartNumber": "GN25L95",
      "Connector": "Unknown",
      "Identifier": 2,
      "RxPower": -272
    },
    "path": "Device.XPON.ONU.1.ANI.1.Transceiver.1."
  },
  {
    "parameters": {
      "Status": "Up",
      "LowerLayers": "",
      "LastChange": 14171,
      "InterdomainName": "MyDomain",
      "InterdomainID": "(VEIP,835)",
      "Enable": 1,
      "ANIs": "MyAni",
      "Name": "gponwan",
      "Alias": "cpe-EthernetUNI-1"
    },
    "path": "Device.XPON.ONU.1.EthernetUNI.1."
  },
  {
    "parameters": {
      "ID": 0,
      "IsCommitted": 1,
      "Version": "SAHE01020304",
      "IsValid": 1,
      "IsActive": 1
    },
    "path": "Device.XPON.ONU.1.SoftwareImage.1."
  },
  {
    "parameters": {
      "ID": 1,
      "IsCommitted": 0,
      "Version": "SAHE01020303",
      "IsValid": 1,
      "IsActive": 0
    },
    "path": "Device.XPON.ONU.1.SoftwareImage.2."
  },
  {
    "parameters": {
      "ZteOntType": 0,
      "AutoDetectEnable": 0,
      "PotsSlotNum": -1,
      "HwVersion": "RHG3006v1",
      "OmciLogMode": 0,
      "PonType": 0,
      "VideoSlotNum": -1,
      "PotsUniNum": 0,
      "OmciLogFile": "/tmp/omci/omci_debug.log",
      "QueueLinkType": -1,
      "VoipCfgSaveXml": 0,
      "LoidPwd": "",
      "VifNum": 1,
      "Modulename": "RHG3006",
      "OvertimeOpticalEnable": 1,
      "TR247Enable": 0,
      "ManagUniMask": "00000000",
      "VendorCode": "SE",
      "DsPriQueueNum": -1,
      "VendorId": "",
      "PretendFwFlag": 0,
      "FwVersion1": "XF6_3.0.05.00",
      "Customer": "Fastweb",
      "BatterySupport": 0,
      "FwVersion2": "XF6_3.0.05.00",
      "RftvUniNum": 0,
      "TcontNum": 10,
      "Loid": "",
      "OmciVer": "161",
      "GponSlotNum": -1,
      "OntMode": 1,
      "Compatible": -1,
      "GponSn": "53434F4DA180007A",
      "OmciLogMask": 0,
      "GemNum": 128,
      "TrafficMgmtOpt": 2,
      "PeerOltType": 4,
      "ManagWanMask": "000000",
      "HuaweiOntType": 0,
      "AluOntType": 1,
      "PasswordFormat": -1,
      "EquipementId": "RHG3006",
      "StringFormart": -1,
      "SingleUniEnable": 1,
      "PptpUniSlotNum": -1,
      "TcontPolicy": 2,
      "EricssonOntType": 0,
      "VifSlotNum": -1,
      "UsPriQueueNum": -1,
      "PptpUniNum": 1,
      "IphostNum": -1,
      "OmciLogLength": -1
    },
    "path": "Device.XPON.ONU.1.X_SC_OMCI."
  }
];

module.exports = { data };
// module.exports = { data };
