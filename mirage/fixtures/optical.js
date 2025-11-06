const data = [
{
    parameters: { },
    path: "Device.Optical."
},
{
    parameters: {
      OperState: "Stateless",
      OpticalSignalLevel: 1,
      TransmitOpticalLevel: 2,
    },
    path: "Device.Optical.Interface.1."
},
{
    parameters: {
        PacketsSent: 38,
        DiscardPacketsSent: 690340,
        PacketsReceived: 2,
        ErrorsReceived: 11,
        DiscardPacketsReceived: 121,
    },
    path: "Device.Optical.Interface.1.Stats."
},
];

module.exports = { data };
