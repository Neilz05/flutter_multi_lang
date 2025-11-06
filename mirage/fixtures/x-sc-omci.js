const data = [
  { 
    parameters: { }, 
    path: "Device.X_SC_Omci.",
  },
  {
      parameters: {
          GemPortId: 28,
          GemDir: 68,
          GemType: 1,
          GemTcontID: 100,
      },
      path: "Device.X_SC_Omci.Gem.1."
  },
  {
      parameters: {
          GemTxFrames: 48,
          GemTxBytes: 2,
          GemRxFrames: 28932042,
          GemRxBytes: 8,
          GemRxDisFrames: 3,
      },
      path: "Device.X_SC_Omci.Gem.1.Stats"
  },
  {
      parameters: {
          GemPortId: 38,
          GemDir: 69,
          GemType: 2,
          GemTcontID: 101,
      },
      path: "Device.X_SC_Omci.Gem.2."
  },
  {
      parameters: {
          ID: 18,
          AllocID: 9,
          TxGemFrames: 2,
      },
      path: "Device.X_SC_Omci.Tcont.1."
  },
  {
      parameters: {
          OmciTxFrames: 120311,
          OmciRxFrames: 589195,
      },
      path: "Device.X_SC_Omci.Stats."
  },
];

export { data };
