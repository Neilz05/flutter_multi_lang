const data = [
    {
        parameters: {
            ID: "76:06:35:81:c0:75",
            ManufacturerModel: "Model Name",
            SerialNumber: "1234567890",
            X_SC_IPV4Address: "4.4.4.4",
            X_SC_Hostname: "Agent Hostname",
        },
        path: 'WiFi.DataElements.Network.Device.4.',
    },
    {
        parameters: {
        },
        path: 'WiFi.DataElements.Network.Device.4.MultiAPDevice.',
    },
    {
        parameters: {
            BackhaulDeviceID: "08:16:05:eb:91:21",
            LinkType: "Wi-Fi",
            MACAddress: "",
            X_Speedtest: 10,
        },
        path: 'WiFi.DataElements.Network.Device.4.MultiAPDevice.Backhaul.',
    },
    {
        parameters: {
        },
        path: 'WiFi.DataElements.Network.Device.4.Radio.1.',
    },
    {
        parameters: {

        },
        path: 'WiFi.DataElements.Network.Device.4.Radio.1.BSS.1.',
    },
    {
        parameters:{
            UtilizationTransmit: 0,
            ErrorsSent: 0,
            MeasurementReportNumberOfEntries: 0,
            UtilizationReceive: 0,
            PacketsSent: 369169, 
            BytesSent: 95423488,
            BytesReceived: 18719744,
            MACAddress:"f4:09:d8:e2:4b:5b",
            LastConnectTime: 261033, 
            ErrorsReceived: 0,
            EstMACDataRateUplink: 144,
            IPV6Address: "0",
            Hostname:"Client Hostname",
            LastDataDownlinkRate: 0,
            LastDataUplinkRate: 0,
            PacketsReceived: 255155,
            SignalStrength:138,
            TimeStamp:"2022-08-29T17:56:41.469603928Z",
            EstMACDataRateDownlink: 24,
            IPV4Address: "0",
            RetransCount: 9196,
            X_SC_LinkQuality: "Warning",
        },
        path:"Device.WiFi.DataElements.Network.Device.4.Radio.1.BSS.1.STA.1."
    },
    {
        parameters:{
            UtilizationTransmit: 0,
            ErrorsSent: 0,
            MeasurementReportNumberOfEntries: 0,
            UtilizationReceive: 0,
            PacketsSent: 369169, 
            BytesSent: 95423488,
            BytesReceived: 18719744,
            MACAddress:"f4:09:d8:e2:4b:5c",
            LastConnectTime: 261033, 
            ErrorsReceived: 0,
            EstMACDataRateUplink: 144,
            IPV6Address: "0",
            Hostname:"Client Hostname",
            LastDataDownlinkRate: 0,
            LastDataUplinkRate: 0,
            PacketsReceived: 255155,
            SignalStrength:138,
            TimeStamp:"2022-08-29T17:56:41.469603928Z",
            EstMACDataRateDownlink: 24,
            IPV4Address: "0",
            RetransCount: 9196,
            X_SC_LinkQuality: "Bad",
        },
        path:"Device.WiFi.DataElements.Network.Device.4.Radio.1.BSS.1.STA.2."
    },
    {
        parameters: {
            Channel: 42,
        },
        path: 'WiFi.DataElements.Network.Device.4.Radio.1.CurrentOperatingClasses.3.',
    },
]

export { data };