export const data = [

    {
        parameters: {
            ANINumberOfEntries: 1,
            Enable: 13,
            EquipmentID: 12250,	
            EthernetUNINumberOfEntries:	1,
            Name: "PrplOS_GUI",
            SoftwareImageNumberOfEntries: 1,
            Version: 1.13
        },
        path: 'XPON.ONU.1.'
    },
    {
        parameters: {
            ID: 123,
            IsActive: 1,
            IsCommitted: "It's Complicated",	
            IsValid:"No",
            Version: 2.0,
        },
        path: 'XPON.ONU.1.SoftwareImage.1.'
    },
    {
        parameters: {
            ANIs: 12345,
            Alias: "Tanggol",
            Enable: 1,	
            InterdomainID:69,
            InterdomainName: "DOm",
            LastChange: "2021-06-01",
            LowerLayers: "XPON.ONU.1.ANI.1.TC",
            Name: "Tanggol",
            Status: "Active",

        },
        path: 'XPON.ONU.1.EthernetUNI.1.'
    },
    {
        parameters: {
            Alias: "ANI alias",	
            Enable: 12,	
            LastChange: "",	
            Name: "ANI",
            PONMode: "",	
            Status: "",	
            TransceiverNumberOfEntries: 1
        },
        path: 'XPON.ONU.1.ANI.1.'
    },
    {
        parameters: { },
        path: 'XPON.ONU.1.ANI.1.TC.'
    },
    {
        parameters: {
            DACT: "",	
            DIS: "",	
            LCDG: "",		
            LODS: "",		
            LOF: "",		
            LOS: "",		
            MEM: "",		
            MIS: "",	
            PEE: "",	
            RDI: "",		
            ROGUE: "",		
            SD: "",		
            SF: "",		
            SUF: "",		
            TF: ""
        },
        path: 'XPON.ONU.1.ANI.1.TC.Alarms.'
    },
    {
        parameters: {
            HexadecimalPassword: "",
            Password: "12345"	
        },
        path: 'XPON.ONU.1.ANI.1.TC.Authentication.'
    },
    {
        parameters: { PortNumberOfEntries: 1 },
        path: 'XPON.ONU.1.ANI.1.TC.GEM.'
    },
    {
        parameters: {
            Direction: "UNI-to-ANI",	
            PortID: 69,	
            PortType: "Physical",
            GemTcontID: 1,
        },
        path: 'XPON.ONU.1.ANI.1.TC.GEM.Port.1.'
    },
    {
        parameters: {
            FramesSent:123,
            FramesReceived:129,
            TxBytes: 100,
            DiscardPacketsReceived: 5,
            RxBytes: 100
        },
        path: 'XPON.ONU.1.ANI.1.TC.GEM.Port.1.PM.'
    },
    {
        parameters: {
            ONUID: "",
            ONUState: "O1",
            SerialNumber: "SRCM123434",	
            VendorID: ""
        },
        path: 'XPON.ONU.1.ANI.1.TC.ONUActivation.'
    },
    {
        parameters: {},
        path: 'XPON.ONU.1.ANI.1.TC.PM.'
    },
    {
        parameters: {	
            FrameHeaderHECErrors: 56,		
            FramesReceived: 1023,		
            FramesSent: 1002,		
            KeyErrors: 58		
        },
        path: 'XPON.ONU.1.ANI.1.TC.PM.GEM.'
    },
    {
        parameters: {
            BaselineMessagesReceived: 15,		
            ExtendedMessagesReceived: 25,		
            MICErrors: "",
            TxFrames: 420,
            RxFrames: 12250
        },
        path: 'XPON.ONU.1.ANI.1.TC.PM.OMCI.'
    },

   
    {
        parameters: {
            CorrectedFECBytes: "",		
            CorrectedFECCodewords: "",		
            HeaderHECErrorCount: "",		
            PSBdHECErrorCount: "",		
            TotalFECCodewords: "",		
            UncorrectableFECCodewords: "",		
            UnknownProfile: ""
        },
        path: 'XPON.ONU.1.ANI.1.TC.PM.PHY.'
    },
    {
        parameters: {
            DownstreamMessageCount: "",	
            MICErrors: "",	
            RangingTime: "",
            UpstreamMessageCount: ""
        },
        path: 'XPON.ONU.1.ANI.1.TC.PM.PLOAM.'
    },
    {
        parameters: {
            SignalDegrade: "",	
            SignalFail: ""
        },
        path: 'XPON.ONU.1.ANI.1.TC.PerformanceThresholds'
    },
    {
        parameters: {
            TxFrames: 69,
            RxFrames: 420
        },
        path:'XPON.ONU.1.ANI.1.TC.Omci.'
    },
    {
        parameters: {
            PacketsSent: 12250,
            DiscardPacketsSent: 69,
            PacketsReceived: 177013,
            DiscardPacketsReceived: 420,
            ErrorsReceived: 69
        },
        path: 'XPON.ONU.1.ANI.1.Stats.'
    },
    {
        parameters: {
            ID: 1,
            AllocID: 2,
            TxGemFrames: 69
        },
        path: 'XPON.ONU.1.ANI.1.TC.Tcont.1.'
    },
    {
        parameters: {
            ID: 3,
            AllocID: 4,
            TxGemFrames: 420
        },
        path: 'XPON.ONU.1.ANI.1.TC.Tcont.2.'
    },
    {
        parameters: {
            Bias: "123",	
            Connector: "",	
            ID: "SERCOMM_B+_G",
            Identifier: "",		
            NominalBitRateDownstream: "",		
            NominalBitRateUpstream: "",		
            PONMode: "",		
            RxPower: -100,	
            Temperature: 23,
            TxPower: 1,
            VendorName: "SERCOMM_B+_5G",
            VendorPartNumber: "",		
            VendorRevision: "",	
            Voltage: 328,
        },
        path: 'XPON.ONU.1.ANI.1.Transceiver.1.'
    }

    
    /*,
    {
        parameters: {
            ANIs: "",		
            Alias: "Test Alias",		
            Enable: "",	
            InterdomainID: "",		
            InterdomainName: "",		
            LastChange: "",
            LowerLayers: "",	
            Name: "",
            Status: "",
        },
        path: 'XPON.ONU.1.EthernetUNI.1.'
    },
    {
        parameters: {
            ID: 69,		
            IsActive: "",		
            IsCommitted: "",		
            IsValid: "",		
            Version: ""
        },
        path: 'XPON.ONU.1.SoftwareImage.1.'
    },
    {
        parameters: {
            ID: 420,		
            IsActive: "",		
            IsCommitted: "",		
            IsValid: "",		
            Version: ""
        },
        path: 'XPON.ONU.1.SoftwareImage.2'
    }*/
];