let data = [
    {
        parameters: {
            ID: "76:06:35:81:c1:25",
            ManufacturerModel: "Model Name",
            SerialNumber: "00000001111",
            X_SC_IPV4Address: "1.1.1.1",
            X_SC_Hostname: "Agent Hostname",
        },
        path: 'WiFi.DataElements.Network.Device.1.',
    },    
    {
        parameters: {
            MLDMACAddress: "00:00:00:00:00:44",
        },
        path: 'WiFi.DataElements.Network.Device.1.APMLD.1.'
    },
    {
        parameters: {
            MLDMACAddress: "00:00:00:00:00:44",
        },
        path: 'WiFi.DataElements.Network.Device.1.APMLD.1.STAMLD.1.'
    },
    {
        parameters: {
            MACAddress: "00:00:00:00:00:44",
        },
        path: 'WiFi.DataElements.Network.Device.1.APMLD.1.STAMLD.1.AffiliatedSTA.1.'
    },
    {
        parameters: {
        },
        path: 'WiFi.DataElements.Network.Device.1.MultiAPDevice.',
    },
    {
        parameters: {
            BackhaulDeviceID: "1a:ef:c0:00:07:02",
            LinkType: "Ethernet",
            MACAddress: "",
            X_Speedtest: 10,
        },
        path: 'WiFi.DataElements.Network.Device.1.MultiAPDevice.Backhaul.',
    },
    {
        parameters: {
        },
        path: 'WiFi.DataElements.Network.Device.1.Radio.1.',
    },
    {
        parameters: {
        },
        path: 'WiFi.DataElements.Network.Device.1.Radio.1.BSS.1.',
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
            MACAddress:"00:00:00:00:00:44",
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
            IPV4Address: "12.12.12.12",
            RetransCount: 9196,
            X_SC_LinkQuality: "Good",
        },
        path:"WiFi.DataElements.Network.Device.1.Radio.1.BSS.1.STA.1."
    },
    {
        parameters: {
            Channel: 7,
        },
        path: 'WiFi.DataElements.Network.Device.3.Radio.1.CurrentOperatingClasses.1.',
    },
    {
        parameters: {
            Channel: 127,
        },
        path: 'WiFi.DataElements.Network.Device.3.Radio.1.CurrentOperatingClasses.2.',
    },
]

// let temp = 0;

/*
function simulateBackendChanges() {
    setInterval(() => {
        if (temp === 0) {
            temp = 1;

            data = [
                {
                    parameters: {
                        ID: "76:06:35:81:c1:25",
                        ManufacturerModel: "Model Name",
                        SerialNumber: "00000001111",
                        X_SC_IPV4Address: "1.1.1.1",
                        X_SC_Hostname: "Agent Hostname",
                    },
                    path: 'WiFi.DataElements.Network.Device.1.',
                }, 
                {
                    parameters: {
                    },
                    path: 'WiFi.DataElements.Network.Device.1.MultiAPDevice.',
                },
                {
                    parameters: {
                        BackhaulDeviceID: "1a:ef:c0:00:07:02",
                        LinkType: "Ethernet",
                        MACAddress: "",
                        X_Speedtest: 10,
                    },
                    path: 'WiFi.DataElements.Network.Device.1.MultiAPDevice.Backhaul.',
                },
                {
                    parameters: {
                    },
                    path: 'WiFi.DataElements.Network.Device.1.Radio.1.',
                },
                {
                    parameters: {
                    },
                    path: 'WiFi.DataElements.Network.Device.1.Radio.1.BSS.1.',
                },
                {
                    parameters: {
                        Channel: 7,
                    },
                    path: 'WiFi.DataElements.Network.Device.3.Radio.1.CurrentOperatingClasses.1.',
                },
                {
                    parameters: {
                        Channel: 127,
                    },
                    path: 'WiFi.DataElements.Network.Device.3.Radio.1.CurrentOperatingClasses.2.',
                },
            ]
    
        }else{
            temp = 0;
            data = [
                {
                    parameters: {
                        ID: "76:06:35:81:c1:25",
                        ManufacturerModel: "Model Name",
                        SerialNumber: "00000001111",
                        X_SC_IPV4Address: "1.1.1.1",
                        X_SC_Hostname: "Agent Hostname",
                    },
                    path: 'WiFi.DataElements.Network.Device.1.',
                },    
                {
                    parameters: {
                        MLDMACAddress: "00:00:00:00:00:44",
                    },
                    path: 'WiFi.DataElements.Network.Device.1.APMLD.1.'
                },
                {
                    parameters: {
                        MLDMACAddress: "00:00:00:00:00:44",
                    },
                    path: 'WiFi.DataElements.Network.Device.1.APMLD.1.STAMLD.1.'
                },
                {
                    parameters: {
                        MACAddress: "00:00:00:00:00:44",
                    },
                    path: 'WiFi.DataElements.Network.Device.1.APMLD.1.STAMLD.1.AffiliatedSTA.1.'
                },
                {
                    parameters: {
                    },
                    path: 'WiFi.DataElements.Network.Device.1.MultiAPDevice.',
                },
                {
                    parameters: {
                        BackhaulDeviceID: "1a:ef:c0:00:07:02",
                        LinkType: "Ethernet",
                        MACAddress: "",
                        X_Speedtest: 10,
                    },
                    path: 'WiFi.DataElements.Network.Device.1.MultiAPDevice.Backhaul.',
                },
                {
                    parameters: {
                    },
                    path: 'WiFi.DataElements.Network.Device.1.Radio.1.',
                },
                {
                    parameters: {
                    },
                    path: 'WiFi.DataElements.Network.Device.1.Radio.1.BSS.1.',
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
                        MACAddress:"00:00:00:00:00:44",
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
                        IPV4Address: "12.12.12.12",
                        RetransCount: 9196,
                        X_SC_LinkQuality: "Good",
                    },
                    path:"WiFi.DataElements.Network.Device.1.Radio.1.BSS.1.STA.1."
                },
                {
                    parameters: {
                        Channel: 7,
                    },
                    path: 'WiFi.DataElements.Network.Device.3.Radio.1.CurrentOperatingClasses.1.',
                },
                {
                    parameters: {
                        Channel: 127,
                    },
                    path: 'WiFi.DataElements.Network.Device.3.Radio.1.CurrentOperatingClasses.2.',
                },
            ]
        }
        
    }, 7000); // Repeat every 5 seconds
}

// Start the simulation
simulateBackendChanges();

*/

module.exports = { data };
// module.exports = { data };