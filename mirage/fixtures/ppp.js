const data = [

  {
    parameters: {
      Username: "user1",
      Password: "",
      Status: "Up",
      ConnectionTrigger: "AlwaysOn",
      LowerLayers: "Device.Ethernet.VLANTermination.9.",
      IPv6CPEnable: 1,
      ConnectionStatus: "Connected",
      Enable: 1,
      Name: "pppoe-wan",
      AutoDisconnectTime: 0,
      LastConnectionError: "ERROR_NONE",
      CompressionProtocol: "None",
      CurrentMRUSize: 1492,
      AuthenticationProtocol: "CHAP",
      LastChange: 53737,
      LCPEcho: 15,
      LCPEchoRetry: 5,
      EncryptionProtocol: "None",
      IPCPEnable: 1,
      WarnDisconnectDelay: 0,
      IdleDisconnectTime: 0,
      Alias: "wan",
      MaxMRUSize: 1500
    },
    path: "Device.PPP.Interface.1."
  },
  {
    parameters: {
      RemoteIPAddress: "10.28.35.254",
      LocalIPAddress: "10.28.35.45",
      DNSServers: "192.168.1.1",
      PassthroughEnable: 1,
      PassthroughDHCPPool: ""
    },
    path: "Device.PPP.Interface.1.IPCP."
  },
  {
    parameters: {
      RemoteInterfaceIdentifier: "fe80::aebc:d9ff:fe0c:1adc",
      LocalInterfaceIdentifier: "fe80::e157:53c8:ff21:fa47"
    },
    path: "Device.PPP.Interface.1.IPv6CP."
  },
  {
    parameters: {
      ServiceName: "",
      SessionID: 49525,
      ACName: ""
    },
    path: "Device.PPP.Interface.1.PPPoE."
  },
  {
    parameters: {
      MulticastPacketsSent: 0,
      ErrorsSent: 0,
      BroadcastPacketsSent: 0,
      BytesSent: 1304552,
      PacketsSent: 9801,
      BytesReceived: 3206324,
      DiscardPacketsReceived: 0,
      ErrorsReceived: 0,
      MulticastPacketsReceived: 0,
      UnknownProtoPacketsReceived: 0,
      UnicastPacketsSent: 0,
      UnicastPacketsReceived: 0,
      PacketsReceived: 17007,
      DiscardPacketsSent: 0,
      BroadcastPacketsReceived: 0
    },
    path: "Device.PPP.Interface.1.Stats."
  }
];

module.exports = { data };
