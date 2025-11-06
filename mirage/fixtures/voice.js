// import { data as voiceservice} from './voice-voiceservice';
// import { data as capabilities} from './voice-voiceservice-capabilities';
// import { data as line1} from './voice-voiceservice-callcontrol-line1';
// import { data as line2} from './voice-voiceservice-callcontrol-line2';
// import { data as calllog } from './calllog'
// import {data as ring_sched} from './ring-schedule'
const { data : voiceservice} = require('./voice-voiceservice');
const { data : capabilities} = require('./voice-voiceservice-capabilities');
const { data : line1} = require('./voice-voiceservice-callcontrol-line1');
const { data : line2} = require('./voice-voiceservice-callcontrol-line2');
const { data : calllog } = require('./calllog')
const {data : ring_sched} = require('./ring-schedule')

let data = [
    { parameters: {}, path: 'Device.Services.' },
];

voiceservice.forEach((entry) => {
    data.push(entry);
});
capabilities.forEach((entry) => {
    data.push(entry);
});
line1.forEach((entry) => {
    data.push(entry);
});
line2.forEach((entry) => {
    data.push(entry);
});

calllog.forEach((entry) => {
    data.push(entry);
})

ring_sched.forEach((entry) => {
    data.push(entry);
});

module.exports = { data };
// module.exports = { data };