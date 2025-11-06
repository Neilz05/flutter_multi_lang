// import { data as entries} from './users-user';
const { data : entries } = require('./users-user');
// let data = [
//     { parameters: {}, path: 'Users.' },
// ];

// entries.forEach((entry) => {
//     data.push(entry);
// });
let data = [
  {
    "parameters": {
      "UserNumberOfEntries": 13
    },
    "path": "Device.Users."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 0,
      "RoleParticipation": "Users.Role.4",
      "Alias": "root-group",
      "Groupname": "root"
    },
    "path": "Device.Users.Group.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 101,
      "RoleParticipation": "Users.Role.4",
      "Alias": "network-group",
      "Groupname": "network"
    },
    "path": "Device.Users.Group.10."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 65534,
      "RoleParticipation": "Users.Role.4",
      "Alias": "nogroup-group",
      "Groupname": "nogroup"
    },
    "path": "Device.Users.Group.11."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 323,
      "RoleParticipation": "Users.Role.4",
      "Alias": "chrony-group",
      "Groupname": "chrony"
    },
    "path": "Device.Users.Group.12."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 453,
      "RoleParticipation": "Users.Role.4",
      "Alias": "dnsmasq-group",
      "Groupname": "dnsmasq"
    },
    "path": "Device.Users.Group.13."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 200,
      "RoleParticipation": "Users.Role.4",
      "Alias": "mosquitto-group",
      "Groupname": "mosquitto"
    },
    "path": "Device.Users.Group.14."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 103,
      "RoleParticipation": "Users.Role.4",
      "Alias": "lighttpd-group",
      "Groupname": "lighttpd"
    },
    "path": "Device.Users.Group.15."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 300,
      "RoleParticipation": "Users.Role.3",
      "Alias": "acl-group",
      "Groupname": "acl"
    },
    "path": "Device.Users.Group.16."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 10,
      "RoleParticipation": "Users.Role.4",
      "Alias": "tr181_app-group",
      "Groupname": "tr181_app"
    },
    "path": "Device.Users.Group.17."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 500,
      "RoleParticipation": "Users.Role.4",
      "Alias": "ssh_lan-group",
      "Groupname": "ssh_lan"
    },
    "path": "Device.Users.Group.18."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 501,
      "RoleParticipation": "Users.Role.4",
      "Alias": "ssh_wan-group",
      "Groupname": "ssh_wan"
    },
    "path": "Device.Users.Group.19."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 1,
      "RoleParticipation": "Users.Role.4",
      "Alias": "daemon-group",
      "Groupname": "daemon"
    },
    "path": "Device.Users.Group.2."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 4,
      "RoleParticipation": "Users.Role.4",
      "Alias": "adm-group",
      "Groupname": "adm"
    },
    "path": "Device.Users.Group.3."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 8,
      "RoleParticipation": "Users.Role.4",
      "Alias": "mail-group",
      "Groupname": "mail"
    },
    "path": "Device.Users.Group.4."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 20,
      "RoleParticipation": "Users.Role.4",
      "Alias": "dialout-group",
      "Groupname": "dialout"
    },
    "path": "Device.Users.Group.5."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 29,
      "RoleParticipation": "Users.Role.4",
      "Alias": "audio-group",
      "Groupname": "audio"
    },
    "path": "Device.Users.Group.6."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 33,
      "RoleParticipation": "Users.Role.4",
      "Alias": "www-data-group",
      "Groupname": "www-data"
    },
    "path": "Device.Users.Group.7."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 55,
      "RoleParticipation": "Users.Role.4",
      "Alias": "ftp-group",
      "Groupname": "ftp"
    },
    "path": "Device.Users.Group.8."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticGroup": 1,
      "GroupID": 100,
      "RoleParticipation": "Users.Role.4",
      "Alias": "users-group",
      "Groupname": "users"
    },
    "path": "Device.Users.Group.9."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticRole": 1,
      "Alias": "admin-role",
      "RoleName": "admin",
      "RoleID": 1
    },
    "path": "Device.Users.Role.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticRole": 1,
      "Alias": "guest-role",
      "RoleName": "guest",
      "RoleID": 2
    },
    "path": "Device.Users.Role.2."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticRole": 1,
      "Alias": "acl-role",
      "RoleName": "acl",
      "RoleID": 3
    },
    "path": "Device.Users.Role.3."
  },
  {
    "parameters": {
      "Enable": 1,
      "StaticRole": 1,
      "Alias": "untrusted-role",
      "RoleName": "untrusted",
      "RoleID": 4
    },
    "path": "Device.Users.Role.4."
  },
  {
    "parameters": {
      "Enable": 1,
      "Name": "/bin/ash",
      "Alias": "ash-shell"
    },
    "path": "Device.Users.SupportedShell.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "Name": "/bin/false",
      "Alias": "false-shell"
    },
    "path": "Device.Users.SupportedShell.2."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "root",
      "X_PRPL-COM_HashedPassword": "$6$aab95ad01433a711$4qyhVT9BhzJU7OyoOoZHQjO0chaYaivtU4842iltPtcCuXRVXauMsiFM3E.qguSvxo78RCebJEGL3PlyHd01y/",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/root",
      "Shell": "Users.SupportedShell.1",
      "StaticUser": 1,
      "UserID": 0,
      "Enable": 1,
      "GroupParticipation": "Users.Group.1",
      "RoleParticipation": "Users.Role.1",
      "Alias": "root-user"
    },
    "path": "Device.Users.User.1."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "tr181_app",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/var",
      "Shell": "Users.SupportedShell.1",
      "StaticUser": 1,
      "UserID": 10,
      "Enable": 1,
      "GroupParticipation": "Users.Group.17",
      "RoleParticipation": "Users.Role.1",
      "Alias": "tr181_app-user"
    },
    "path": "Device.Users.User.10."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "ssh_lan",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/home/ssh_lan",
      "Shell": "Users.SupportedShell.1",
      "StaticUser": 1,
      "UserID": 500,
      "Enable": 1,
      "GroupParticipation": "Users.Group.18",
      "RoleParticipation": "Users.Role.4",
      "Alias": "ssh_lan-user"
    },
    "path": "Device.Users.User.11."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "ssh_wan",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/home/ssh_wan",
      "Shell": "Users.SupportedShell.1",
      "StaticUser": 1,
      "UserID": 501,
      "Enable": 1,
      "GroupParticipation": "Users.Group.19",
      "RoleParticipation": "Users.Role.4",
      "Alias": "ssh_wan-user"
    },
    "path": "Device.Users.User.12."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "admin",
      "X_PRPL-COM_HashedPassword": "$6$fdfc720d11e7591f$uHS6P1qnvxe.lNw3Y9LghQvlMEIyk9GwLBw5kpKGtDXsCVJYQsG5As4lMMH4rTCOiXrE21dwJCKO/tZXKyBLe1", // admin123
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/var",
      "Shell": "Users.SupportedShell.2",
      "StaticUser": 1,
      "UserID": 1000,
      "Enable": 1,
      "GroupParticipation": "Users.Group.11",
      "RoleParticipation": "Users.Role.1",
      "Alias": "admin-user"
    },
    "path": "Device.Users.User.13."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "daemon",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/var",
      "Shell": "Users.SupportedShell.2",
      "StaticUser": 1,
      "UserID": 1,
      "Enable": 1,
      "GroupParticipation": "Users.Group.2",
      "RoleParticipation": "Users.Role.4",
      "Alias": "daemon-user"
    },
    "path": "Device.Users.User.2."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "ftp",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/home/ftp",
      "Shell": "Users.SupportedShell.2",
      "StaticUser": 1,
      "UserID": 55,
      "Enable": 1,
      "GroupParticipation": "Users.Group.8",
      "RoleParticipation": "Users.Role.4",
      "Alias": "ftp-user"
    },
    "path": "Device.Users.User.3."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "network",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/var",
      "Shell": "Users.SupportedShell.2",
      "StaticUser": 1,
      "UserID": 101,
      "Enable": 1,
      "GroupParticipation": "Users.Group.10",
      "RoleParticipation": "Users.Role.4",
      "Alias": "network-user"
    },
    "path": "Device.Users.User.4."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "nobody",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/var",
      "Shell": "Users.SupportedShell.2",
      "StaticUser": 1,
      "UserID": 65534,
      "Enable": 1,
      "GroupParticipation": "Users.Group.11",
      "RoleParticipation": "Users.Role.4",
      "Alias": "nobody-user"
    },
    "path": "Device.Users.User.5."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "chrony",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/var",
      "Shell": "Users.SupportedShell.2",
      "StaticUser": 1,
      "UserID": 323,
      "Enable": 1,
      "GroupParticipation": "Users.Group.12",
      "RoleParticipation": "Users.Role.4",
      "Alias": "chrony-user"
    },
    "path": "Device.Users.User.6."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "dnsmasq",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/var",
      "Shell": "Users.SupportedShell.2",
      "StaticUser": 1,
      "UserID": 453,
      "Enable": 1,
      "GroupParticipation": "Users.Group.13",
      "RoleParticipation": "Users.Role.4",
      "Alias": "dnsmasq-user"
    },
    "path": "Device.Users.User.7."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "mosquitto",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/var",
      "Shell": "Users.SupportedShell.2",
      "StaticUser": 1,
      "UserID": 200,
      "Enable": 1,
      "GroupParticipation": "Users.Group.14",
      "RoleParticipation": "Users.Role.4",
      "Alias": "mosquitto-user"
    },
    "path": "Device.Users.User.8."
  },
  {
    "parameters": {
      "Language": "",
      "Username": "lighttpd",
      "X_PRPL-COM_HashedPassword": "",
      "Password": "",
      "X_PRPL-COM_HomeDirectory": "/home/lighttpd",
      "Shell": "",
      "StaticUser": 1,
      "UserID": 103,
      "Enable": 1,
      "GroupParticipation": "Users.Group.15",
      "RoleParticipation": "Users.Role.4",
      "Alias": "lighttpd-user"
    },
    "path": "Device.Users.User.9."
  }
];

entries.forEach((entry) => {
    data.push(entry);
});

module.exports = { data };
// module.exports = { data };