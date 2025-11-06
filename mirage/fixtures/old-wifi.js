import { data as ap1 } from './wifi-accesspoint-1';
import { data as ap2 } from './wifi-accesspoint-2';
import { data as radio1 } from './wifi-radio-1';
import { data as radio2 } from './wifi-radio-2';
import { data as ssid1 } from './wifi-ssid-1';
import { data as ssid2 } from './wifi-ssid-2';
import { data as dataelements } from './wifi-dataelements';

let data = [
  
  { parameters: 
    { 
      wps_trigger: 'stop',
      X_SC_SSIDIsolation: false
      
    }, path: 'WiFi.' },
  {
    parameters: { Enable: 1, DelayTime: 1000, BootDelayTime: 4000 },
    path: 'WiFi.AutoCommitMgr.',
  },
  {
    parameters: {
      DefaultPin: '56352290',
      OUI: 'B283C4',
      ModelNumber: '',
      UUID: '69393f3a-6a3b-f73d-fb6c-3e3f69393f3a',
      OsVersion: '4.14.284',
      DevName: '',
      ModelUrl: '',
      ModelDescription: 'OpenWrt 19.07-SNAPSHOT r0-90a5696',
      SerialNumber: 'SNb283c406de78',
      wpsUUIDShared: 0,
      ModelName: 'GL.iNet GL-B1300',
      Manufacturer: 'glinet',
      ManufacturerUrl: 'glinet',
      FriendlyName: 'prplHGW',
      wpsSupVer: 2,
    },
    path: 'WiFi.wps_DefParam.',
  },
  {
    parameters: {
      Enable: true
    },
    path: 'WiFi.X_SC_BandSteering.'
  },
  {
    parameters: {
        MacAddress: 'MacAddressa1',
    },
    path: 'WiFi.X_SC_MultiAP.Steering.MacList.1.',
},

{
    parameters: {
        Name: 'Dominic123',
    },
    path: 'WiFi.X_SC_MultiAP.',
},
{
    parameters: {
        Name: 'MacAddress',
        Active: true,
        AssociatedMACAdress: '08:sdadas:05:eb:91:21',
        MACAddress: 'f4:09:d8:e2:4b:5c',
        IPV4Address: '123',
    },
    path: 'WiFi.X_SC_MultiAP.Devices.1.',
},
{
  parameters: {
      Name: 'Dompogi',
      Active: true,
      AssociatedMACAdress: '012:sdadasas:05:eb:91:21',
      MACAddress: 'f4:09:d8:e2:4b:5c',
      IPAddress: '12323',
  },
  path: 'WiFi.X_SC_MultiAP.Devices.2.',
},
{
    parameters: {
        Name: 'MacAddress',
        Active: true,
        SoftwareVersion: '1.0.0',
        MACAddress: 'f4:09:d8:e2:4b:5c',
        IPAddress: '123',
    },
    path: 'WiFi.X_SC_MultiAP.Nodes.1.',
},
{
  parameters: {
      Name: 'domski',
      Active: true,
      SoftwareVersion: '2.0.0',
      MACAddress: 'f4:09:d8:e2:4b:5c',
      IPAddress: '223',
  },
  path: 'WiFi.X_SC_MultiAP.Nodes.2.',
},
{
  parameters: {
      MacAddress: 'MaasdcAddressa1',
  },
  path: 'WiFi.X_SC_MultiAP.Steering.MacList.2.',
},
{
  parameters: {
    Enable: 1,
    FilterAsBlackList: 0,
  },
  path: 'WiFi.X_SC_MACFilter.',
},
{
  parameters: {
    DeviceName: 'Device 1',
    MACAddress: 'AA:BB:CC:DD:EE:FF',
  },
  path: 'WiFi.X_SC_MacFilterTable.1.',
},
{
  parameters: {
    DeviceName: 'DeviceName2',
    MACAddress: '11:22:33:44:55:66',
  },
  path: 'WiFi.X_SC_MacFilterTable.2.',
},
{
  parameters: {
    DeviceName: 'DeviceName3',
    MACAddress: '69:69:69:69:69:69',
  },
  path: 'WiFi.X_SC_MacFilterTable.3.',
}

];

dataelements.forEach((entry) => {
  data.push(entry);
});

ap1.forEach((entry) => {
  data.push(entry);
});

ap2.forEach((entry) => {
  data.push(entry);
});

radio1.forEach((entry) => {
  data.push(entry);
});

radio2.forEach((entry) => {
  data.push(entry);
});

ssid1.forEach((entry) => {
  data.push(entry);
});

ssid2.forEach((entry) => {
  data.push(entry);
});

function simulateBackendChanges() {
  setInterval(() => {
    data = [
  
      { parameters: { wps_trigger: 'stop'}, path: 'WiFi.' },
      {
        parameters: { Enable: 1, DelayTime: 1000, BootDelayTime: 4000 },
        path: 'WiFi.AutoCommitMgr.',
      },
      {
        parameters: {
          DefaultPin: '56352290',
          OUI: 'B283C4',
          ModelNumber: '',
          UUID: '69393f3a-6a3b-f73d-fb6c-3e3f69393f3a',
          OsVersion: '4.14.284',
          DevName: '',
          ModelUrl: '',
          ModelDescription: 'OpenWrt 19.07-SNAPSHOT r0-90a5696',
          SerialNumber: 'SNb283c406de78',
          wpsUUIDShared: 0,
          ModelName: 'GL.iNet GL-B1300',
          Manufacturer: 'glinet',
          ManufacturerUrl: 'glinet',
          FriendlyName: 'prplHGW',
          wpsSupVer: 2,
        },
        path: 'WiFi.wps_DefParam.',
      },
      
      {
        parameters: {
            MacAddress: 'MacAddressa1',
        },
        path: 'WiFi.X_SC_MultiAP.Steering.MacList.1.',
    },

    {
      parameters: {
        Enable: true
      },
      path: 'WiFi.X_SC_BandSteering.'
    },
    
    {
        parameters: {
            Name: 'Dominic123',
        },
        path: 'WiFi.X_SC_MultiAP.',
    },
    {
        parameters: {
            Name: 'MacAddress',
            Active: true,
            AssociatedMACAdress: '08:sdadas:05:eb:91:21',
            MACAddress: 'f4:09:d8:e2:4b:5c',
            IPV4Address: '123',
        },
        path: 'WiFi.X_SC_MultiAP.Devices.1.',
    },
    {
      parameters: {
          Name: 'Dompogi',
          Active: true,
          AssociatedMACAdress: '012:sdadasas:05:eb:91:21',
          MACAddress: 'f4:09:d8:e2:4b:5c',
          IPAddress: '12323',
      },
      path: 'WiFi.X_SC_MultiAP.Devices.2.',
    },
    {
        parameters: {
            Name: 'MacAddress',
            Active: true,
            SoftwareVersion: '1.0.0',
            MACAddress: 'f4:09:d8:e2:4b:5c',
            IPAddress: '123',
        },
        path: 'WiFi.X_SC_MultiAP.Nodes.1.',
    },
    {
      parameters: {
          Name: 'domski',
          Active: true,
          SoftwareVersion: '2.0.0',
          MACAddress: 'f4:09:d8:e2:4b:5c',
          IPAddress: '223',
      },
      path: 'WiFi.X_SC_MultiAP.Nodes.2.',
    },
    {
      parameters: {
          MacAddress: 'MaasdcAddressa1',
      },
      path: 'WiFi.X_SC_MultiAP.Steering.MacList.2.',
    },
    
    ];
    
    dataelements.forEach((entry) => {
      data.push(entry);
    });
    
    ap1.forEach((entry) => {
      data.push(entry);
    });
    
    ap2.forEach((entry) => {
      data.push(entry);
    });
    
    radio1.forEach((entry) => {
      data.push(entry);
    });
    
    radio2.forEach((entry) => {
      data.push(entry);
    });
    
    ssid1.forEach((entry) => {
      data.push(entry);
    });
    
    ssid2.forEach((entry) => {
      data.push(entry);
    });
  }, 7000); // Repeat every 5 seconds
}

// Start the simulation
simulateBackendChanges();

export { data };
