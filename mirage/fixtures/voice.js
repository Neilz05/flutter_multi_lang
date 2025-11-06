import { data as voiceservice} from './voice-voiceservice';
import { data as capabilities} from './voice-voiceservice-capabilities';
import { data as line1} from './voice-voiceservice-callcontrol-line1';
import { data as line2} from './voice-voiceservice-callcontrol-line2';
import { data as calllog } from './calllog'
import {data as ring_sched} from './ring-schedule'

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

export { data };