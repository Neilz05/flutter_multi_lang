function generateCallLogEntry(id) {
    const extensions = ['7015', '7021', '7022', '7023', '7024'];
    const externalNumbers = ['5551234', '5559876', '5551111', '911', '5557890', '5552468'];
    const calledNumbers = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008'];
    const callingNumbers = ['3001', '3002', '3003', '3004', '3005', '3006', '3007', '3008'];
    const directions = ['Incoming', 'Outgoing'];
    const terminationCauses = ['7015', '7021', '7022', '8001', '8002'];

    // Generate random values based on id for consistency
    const random = (seed, max) => Math.floor((seed * 9301 + 49297) % 233280 / 233280 * max);

    const extension = extensions[random(id, extensions.length)];
    const direction = directions[random(id * 2, directions.length)];
    const externalNumber = externalNumbers[random(id * 3, externalNumbers.length)];
    const calledNumber = calledNumbers[random(id * 4, calledNumbers.length)];
    const callingNumber = callingNumbers[random(id * 5, callingNumbers.length)];
    const duration = direction === 'Incoming' && random(id * 6, 3) === 0 ? "0" : String(random(id * 7, 300) + 1);
    const terminationCause = terminationCauses[random(id * 8, terminationCauses.length)];

    // Generate timestamp (last 7 days)
    const now = new Date();
    const pastDays = random(id * 7, 7);
    const pastHours = random(id * 8, 24);
    const pastMinutes = random(id * 9, 60);
    const pastSeconds = random(id * 10, 60);

    const timestamp = new Date(now);
    timestamp.setDate(now.getDate() - pastDays);
    timestamp.setHours(pastHours, pastMinutes, pastSeconds, 0);

    const timeString = timestamp.toISOString();
    const timeOnly = timeString.substring(11, 16); // HH:MM format

    return {
        parameters: {
            "Alias": `calllog${id}`,
            "CallTerminationCause": terminationCause,
            "CalledPartyNumber": calledNumber,
            "CallingPartyNumber": callingNumber,
            "Destination": `10.28.${35 + random(id * 11, 10)}.${80 + random(id * 12, 20)}`,
            "Direction": direction,
            "Duration": duration,
            "RemoteParty": String(10006 + random(id * 13, 20)),
            "SessionNumberOfEntries": 0,
            "SignalingPerformanceNumberOfEntries": 0,
            "Source": direction === 'Outgoing' ? extension : "Unknown",
            "Start": timeString,
            "UsedExtensions": extension,
            "UsedLine": direction === 'Incoming' ? extension : externalNumber.length === 4 ? externalNumber : extension,
            "X_PRPLWARE-COM_Active": "0",
            "X_PRPLWARE-COM_Date": "0",
            "X_PRPLWARE-COM_Time": timeOnly
        },
        path: `Device.Services.VoiceService.1.CallLog.${id}.`
    };
}
const data = Array.from({ length: 100 }, (_, i) => generateCallLogEntry(i + 1))
    .sort((a, b) => new Date(a.parameters.Start) - new Date(b.parameters.Start))
    .map((entry, index) => ({
        ...entry,
        parameters: {
            ...entry.parameters,
            "Alias": `calllog${index + 1}`
        },
        path: `Device.Services.VoiceService.1.CallLog.${index + 1}.`
    }));

//    module.exports = { data };
module.exports = { data };