const data = [
    {
        parameters: {
            ID: "08:16:05:eb:91:21",
            ManufacturerModel: "Model Name",
            SerialNumber: "1234567890",
            X_SC_IPV4Address: "2.2.2.2",
            X_SC_Hostname: "Controller Hostname",
        },
        path: 'WiFi.DataElements.Network.Device.2.'
    },
    {
        parameters: {
            MLDMACAddress: "00:00:00:00:00:10",
        },
        path: 'WiFi.DataElements.Network.Device.2.APMLD.1.'
    },
    {
        parameters: {
            MLDMACAddress: "00:00:00:00:00:11",
                        Hostname:"DominicPogi",
            IPv4Address:"100dominicpogi"
        },
        path: 'WiFi.DataElements.Network.Device.2.APMLD.1.STAMLD.1.'
    },
    {
        parameters: {
            MACAddress: "00:00:00:00:00:21",

            
        },
        path: 'WiFi.DataElements.Network.Device.2.APMLD.1.STAMLD.1.AffiliatedSTA.1.'
    },
    {
        parameters: {
            MACAddress: "00:00:00:00:00:31",
        },
        path: 'WiFi.DataElements.Network.Device.2.APMLD.1.STAMLD.1.AffiliatedSTA.2.'
    },
    {
        parameters: {
            MLDMACAddress: "1a:ef:c0:00:07:02",
        },
        path: 'WiFi.DataElements.Network.Device.2.APMLD.2.'
    },
    {
        parameters: {
            MLDMACAddress: "1a:ef:c0:00:07:02",
        },
        path: 'WiFi.DataElements.Network.Device.2.APMLD.2.STAMLD.1.'
    },
    {
        parameters: {
            MACAddress: "76:06:35:81:c1:00",
        },
        path: 'WiFi.DataElements.Network.Device.2.APMLD.2.STAMLD.1.AffiliatedSTA.1.'
    },   
    {
        parameters: {
        },
        path: 'WiFi.DataElements.Network.Device.2.MultiAPDevice.',
    },
    {
        parameters: {
            BackhaulDeviceID: "",
            LinkType: "None",
            MACAddress: "",
            X_Speedtest: 10,
        },
        path: 'WiFi.DataElements.Network.Device.2.MultiAPDevice.Backhaul.',
    },
    {
        parameters: {
            APMetricsWiFi6: 1,
            AssociatedSTALinkMetricsInclusionPolicy: 1,
            AssociatedSTATrafficStatsInclusionPolicy: 1,
            BSSNumberOfEntries: 2,
            ChannelUtilizationReportingThreshold: 0,
            ChannelUtilizationThreshold: 0,
            ChipsetVendor: "prplmesh",
            CurrentOperatingClassesNumberOfEntries: 1,
            Enabled: 1,
            ID: "08:16:05:eb:91:23",
            Noise: 0,
            RCPISteeringThreshold: 0,
            ReceiveOther: 0,
            ReceiveSelf: 0,
            STAReportingRCPIHysteresisMarginOverride: 0,
            STAReportingRCPIThreshold: 0,
            ScanResultNumberOfEntries: 0,
            SteeringPolicy: 0,
            TrafficSeparationCombinedBackhaul: 0,
            TrafficSeparationCombinedFronthaul: 1,
            Transmit: 0,
            UnassociatedSTANumberOfEntries: 0,
            Utilization: 0,
        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.1.',
    },
    {
        parameters: {
            BSSID: "08:16:05:eb:91:23",
            BackhaulUse: 0,
            BroadcastBytesReceived: 0,
            BroadcastBytesSent: 0,
            ByteCounterUnits: 1,
            Enabled: 1,
            EstServiceParametersBE: 0,
            EstServiceParametersBK: 0,
            EstServiceParametersVI: 0,
            EstServiceParametersVO: 0,
            FronthaulUse: 1,
            IsVBSS: 0,
            LastChange: 222,
            MulticastBytesReceived: 0,
            MulticastBytesSent: 0,
            SSID: "",
            STANumberOfEntries: 1,
            TimeStamp: "2024-07-22T08:29:18.236089660Z",
            UnicastBytesReceived: 0,
            UnicastBytesSent: 0,

        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.1.BSS.1.',
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
            MACAddress:"f4:09:d8:e2:4b:5a",
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
            IPV4Address: "9.9.9.9",
            RetransCount: 9196,
            X_SC_LinkQuality: "Good",
        },
        path:"WiFi.DataElements.Network.Device.2.Radio.1.BSS.1.STA.1."
    },
    {
        parameters: {
            BSSID: "0a:16:05:eb:92:24",
            BackhaulUse: 1,
            BroadcastBytesReceived: 0,
            BroadcastBytesSent: 0,
            ByteCounterUnits: 0,
            Enabled: 1,
            EstServiceParametersBE: 0,
            EstServiceParametersBK: 0,
            EstServiceParametersVI: 0,
            EstServiceParametersVO: 0,
            FronthaulUse: 0,
            IsVBSS: 0,
            LastChange: 222,
            MulticastBytesReceived: 0,
            MulticastBytesSent: 0,
            SSID: "BHSSID-5lmPswBfo03OGz39",
            STANumberOfEntries: 0,
            TimeStamp: "2024-07-22T08:29:18.238606480Z",
            UnicastBytesReceived: 0,
            UnicastBytesSent: 0,

        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.1.BSS.2.',
    },
    {
        parameters: {
            Channel: 42,
        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.1.CurrentOperatingClasses.1.',
    },
    {
        parameters: {
            ID: "08:16:05:eb:91:22",
        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.2.',
    },
    {
        parameters: {
            BSSID: "08:16:05:eb:91:22",
            BackhaulUse: 0,
            BroadcastBytesReceived: 0,
            BroadcastBytesSent: 0,
            ByteCounterUnits: 1,
            Enabled: 1,
            EstServiceParametersBE: 0,
            EstServiceParametersBK: 0,
            EstServiceParametersVI: 0,
            EstServiceParametersVO: 0,
            FronthaulUse: 1,
            IsVBSS: 0,
            LastChange: 222,
            MulticastBytesReceived: 0,
            MulticastBytesSent: 0,
            SSID: "simon_test",
            STANumberOfEntries: 1,
            TimeStamp: "2024-07-22T08:29:18.236089660Z",
            UnicastBytesReceived: 0,
            UnicastBytesSent: 0,

        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.2.BSS.1.',
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
            MACAddress:"76:06:35:81:c0:75",
            LastConnectTime: 261033, 
            ErrorsReceived: 0,
            EstMACDataRateUplink: 144,
            IPV6Address: "0",
            Hostname:"",
            LastDataDownlinkRate: 0,
            LastDataUplinkRate: 0,
            PacketsReceived: 255155,
            SignalStrength:138,
            TimeStamp:"2022-08-29T17:56:41.469603928Z",
            EstMACDataRateDownlink: 24,
            IPV4Address: "10.10.10.10",
            RetransCount: 9196,
            X_SC_LinkQuality: "Warning",
        },
        path:"WiFi.DataElements.Network.Device.2.Radio.2.BSS.1.STA.1."
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
            MACAddress:"00:00:00:00:00:31",
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
            IPV4Address: "7.7.7.7",
            RetransCount: 9196,
            X_SC_LinkQuality: "Good",
        },
        path:"WiFi.DataElements.Network.Device.2.Radio.2.BSS.1.STA.2."
    },
    {
        parameters: {
            Channel: 2,
        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.2.CurrentOperatingClasses.1.',
    },
    {
        parameters: {
            ID: "0a:16:05:eb:92:27",
        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.3.',
    },
    {
        parameters: {
            BSSID: "0a:16:05:eb:92:27",
            BackhaulUse: 0,
            BroadcastBytesReceived: 0,
            BroadcastBytesSent: 0,
            ByteCounterUnits: 1,
            Enabled: 1,
            EstServiceParametersBE: 0,
            EstServiceParametersBK: 0,
            EstServiceParametersVI: 0,
            EstServiceParametersVO: 0,
            FronthaulUse: 1,
            IsVBSS: 0,
            LastChange: 222,
            MulticastBytesReceived: 0,
            MulticastBytesSent: 0,
            SSID: "simon_test",
            STANumberOfEntries: 1,
            TimeStamp: "2024-07-22T08:29:18.236089660Z",
            UnicastBytesReceived: 0,
            UnicastBytesSent: 0,

        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.3.BSS.1.',
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
            MACAddress:"00:00:00:00:00:21",
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
            IPV4Address: "7.7.7.7",
            RetransCount: 9196,
            X_SC_LinkQuality: "Good",
        },
        path:"WiFi.DataElements.Network.Device.2.Radio.3.BSS.1.STA.1."
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
            MACAddress:"76:06:35:81:c1:00",
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
            IPV4Address: "5.5.5.5",
            RetransCount: 9196,
            X_SC_LinkQuality: "Bad",
        },
        path:"WiFi.DataElements.Network.Device.2.Radio.3.BSS.1.STA.2."
    },
    {
        parameters: {
            Channel: 2,
        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.3.CurrentOperatingClasses.1.',
    },
    {
        parameters: {
            Channel: 127,
        },
        path: 'WiFi.DataElements.Network.Device.2.Radio.3.CurrentOperatingClasses.2.',
    },
    
]

export { data };