const data = [
  {
    parameters: {
      AccessPolicy: "Allow",
      ScheduleNumberOfEntries: 2,
      Enable: 1,
      ScheduleRef: "",
      HostName: "host-01",
      Alias: "alias",
      Origin: "User",
      PhysAddressMask: "FF:FF:FF:FF:FF:FF",
      PhysAddress: "AA:AA:AA:AA:AA:AA"
    },
    path: "Device.Hosts.AccessControl.1."
  },
  {
    parameters:{
      Enable: 1,
    },
    path: "Device.Hosts.AccessControl.2.X_PRPLWARE-COM_URLFilter."
  },
  {
    parameters: {
      URL: "www.site2.com",
    },
    path: "Device.Hosts.AccessControl.2.X_PRPLWARE-COM_URLFilter.URLs.1."
  },
  {
    parameters: {
      URL: "www.site2-alt.com",
    },
    path: "Device.Hosts.AccessControl.2.X_PRPLWARE-COM_URLFilter.URLs.2."
  },
  {
    parameters: {
      URL: "www.site2-extra.com",
    },
    path: "Device.Hosts.AccessControl.2.X_PRPLWARE-COM_URLFilter.URLs.3."
  },
  {
    parameters: {
      Enable: 1,
    },
    path: "Device.Hosts.AccessControl.2.X_PRPLWARE-COM_ApplicationFilter."
  },
  {
    parameters: {
      Name: "AppTwo",
      Protocol: "udp",
      Port: "53",
    },
    path: "Device.Hosts.AccessControl.2.X_PRPLWARE-COM_ApplicationFilter.Applications.1."
  },
  {
    parameters: {
      Name: "AppTwoAlt",
      Protocol: "tcp",
      Port: "8080",
    },
    path: "Device.Hosts.AccessControl.2.X_PRPLWARE-COM_ApplicationFilter.Applications.2."
  },
  {
    parameters: {
      Name: "AppTwoExtra",
      Protocol: "udp",
      Port: "67",
    },
    path: "Device.Hosts.AccessControl.2.X_PRPLWARE-COM_ApplicationFilter.Applications.3."
  },
  {
    parameters: {
      Enable: 1,
      StartTime: "08:30",
      Duration: 3600,
      Alias: "cpe-Schedule-1",
      Day: "Saturday,Sunday"
    },
    path: "Device.Hosts.AccessControl.1.Schedule.1."
  },
  {
    parameters: {
      Enable: 1,
      StartTime: "14:45",
      Duration: 7200,
      Alias: "cpe-Schedule-2",
      Day: "Monday,Wednesday,Friday"
    },
    path: "Device.Hosts.AccessControl.1.Schedule.2."
  },
  {
    parameters:{
      Enable: 1,
    },
    path: "Device.Hosts.AccessControl.1.X_PRPLWARE-COM_URLFilter."
  },
  {
    parameters: {
      URL: "www.example.com",
    },
    path: "Device.Hosts.AccessControl.1.X_PRPLWARE-COM_URLFilter.URLs.1."
  },
  {
    parameters: {
      URL: "www.testsite.com",
    },
    path: "Device.Hosts.AccessControl.1.X_PRPLWARE-COM_URLFilter.URLs.2."
  },
  {
    parameters: {
      URL: "www.anotherdomain.com",
    },
    path: "Device.Hosts.AccessControl.1.X_PRPLWARE-COM_URLFilter.URLs.3."
  },
  {
    parameters: {
      Enable: 1,
    },
    path: "Device.Hosts.AccessControl.1.X_PRPLWARE-COM_ApplicationFilter."
  },
  {
    parameters: {
      Name: "ExampleApp",
      Protocol: "tcp",
      Port: "80",
    },
    path: "Device.Hosts.AccessControl.1.X_PRPLWARE-COM_ApplicationFilter.Applications.1."
  },
  {
    parameters: {
      Name: "TestApp",
      Protocol: "udp",
      Port: "53",
    },
    path: "Device.Hosts.AccessControl.1.X_PRPLWARE-COM_ApplicationFilter.Applications.2."
  },
  {
    parameters: {
      Name: "AnotherApp",
      Protocol: "tcp",
      Port: "443",
    },
    path: "Device.Hosts.AccessControl.1.X_PRPLWARE-COM_ApplicationFilter.Applications.3."
  },
  {
    parameters: {
      AccessPolicy: "Deny",
      ScheduleNumberOfEntries: 1,
      Enable: 1,
      ScheduleRef: "",
      HostName: "host-02",
      Alias: "cpe-AccessControl-34",
      Origin: "User",
      PhysAddressMask: "FF:FF:FF:FF:FF:FF",
      PhysAddress: "9F:23:77:AB:41:02"
    },
    path: "Device.Hosts.AccessControl.2."
  },
  {
    parameters: {
      Enable: 1,
      StartTime: "10:00",
      Duration: 5400,
      Alias: "cpe-Schedule-3",
      Day: "Saturday,Sunday"
    },
    path: "Device.Hosts.AccessControl.2.Schedule.1."
  },
  {
    parameters: {
      AccessPolicy: "Allow",
      ScheduleNumberOfEntries: 3,
      Enable: 0,
      ScheduleRef: "",
      HostName: "host-03",
      Alias: "cpe-AccessControl-57",
      Origin: "User",
      PhysAddressMask: "FF:FF:FF:FF:FF:FF",
      PhysAddress: "23:5B:99:08:4C:EF"
    },
    path: "Device.Hosts.AccessControl.3."
  },
  {
    parameters:{
      Enable: 1,
    },
    path: "Device.Hosts.AccessControl.3.X_PRPLWARE-COM_URLFilter."
  },
  {
    parameters: {
      URL: "www.site3.com",
    },
    path: "Device.Hosts.AccessControl.3.X_PRPLWARE-COM_URLFilter.URLs.1."
  },
  {
    parameters: {
      URL: "www.site3-alt.com",
    },
    path: "Device.Hosts.AccessControl.3.X_PRPLWARE-COM_URLFilter.URLs.2."
  },
  {
    parameters: {
      URL: "www.site3-extra.com",
    },
    path: "Device.Hosts.AccessControl.3.X_PRPLWARE-COM_URLFilter.URLs.3."
  },
  {
    parameters: {
      Enable: 1,
    },
    path: "Device.Hosts.AccessControl.3.X_PRPLWARE-COM_ApplicationFilter."
  },
  {
    parameters: {
      Name: "AppThree",
      Protocol: "tcp",
      Port: 443,
    },
    path: "Device.Hosts.AccessControl.3.X_PRPLWARE-COM_ApplicationFilter.Applications.1."
  },
  {
    parameters: {
      Name: "AppThreeAlt",
      Protocol: "udp",
      Port: "500",
    },
    path: "Device.Hosts.AccessControl.3.X_PRPLWARE-COM_ApplicationFilter.Applications.2."
  },
  {
    parameters: {
      Name: "AppThreeExtra",
      Protocol: "tcp",
      Port: "25",
    },
    path: "Device.Hosts.AccessControl.3.X_PRPLWARE-COM_ApplicationFilter.Applications.3."
  },
  {
    parameters: {
      Enable: 1,
      StartTime: "06:15",
      Duration: 18000,
      Alias: "cpe-Schedule-4",
      Day: "Monday,Tuesday,Wednesday,Thursday,Friday"
    },
    path: "Device.Hosts.AccessControl.3.Schedule.1."
  },
  {
    parameters: {
      Enable: 0,
      StartTime: "19:30",
      Duration: 3600,
      Alias: "cpe-Schedule-5",
      Day: "Sunday"
    },
    path: "Device.Hosts.AccessControl.3.Schedule.2."
  },
  {
    parameters: {
      Enable: 1,
      StartTime: "12:00",
      Duration: 7200,
      Alias: "cpe-Schedule-6",
      Day: "Tuesday,Thursday"
    },
    path: "Device.Hosts.AccessControl.3.Schedule.3."
  },
  {
    parameters: {
      AccessPolicy: "Deny",
      ScheduleNumberOfEntries: 1,
      Enable: 1,
      ScheduleRef: "",
      HostName: "host-04",
      Alias: "cpe-AccessControl-78",
      Origin: "User",
      PhysAddressMask: "FF:FF:FF:FF:FF:FF",
      PhysAddress: "B7:89:44:AA:31:9C"
    },
    path: "Device.Hosts.AccessControl.4."
  },
  {
    parameters:{
      Enable: 1,
    },
    path: "Device.Hosts.AccessControl.4.X_PRPLWARE-COM_URLFilter."
  },
  {
    parameters: {
      URL: "www.site4.com",
    },
    path: "Device.Hosts.AccessControl.4.X_PRPLWARE-COM_URLFilter.URLs.1."
  },
  {
    parameters: {
      URL: "www.site4-alt.com",
    },
    path: "Device.Hosts.AccessControl.4.X_PRPLWARE-COM_URLFilter.URLs.2."
  },
  {
    parameters: {
      URL: "www.site4-extra.com",
    },
    path: "Device.Hosts.AccessControl.4.X_PRPLWARE-COM_URLFilter.URLs.3."
  },
  {
    parameters: {
      Enable: 1,
    },
    path: "Device.Hosts.AccessControl.4.X_PRPLWARE-COM_ApplicationFilter."
  },
  {
    parameters: {
      Name: "AppFour",
      Protocol: "tcp",
      Port: "22",
    },
    path: "Device.Hosts.AccessControl.4.X_PRPLWARE-COM_ApplicationFilter.Applications.1."
  },
  {
    parameters: {
      Name: "AppFourAlt",
      Protocol: "udp",
      Port: "161",
    },
    path: "Device.Hosts.AccessControl.4.X_PRPLWARE-COM_ApplicationFilter.Applications.2."
  },
  {
    parameters: {
      Name: "AppFourExtra",
      Protocol: "tcp",
      Port: "110",
    },
    path: "Device.Hosts.AccessControl.4.X_PRPLWARE-COM_ApplicationFilter.Applications.3."
  },
  {
    parameters: {
      Enable: 1,
      StartTime: "16:00",
      Duration: 21600,
      Alias: "cpe-Schedule-7",
      Day: "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday"
    },
    path: "Device.Hosts.AccessControl.4.Schedule.1."
  },
  {
    parameters: {
      AccessPolicy: "Allow",
      ScheduleNumberOfEntries: 1,
      Enable: 1,
      ScheduleRef: "",
      HostName: "host-05",
      Alias: "cpe-AccessControl-90",
      Origin: "User",
      PhysAddressMask: "FF:FF:FF:FF:FF:FF",
      PhysAddress: "65:AC:09:71:DD:FE"
    },
    path: "Device.Hosts.AccessControl.5."
  },
  {
    parameters:{
      Enable: 1,
    },
    path: "Device.Hosts.AccessControl.5.X_PRPLWARE-COM_URLFilter."
  },
  {
    parameters: {
      URL: "www.site5.com",
    },
    path: "Device.Hosts.AccessControl.5.X_PRPLWARE-COM_URLFilter.URLs.1."
  },
  {
    parameters: {
      URL: "www.site5-alt.com",
    },
    path: "Device.Hosts.AccessControl.5.X_PRPLWARE-COM_URLFilter.URLs.2."
  },
  {
    parameters: {
      URL: "www.site5-extra.com",
    },
    path: "Device.Hosts.AccessControl.5.X_PRPLWARE-COM_URLFilter.URLs.3."
  },
  {
    parameters: {
      Enable: 1,
    },
    path: "Device.Hosts.AccessControl.5.X_PRPLWARE-COM_ApplicationFilter."
  },
  {
    parameters: {
      Name: "AppFive",
      Protocol: "udp",
      Port: "123",
    },
    path: "Device.Hosts.AccessControl.5.X_PRPLWARE-COM_ApplicationFilter.Applications.1."
  },
  {
    parameters: {
      Name: "AppFiveAlt",
      Protocol: "tcp",
      Port: "993",
    },
    path: "Device.Hosts.AccessControl.5.X_PRPLWARE-COM_ApplicationFilter.Applications.2."
  },
  {
    parameters: {
      Name: "AppFiveExtra",
      Protocol: "udp",
      Port: "69",
    },
    path: "Device.Hosts.AccessControl.5.X_PRPLWARE-COM_ApplicationFilter.Applications.3."
  },
  {
    parameters: {
      Enable: 1,
      StartTime: "23:15",
      Duration: 14400,
      Alias: "cpe-Schedule-8",
      Day: "Saturday,Sunday"
    },
    path: "Device.Hosts.AccessControl.5.Schedule.1."
  }
]
module.exports = { data }; 