const data = [
  { 
    parameters: {
        Alias: 'wan',
        LowerLayers: 'Device.IP.Interface.1????.'
    },
    path: 'Logical.Interface.1.',
  },
  { 
    parameters: {
        Alias: "lan",
        LowerLayers: "Device.IP.Interface.2."
    },
    path: 'Logical.Interface.2.',
  },
  { 
    parameters: {
        Alias: "guest",
        LowerLayers: "Device.IP.Interface.3."
    },
    path: 'Logical.Interface.3.',
  },
];

module.exports = { data };