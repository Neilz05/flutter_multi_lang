function generateBlockingRules() {
    // Sample phone numbers for blocking rules
    const incomingNumbers = ['0919', '0800', '1234', '5678', '0900', '0901', '0902', '0903'];
    const outgoingNumbers = ['6771', '1900', '9900', '0800', '0900', '1234', '5555', '7777'];
    
    // Generate random function for consistency
    const random = (seed, max) => Math.floor((seed * 9301 + 49297) % 233280 / 233280 * max);
    
    // Determine number of rules (between 1-5 for each type)
    const incomingRulesCount = 10;
    const outgoingRulesCount = 10;
    
    const data = [];
    
    // Base blocking configuration
    data.push({
        "parameters": {},
        "path": "Device.Services.VoiceService.1.CallControl.X_PRPLWARE-COM_NumberBlocking."
    });
    
    // Incoming blocking configuration
    data.push({
        "parameters": {
            "Enable": 1, // 0 or 1
            "RulesNumberOfEntries": incomingRulesCount
        },
        "path": "Device.Services.VoiceService.1.CallControl.X_PRPLWARE-COM_NumberBlocking.IncomingBlocking."
    });
    
    // Generate incomin g blocking rules
    for (let i = 1; i <= incomingRulesCount; i++) {
        const numberIndex = random(i * 4, incomingNumbers.length);
        data.push({
            "parameters": {
                "Number": incomingNumbers[numberIndex]
            },
            "path": `Device.Services.VoiceService.1.CallControl.X_PRPLWARE-COM_NumberBlocking.IncomingBlocking.Rules.${i}.`
        });
    }
    
    // Outgoing blocking configuration
    data.push({
        "parameters": {
            "Enable": 1, // 0 or 1
            "ForeignNumberBlockEnable": 1, // 0 or 1
            "SpecialRateNumberBlockEnable": 1, // 0 or 1
            "RulesNumberOfEntries": outgoingRulesCount
        },
        "path": "Device.Services.VoiceService.1.CallControl.X_PRPLWARE-COM_NumberBlocking.OutgoingBlocking."
    });
    
    // Generate outgoing blocking rules
    for (let i = 1; i <= outgoingRulesCount; i++) {
        const numberIndex = random(i * 8, outgoingNumbers.length);
        data.push({
            "parameters": {
                "Number": outgoingNumbers[numberIndex]
            },
            "path": `Device.Services.VoiceService.1.CallControl.X_PRPLWARE-COM_NumberBlocking.OutgoingBlocking.Rules.${i}.`
        });
    }
    
    return data;
}

export const data = generateBlockingRules();