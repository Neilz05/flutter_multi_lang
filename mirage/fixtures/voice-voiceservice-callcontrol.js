let data = [
    
    { parameters: {}, path: "Device.Services.VoiceService.1.CallControl." },
    { 
        parameters: {
            // DirectoryNumber: "42069",
            CallStatus: "Connected",
            Status: "OFF",
        }, 
        path: "Device.Services.VoiceService.1.CallControl.Line.1." 
    },
    { 
        parameters: {
            // DirectoryNumber: "4",
            CallStatus: "Dialing",
            Status: "Up",
        }, 
        path: "Device.Services.VoiceService.1.CallControl.Line.2." 
    },
    { 
        parameters: {
            // DirectoryNumber: "5",
            CallStatus: "Delivered",
            Status: "OFF",
        }, 
        path: "Device.Services.VoiceService.1.CallControl.Line.3." 
    },
    // { 
    //     parameters: {
    //         // DirectoryNumber: "6",
    //         CallStatus: "Off hook",
    //         Status: "ON",
    //     }, 
    //     path: "Device.Services.VoiceService.1.CallControl.Line.4." 
    // },
    // { 
    //     parameters: {
    //         // DirectoryNumber: "7",
    //         CallStatus: "On hook",
    //         Status: "OFF",
    //     }, 
    //     path: "Device.Services.VoiceService.1.CallControl.Line.5." 
    // },
    // { 
    //     parameters: {
    //         // DirectoryNumber: "8",
    //         CallStatus: "On hook",
    //         Status: "ON",
    //     }, 
    //     path: "Device.Services.VoiceService.1.CallControl.Line.6." 
    // },
    // { 
    //     parameters: {
    //         // DirectoryNumber: "9",
    //         CallStatus: "On hook",
    //         Status: "OFF",
    //     }, 
    //     path: "Device.Services.VoiceService.1.CallControl.Line.7." 
    // },
    // { 
    //     parameters: {
    //         // DirectoryNumber: "10",
    //         CallStatus: "Off hook",
    //         Status: "ON",
    //     }, 
    //     path: "Device.Services.VoiceService.1.CallControl.Line.8." 
    // },
    // { 
    //     parameters: {
    //         // DirectoryNumber: "10",
    //         AuthUserName:"09123",
    //         Enable:"1",
    //         RegisterURI:"Abc",
    //         AuthPassword:"abc123",
    //     }, 
    //     path: "Device.Services.VoiceService.1.SIP.Client.1." 
    // },
];

module.exports = { data };