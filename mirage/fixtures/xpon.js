import { data as onu1 } from './xpon-onu-1';

const data = [
    {
        parameters: { ONUNumberOfEntries: 1 },
        path: 'XPON.'
    }
];

onu1.forEach((entry) => {
    data.push(entry);
});

export { data };