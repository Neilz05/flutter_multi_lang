let data = [
  {
    parameters: { Enable: 1 },
    path: 'Some.',
  },
  {
    parameters: {
      Enable: 1,
    },
    path: 'Some.Relay.',
  },
  {
    parameters: {
      DNSServer: '69.69.69.69'
    },
    path: 'Some.Relay.Forwarding.dhcpv4-1.',
  },
  {
    parameters: {
      DNSServer: '69.69.69.70'
    },
    path: 'Some.Relay.Forwarding.dhcpv4-2.',
  },
];

module.exports = { data };