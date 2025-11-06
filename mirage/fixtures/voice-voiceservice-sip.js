const data = [
  {
    parameters: {
        Enable: true,
        RegisterURI: "4206969",
        "X_PRPLWARE-COM_DisplayName": "Client1",
        AuthUserName: "user12311",
        AuthPassword: "12345",
        Status: "Up",
        "X_PRPLWARE-COM_InternalNumber": "#1",
        Network: "Device.Services.VoiceService.1.SIP.Network.1."
    },
    path: "Device.Services.VoiceService.1.SIP.Client.1.",
  },
  {
    parameters: {
        Enable: true,
        RegisterURI: "0122500",
        "X_PRPLWARE-COM_DisplayName": "Client2",
        AuthUserName: "user221321",
        AuthPassword: "67890",
        Status: "Up",
        "X_PRPLWARE-COM_InternalNumber":"#2",
        Network: "Device.Services.VoiceService.1.SIP.Network.2."
    },
    path: "Device.Services.VoiceService.1.SIP.Client.2.",
  },
  {
    parameters: {
        Enable: true,
        RegisterURI: "177013",
        "X_PRPLWARE-COM_DisplayName": "Client3",
        AuthUserName: "user420",
        AuthPassword: "12345",
        Status: "Disabled",
        "X_PRPLWARE-COM_InternalNumber":"#3",
    },
    path: "Device.Services.VoiceService.1.SIP.Client.3.",
  },
];

export { data };