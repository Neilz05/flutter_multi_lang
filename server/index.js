// import express from 'express';
// import cors from 'cors';
const express = require('express');
const cors = require('cors')
const app = express();
// const PORT = 4000;
const logical = require('../mirage/fixtures/logical.js');
const callingfeatures = require('../mirage/fixtures/callingfeatures-set.js');
const blocking = require('../mirage/fixtures/blocking.js');
const ethernet_interface = require('../mirage/fixtures/ethernet-interface.js');
const deviceInfo = require('../mirage/fixtures/device-info.js');
const ip = require('../mirage/fixtures/ip.js');
const firewall = require('../mirage/fixtures/firewall.js');
 const dns = require('../mirage/fixtures/dns.js');
const nat = require('../mirage/fixtures/nat.js');
const calllog = require('../mirage/fixtures/calllog.js');
const nat_interfacesetting_1 = require('../mirage/fixtures/nat-interfacesetting-1.js');
const nat_interfacesetting_2 = require('../mirage/fixtures/nat-interfacesetting-2.js');
const nat_interfacesetting_3 = require('../mirage/fixtures/nat-interfacesetting-3.js');
const dhcpv4 = require('../mirage/fixtures/dhcpv4.js');
const dhcpv6 = require('../mirage/fixtures/dhcpv6.js');
const wanManager = require('../mirage/fixtures/wan-manager.js');
const wanManager_wan1 = require('../mirage/fixtures/wan-manager-wan1.js');
const wanManager_wan2 = require('../mirage/fixtures/wan-manager-wan2.js');
const wanManager_wan1_intf1 = require('../mirage/fixtures/wan-manager-wan1-intf1.js');
const wanManager_wan1_intf2 = require('../mirage/fixtures/wan-manager-wan1-intf2.js');
const wanManager_wan1_intf3 = require('../mirage/fixtures/wan-manager-wan1-intf3.js');
const wanManager_wan1_intf4 = require('../mirage/fixtures/wan-manager-wan1-intf4.js');
const wanManager_wan2_intf1 = require('../mirage/fixtures/wan-manager-wan2-intf1.js');
const wanManager_wan2_intf2 = require('../mirage/fixtures/wan-manager-wan2-intf2.js');
const wanManager_wan2_intf3 = require('../mirage/fixtures/wan-manager-wan2-intf3.js');
const wanManager_wan2_intf4 = require('../mirage/fixtures/wan-manager-wan2-intf4.js');
const ip2 = require('../mirage/fixtures/ip2.js');
const persistent = require('../mirage/fixtures/persistentconfiguration.js');
const ctulhu = require('../mirage/fixtures/ctulhu.js');
const softwareModules = require('../mirage/fixtures/software-modules.js');
const xfastwebwifi = require('../mirage/fixtures/x-fastweb-wifi.js');
const wifi = require('../mirage/fixtures/wifi.js');
const wifi_x000e50multiap = require('../mirage/fixtures/wifi_x000e50multiap.js');
const devicewifi = require('../mirage/fixtures/devicewifi.js');
const wifi_ssid_wifi_2g = require('../mirage/fixtures/wifi_ssid_wifi_2g.js');
const wifi_ap_customalias_2g_security = require('../mirage/fixtures/wifi_ap_customalias_2g_security.js');
const wifi_ap_customalias_5g_security = require('../mirage/fixtures/wifi_ap_customalias_5g_security.js');
const wifi_radio_alias_w10 = require('../mirage/fixtures/wifi_radio_alias_w10.js');
const wifi_radio_alias_w11 = require('../mirage/fixtures/wifi_radio_alias_w11.js');
const wifi_ssid_customalias_2g = require('../mirage/fixtures/wifi_ssid_customalias_2g.js');
const wifi_ssid_customalias_5g = require('../mirage/fixtures/wifi_ssid_customalias_5g.js');
const dataelements = require('../mirage/fixtures/wifi-dataelements.js');
const dataelements_network = require('../mirage/fixtures/wifi-dataelements-network.js');
const radio1 = require('../mirage/fixtures/wifi-radio-1.js');
const radio2 = require('../mirage/fixtures/wifi-radio-2.js');
const radio3 = require('../mirage/fixtures/wifi-radio-3.js');
const xscomci = require('../mirage/fixtures/x-sc-omci.js');
const optical = require('../mirage/fixtures/optical.js');
const xpon = require('../mirage/fixtures/xpon.js');
const voice = require('../mirage/fixtures/voice.js');
const users = require('../mirage/fixtures/users.js');
const hosts = require('../mirage/fixtures/hosts.js');
const hosts_host = require('../mirage/fixtures/hosts-host.js');
const ethernet = require('../mirage/fixtures/ethernet.js');
const userinterface = require('../mirage/fixtures/userinterface.js');
const userinterface_httpaccess = require('../mirage/fixtures/userinterface-httpaccess.js');
const userinterface_httpaccess_session_active = require('../mirage/fixtures/userinterface-httpaccess-session_active.js');
const userinterface_httpaccess_session_idleTimeout = require('../mirage/fixtures/userinterface-httpaccess-session_idleTimeout.js');
const sipClient = require('../mirage/fixtures/voice-voiceservice-sip.js');
const time = require('../mirage/fixtures/time.js');
const syslog2 = require('../mirage/fixtures/syslog-action.js');
const messages_log = require('../mirage/fixtures/messages.js');
const ppp = require('../mirage/fixtures/ppp.js');
const upnp = require('../mirage/fixtures/upnp.js');
const dhcp_log = require('../mirage/fixtures/messages_dhcp.js');
const wifi_log = require('../mirage/fixtures/messages_wifi.js');
const syslog_filepath = require('../mirage/fixtures/syslog-action-filepath.js');
const dynamicdns = require('../mirage/fixtures/dynamicdns.js');
const vlantermination = require('../mirage/fixtures/vlantermination.js');
const routing = require('../mirage/fixtures/routing.js');
const managementserver = require('../mirage/fixtures/managementserver.js');
const accesscontrol = require('../mirage/fixtures/accesscontrol.js');
const port_mapping = require('../mirage/fixtures/nat-portmapping.js');
const xpon_one = require('../mirage/fixtures/xpon-one.js');
const ring_sched = require('../mirage/fixtures/ring-schedule.js');
const fast_web_eco = require('../mirage/fixtures/x-fastweb-eco.js');
const packetcapturediag = require('../mirage/fixtures/packetcapturediagnostics.js');
const serviceVoiceservice1 = require('../mirage/fixtures/services-voiceservice-1.js');
// Load all fixtures at startup
let fixtures = {};

async function loadFixtures() {
    try {
    /*     const { data: logical } = await import('../mirage/fixtures/logical.js');
        const { data: callingfeatures } = await import('../mirage/fixtures/callingfeatures-set.js');
        const { data: blocking } = await import('../mirage/fixtures/blocking.js');
        const { data: ethernet_interface } = await import('../mirage/fixtures/ethernet-interface.js');
        const { data: deviceInfo } = await import('../mirage/fixtures/device-info.js');
        const { data: ip } = await import('../mirage/fixtures/ip.js');
        const { data: firewall } = await import('../mirage/fixtures/firewall.js');
         const { data: dns } = await import('../mirage/fixtures/dns.js');
        const { data: nat } = await import('../mirage/fixtures/nat.js');
        const { data: calllog } = await import('../mirage/fixtures/calllog.js');
        const { data: nat_interfacesetting_1 } = await import('../mirage/fixtures/nat-interfacesetting-1.js');
        const { data: nat_interfacesetting_2 } = await import('../mirage/fixtures/nat-interfacesetting-2.js');
        const { data: nat_interfacesetting_3 } = await import('../mirage/fixtures/nat-interfacesetting-3.js');
        const { data: dhcpv4 } = await import('../mirage/fixtures/dhcpv4.js');
        const { data: dhcpv6 } = await import('../mirage/fixtures/dhcpv6.js');
        const { data: wanManager } = await import('../mirage/fixtures/wan-manager.js');
        const { data: wanManager_wan1 } = await import('../mirage/fixtures/wan-manager-wan1.js');
        const { data: wanManager_wan2 } = await import('../mirage/fixtures/wan-manager-wan2.js');
        const { data: wanManager_wan1_intf1 } = await import('../mirage/fixtures/wan-manager-wan1-intf1.js');
        const { data: wanManager_wan1_intf2 } = await import('../mirage/fixtures/wan-manager-wan1-intf2.js');
        const { data: wanManager_wan1_intf3 } = await import('../mirage/fixtures/wan-manager-wan1-intf3.js');
        const { data: wanManager_wan1_intf4 } = await import('../mirage/fixtures/wan-manager-wan1-intf4.js');
        const { data: wanManager_wan2_intf1 } = await import('../mirage/fixtures/wan-manager-wan2-intf1.js');
        const { data: wanManager_wan2_intf2 } = await import('../mirage/fixtures/wan-manager-wan2-intf2.js');
        const { data: wanManager_wan2_intf3 } = await import('../mirage/fixtures/wan-manager-wan2-intf3.js');
        const { data: wanManager_wan2_intf4 } = await import('../mirage/fixtures/wan-manager-wan2-intf4.js');
        const { data: ip2 } = await import('../mirage/fixtures/ip2.js');
        const { data: persistent } = await import('../mirage/fixtures/persistentconfiguration.js');
        const { data: ctulhu } = await import('../mirage/fixtures/ctulhu.js');
        const { data: softwareModules } = await import('../mirage/fixtures/software-modules.js');
        const { data: xfastwebwifi } = await import('../mirage/fixtures/x-fastweb-wifi.js');
        const { data: wifi } = await import('../mirage/fixtures/wifi.js');
        const { data: wifi_x000e50multiap } = await import('../mirage/fixtures/wifi_x000e50multiap.js');
        const { data: devicewifi } = await import('../mirage/fixtures/devicewifi.js');
        const { data: wifi_ssid_wifi_2g } = await import('../mirage/fixtures/wifi_ssid_wifi_2g.js');
        const { data: wifi_ap_customalias_2g_security } = await import('../mirage/fixtures/wifi_ap_customalias_2g_security.js');
        const { data: wifi_ap_customalias_5g_security } = await import('../mirage/fixtures/wifi_ap_customalias_5g_security.js');
        const { data: wifi_radio_alias_w10 } = await import('../mirage/fixtures/wifi_radio_alias_w10.js');
        const { data: wifi_radio_alias_w11 } = await import('../mirage/fixtures/wifi_radio_alias_w11.js');
        const { data: wifi_ssid_customalias_2g } = await import('../mirage/fixtures/wifi_ssid_customalias_2g.js');
        const { data: wifi_ssid_customalias_5g } = await import('../mirage/fixtures/wifi_ssid_customalias_5g.js');
        const { data: dataelements } = await import('../mirage/fixtures/wifi-dataelements.js');
        const { data: dataelements_network } = await import('../mirage/fixtures/wifi-dataelements-network.js');
        const { data: radio1 } = await import('../mirage/fixtures/wifi-radio-1.js');
        const { data: radio2 } = await import('../mirage/fixtures/wifi-radio-2.js');
        const { data: radio3 } = await import('../mirage/fixtures/wifi-radio-3.js');
        const { data: xscomci } = await import('../mirage/fixtures/x-sc-omci.js');
        const { data: optical } = await import('../mirage/fixtures/optical.js');
        const { data: xpon } = await import('../mirage/fixtures/xpon.js');
        const { data: voice } = await import('../mirage/fixtures/voice.js');
        const { data: users } = await import('../mirage/fixtures/users.js');
        const { data: hosts } = await import('../mirage/fixtures/hosts.js');
        const { data: hosts_host } = await import('../mirage/fixtures/hosts-host.js');
        const { data: ethernet } = await import('../mirage/fixtures/ethernet.js');
        const { data: userinterface } = await import('../mirage/fixtures/userinterface.js');
        const { data: userinterface_httpaccess } = await import('../mirage/fixtures/userinterface-httpaccess.js');
        const { data: userinterface_httpaccess_session_active } = await import('../mirage/fixtures/userinterface-httpaccess-session_active.js');
        const { data: userinterface_httpaccess_session_idleTimeout } = await import('../mirage/fixtures/userinterface-httpaccess-session_idleTimeout.js');
        const { data: sipClient } = await import('../mirage/fixtures/voice-voiceservice-sip.js');
        const { data: time } = await import('../mirage/fixtures/time.js');
        const { data: syslog2 } = await import('../mirage/fixtures/syslog-action.js');
        const { data: messages_log } = await import('../mirage/fixtures/messages.js');
        const { data: ppp } = await import('../mirage/fixtures/ppp.js');
        const { data: upnp } = await import('../mirage/fixtures/upnp.js');
        const { data: dhcp_log } = await import('../mirage/fixtures/messages_dhcp.js');
        const { data: wifi_log } = await import('../mirage/fixtures/messages_wifi.js');
        const { data: syslog_filepath } = await import('../mirage/fixtures/syslog-action-filepath.js');
        const { data: dynamicdns } = await import('../mirage/fixtures/dynamicdns.js');
        const { data: vlantermination } = await import('../mirage/fixtures/vlantermination.js');
        const { data: routing } = await import('../mirage/fixtures/routing.js');
        const { data: managementserver } = await import('../mirage/fixtures/managementserver.js');
        const { data: accesscontrol } = await import('../mirage/fixtures/accesscontrol.js');
        const { data: port_mapping } = await import('../mirage/fixtures/nat-portmapping.js');
        const { data: xpon_one } = await import('../mirage/fixtures/xpon-one.js');
        const { data: ring_sched } = await import('../mirage/fixtures/ring-schedule.js');
        const { data: fast_web_eco } = await import('../mirage/fixtures/x-fastweb-eco.js');
        const { data: packetcapturediag } = await import('../mirage/fixtures/packetcapturediagnostics.js');
        const { data: serviceVoiceservice1 } = await import('../mirage/fixtures/services-voiceservice-1.js'); */
            // Add more fixtures as needed

        fixtures = {
            logical,
             callingfeatures,
            blocking,
            ethernet_interface,
            deviceInfo,
            ip,
            firewall,
            dns,
            nat,
            calllog,
            nat_interfacesetting_1,
            nat_interfacesetting_2,
            nat_interfacesetting_3,
            dhcpv4,
            dhcpv6,
            wanManager,
            wanManager_wan1,
            wanManager_wan2,
            wanManager_wan1_intf1,
            wanManager_wan1_intf2,
            wanManager_wan1_intf3,
            wanManager_wan1_intf4,
            wanManager_wan2_intf1,
            wanManager_wan2_intf2,
            wanManager_wan2_intf3,
            wanManager_wan2_intf4,
            ip2,
            persistent,
            ctulhu,
            softwareModules,
            xfastwebwifi,
            wifi,
            wifi_x000e50multiap,
            devicewifi,
            wifi_ssid_wifi_2g,
            wifi_ap_customalias_2g_security,
            wifi_ap_customalias_5g_security,
            wifi_radio_alias_w10,
            wifi_radio_alias_w11,
            wifi_ssid_customalias_2g,
            wifi_ssid_customalias_5g,
            dataelements,
            dataelements_network,
            radio1,
            radio2,
            radio3,
            xscomci,
            optical,
            xpon,
            voice,
            users,
            hosts,
            hosts_host,
            ethernet,
            userinterface,
            userinterface_httpaccess,
            userinterface_httpaccess_session_active,
            userinterface_httpaccess_session_idleTimeout,
            sipClient,
            time,
            syslog2,
            messages_log,
            ppp,
            upnp,
            dhcp_log,
            wifi_log,
            syslog_filepath,
            dynamicdns,
            vlantermination,
            routing,
            managementserver,
            accesscontrol,
            port_mapping,
            xpon_one,
            ring_sched,
            fast_web_eco,
            packetcapturediag,
            serviceVoiceservice1,
        };

        console.log('All fixtures loaded successfully');
    } catch (error) {
        console.error('Error loading fixtures:', error);
        process.exit(1); // Exit if fixtures can't be loaded
    }
}
// export default function (app) {
module.exports = function (app) {
app.use(cors());
app.use(express.json());
//remove for now
// function test() {
//   this.get('/serviceElements/PacketCaptureDiagnostics.', () => {
//     return packetcapturediag;
//   })

//       this.post('/upload/:filename', () => {
//         return new Response(
//           202,
//           {
//             'Content-Type': 'application/json'
//           }
//         );
//       }, { timing: 2000 });
      
      app.get('/serviceElements/PacketCaptureDiagnostics.', (req, res) => {
        res.json(packetcapturediag);
        return packetcapturediag;
      });

//       this.post('/session', (schema, request) => {
//         let attrs = JSON.parse(request.requestBody);

//         if (
//           (attrs.username === 'admin' && attrs.password === 'admin') ||
//           (attrs.username === 'superadmin' && attrs.password === 'superadmin') ||
//           (attrs.username === 'root' && attrs.password === 'root') ||
//           (attrs.username === '' && attrs.password === '')
//         ) {
//           var randomstr = generateRandom16DigitString(32);
//           logon_user = attrs.username;
//           sessionStorage.setItem('mySessionValue_logon_user', logon_user);
//           return new Response(
//             200,
//             {
//               'Content-Type': 'application/json',
//               'X-CSRF-Token': randomstr,
//               'Cache-Control': 'no-cache'
//             },
//             {
//               absoluteTimeout: 3600,
//               idleTimeout: 600,
//               sessionID: randomstr,
//             }
//           );
//         } else {
//           logon_user = '';
//           sessionStorage.setItem('mySessionValue_logon_user', logon_user);
//           return new Response(401, {}, { error: 'Invalid username or password' });
//         }
//       });

//       this.get('/serviceElements/Device.DNS.Relay.Forwarding.', () => {
//         return dns;
//       });

//       this.get('/serviceElements/Device.DNS.Relay.X_PRPLWARE-COM_Config.', () => {
//         return dns.filter((entry) => {
//           return entry.path.startsWith('Device.DNS.Relay.X_PRPLWARE-COM_Config.');
//         });
//       });

//       this.get('/serviceElements/Device.DeviceInfo.', () => {
//         // randomize CPU usage
//         deviceInfo.filter((entry, index) => {
//           if (entry.path === 'DeviceInfo.ProcessStatus.') {
//             deviceInfo[index].parameters.CPUUsage = Math.floor(
//               Math.random() * 100
//             );
//             return true;
//           }
//         });

//         return deviceInfo;
//       });

//       this.get('/serviceElements/Device.IP.Interface.', () => {
//         // generate random traffic data
//         return ip2
//       });

//       this.get('/serviceElements/Device.DHCPv4.', () => {
//         return dhcpv4;
//       });

//       this.get('/serviceElements/Device.SSH.Server.', () => {
//         return [
//           {
//             parameters: {
//               Port: 22
//             },
//             path: 'Device.SSH.Server.1.'
//           }
//         ];
//       });

//       this.get('/serviceElements/Device.UPnP.Device.', () => {
//         return upnp;
//       });

//       this.get('/serviceElements/Device.PPP.Interface.', () => {
//         return ppp;
//       });

//       this.get('/serviceElements/Device.DeviceInfo.VendorConfigFile.1.', () => {
//         return [
//                 {
//                   "parameters": {
//                     "Date": "0001-01-01T00:00:00Z",
//                     "UseForBackupRestore": 1,
//                     "Name": "file:///www/assets/pcm.usr/2025-08-24T04:57:28Z_user_backup.tar",
//                     "Alias": "userSettings",
//                     "Version": "",
//                     "Description": ""
//                   },
//                   "path": "Device.DeviceInfo.VendorConfigFile.1."
//                 }
//               ];
//       });

//       this.get('/assets/pcm.usr/2025-08-24T04:57:28Z_user_backup.tar', () => {
//         return "123";
//       });

//       this.get('/serviceElements/PersistentConfiguration.BackupFile.', () => {
//         return [
//                 {
//                   "parameters": {
//                     "Alias": "1-2-3"
//                   },
//                   "path": "PersistentConfiguration.BackupFile."
//                 }
//               ];
//       });

//       this.get('/serviceElements/Device.DHCPv6.', () => {
//         return dhcpv6;
//       });

//       this.get('/serviceElements/Device.Time.', () => {
//         return time;
//       });

//       this.get('/serviceElements/Device.Syslog.', () => {
//         return syslog2;
//       });

//       this.get('/serviceElements/Device.Logical.Interface.', () => {
//         return logical;
//       });

//       this.get('/serviceElements/WANManager.', () => {
//         return wanManager;
//       });

//       this.get('/serviceElements/Device.WiFi.AccessPoint.[CustomAlias=="WiFi-5G"].WPS.', () => {
//         return wps5g;
//       });

//       this.get('/serviceElements/Device.WiFi.AccessPoint.[CustomAlias=="WiFi-2G"].WPS.', () => {
//         return wps2g;
//       });
//       this.get('/serviceElements/Device.WiFi.AccessPoint.[CustomAlias=="WiFi-5G-Custom"].WPS.', () => {
//         return wps5g;
//       });

//       this.get('/serviceElements/Device.WiFi.AccessPoint.[CustomAlias=="WiFi-2G-Custom"].WPS.', () => {
//         return wps2g;
//       });
//       this.get('/serviceElements/Device.WiFi.AccessPoint.[CustomAlias=="WiFi-5G-Compat"].WPS.', () => {
//         return wps5g;
//       });

//       this.get('/serviceElements/Device.WiFi.AccessPoint.[CustomAlias=="WiFi-2G-Compat"].WPS.', () => {
//         return wps2g;
//       });
//       /*
//       this.get('/serviceElements/WANManager.', () => {
//         return [
//           {
//             "parameters":
//             {
//               "OperationMode":"Manual",
//               "WANMode":"demo_vlanmode"
//             },
//             "path":"X_PRPL-COM_WANManager."
//           },
//           {
//             "parameters": {
//               "Alias":"ethernet",
//               "PhysicalType":"fiber",
//               "Status":"alive"
//             },
//             "path":"X_PRPL-COM_WANManager.WAN.1."
//           },
//           {
//             "parameters":{
//               "Alias":"ethernet",
//               "PhysicalType":"fiber",
//               "Status":"alive"
//             },
//             "path":"X_PRPL-COM_WANManager.WAN.2."
//           },
//           {
//             "parameters": {
//               "Alias": "ethernet",
//               "VlanPriority": "2",
//               "VlanID": "8",
//               "IPv4Mode": "Static"
//             },
//             "path": "X_PRPL-COM_WANManager.WAN.1.Intf.1."
//           },
//         ];
//       });
//       */

//       this.get('/serviceElements/WANManager.WAN.1.', () => {
//         return wanManager_wan1;
//       });

//       this.get('/serviceElements/WANManager.WAN.1.Intf.1.', () => {
//         return wanManager_wan1_intf1;
//       });
//       this.get('/serviceElements/WANManager.WAN.1.Intf.2.', () => {
//         return wanManager_wan1_intf2;
//       });
//       this.get('/serviceElements/WANManager.WAN.1.Intf.3.', () => {
//         return wanManager_wan1_intf3;
//       });
//       this.get('/serviceElements/WANManager.WAN.1.Intf.4.', () => {
//         return wanManager_wan1_intf4;
//       });

//       this.get('/serviceElements/WANManager.WAN.2.', () => {
//         return wanManager_wan2;
//       });

//       this.get('/serviceElements/WANManager.WAN.2.Intf.2.', () => {
//         return wanManager_wan2_intf2;
//       });
//       this.get('/serviceElements/WANManager.WAN.2.Intf.3.', () => {
//         return wanManager_wan2_intf3;
//       });
//       this.get('/serviceElements/WANManager.WAN.2.Intf.4.', () => {
//         return wanManager_wan2_intf4;
//       });
      
//       this.get('/serviceElements/WANManager.WAN.3.', () => {
//         return [
//           {
//             parameters: {
//               PhysicalType: 'Ethernet',
//               Alias: 'demo_ethmode',
//               Status: 'UP',
//             },
//             path: 'X_PRPL-COM_WANManager.WAN.3.',
//           },
//         ]
//       });

//       this.get('/serviceElements/WANManager.WAN.4.', () => {
//         return [
//           {
//             parameters: {
//               PhysicalType: 'Ethernet',
//               Alias: 'demo_ethmode',
//               Status: 'UP',
//             },
//             path: 'X_PRPL-COM_WANManager.WAN.4.',
//           },
//         ]
//       });

//       this.get('/serviceElements/WANManager.WAN.5.', () => {
//         return [
//           {
//             parameters: {
//               PhysicalType: 'Ethernet',
//               Alias: 'demo_ethmode',
//               Status: 'UP',
//             },
//             path: 'X_PRPL-COM_WANManager.WAN.5.',
//           },
//         ]
//       });
//       // this.get('/serviceElements/WANManager.WAN.2.', () => {
//       //   return wanManager;
//       // });

//       // this.get('/serviceElements/WANManager.WAN.3.', () => {
//       //   return wanManager;
//       // });

//       // this.get('/serviceElements/WANManager.WAN.4.', () => {
//       //   return wanManager;
//       // });

//       // this.get('/serviceElements/WANManager.WAN.5.', () => {
//       //   return wanManager;
//       // });

//       this.get('/serviceElements/PersistentConfiguration.', () => {
//         return persistent;
//       });

//       this.get('/serviceElements/Device.Cthulhu.', () => {
//         return ctulhu;
//       });

//       this.get('/serviceElements/Device.SoftwareModules.', () => {
//         return softwareModules;
//       });
	  
// 	  this.get('/serviceElements/Device.Softwaremodules.Deploymentunit.', () => {
//         const deploymentUnits = softwareModules
//           .filter(module => module.path && module.path.startsWith('SoftwareModules.DeploymentUnit'))
//           .map((module, index) => ({
//             type: 'softwaremodules-deploymentunit',
//             id: module.parameters.UUID || `deployment-unit-${index}`,
//             attributes: {
//               Name: module.parameters.Name || `Deployment Unit ${index}`,
//               Version: module.parameters.Version || '1.0.0',
//               Status: module.parameters.Status || 'Active',
//               ...module.parameters
//             }
//           }));
      
//         return { data: deploymentUnits };  // 確保返回的是一個包含 data 屬性的對象
//       });

//       this.get('/serviceElements/Device.Services.', () => {
//         return encryptArray(voice);
//       });
//       this.get('/serviceElements/Device.Users.', () => {
//         return users;
//       });

//       this.get('/serviceElements/Device.ManagementServer.', () => {
//         return managementserver;
//       });

//       this.get('/serviceElements/Device.WiFi.DataElements.', () => {
//         return dataelements;
//       });

//       this.get('/serviceElements/Device.WiFi.DataElements.Network.Device.', () => {
//         return dataelements_network.filter(obj => obj.path.includes("Device.WiFi.DataElements.Network.Device."));
//       });

//       this.get('/serviceElements/Device.WiFi.X_000E50_MultiAP.Steering.', () => {
//         return wifi.filter(obj => obj.path.includes('Device.WiFi.X_000E50_MultiAP.Steering.'));
//       });

//       this.get('/serviceElements/Device.WiFi.Radio.1.', () => {
//         return radio1;
//       });

//       this.get('/serviceElements/Device.WiFi.Radio.2.', () => {
//         return radio2;
//       });
//       this.get('/serviceElements/Device.WiFi.Radio.3.', () => {
//         return radio3;
//       });
//       this.get('/serviceElements/Device.X_FASTWEB_WiFi.', () => {
//         return encryptArray(xfastwebwifi);
//       });
//       this.get('/serviceElements/Device.X_FASTWEB_WiFi.SplitSSIDDisable.1.', () => {
//         return encryptArray([{"parameters": {"Enable":0},"path":"Device.X_FASTWEB_WiFi.SplitSSIDDisable.1."},]);
//       });
//       this.get('/serviceElements/Device.X_FASTWEB_WiFi.SplitSSIDDisable.2.', () => {
//         return encryptArray([{"parameters": {"Enable":1},"path":"Device.X_FASTWEB_WiFi.SplitSSIDDisable.2."},]);
//       });
//       this.get('/serviceElements/Device.X_FASTWEB_WiFi.SplitSSIDDisable.3.', () => {
//         return encryptArray([{"parameters": {"Enable":1},"path":"Device.X_FASTWEB_WiFi.SplitSSIDDisable.3."},]);
//       });
//       this.get('/serviceElements/Device.X_FASTWEB_WiFi.SplitSSIDDisable.4.', () => {
//         return encryptArray([{"parameters": {"Enable":1},"path":"Device.X_FASTWEB_WiFi.SplitSSIDDisable.4."},]);
//       });

//       this.get('/serviceElements/Device.WiFi.', () => {
//         /* // generate random package data
//         wifi.filter((entry, index) => {
//           if (entry.path.match(/^WiFi\.SSID\.[0-9]+\.Stats/)) {
//             if (!wifiCounters[entry.path]) {
//               wifiCounters[entry.path] = { rxPackets: 0, txPackets: 0, rxBytes: 0, txBytes: 0 };
//             }

//             wifiCounters[entry.path].txPackets += Math.floor(Math.random() * 100);
//             wifiCounters[entry.path].rxPackets += Math.floor(Math.random() * 100);
//             wifiCounters[entry.path].txBytes += Math.floor(Math.random() * 100000);
//             wifiCounters[entry.path].rxBytes += Math.floor(Math.random() * 100000);

//             wifi[index].parameters.PacketsSent = wifiCounters[entry.path].txPackets;
//             wifi[index].parameters.PacketsReceived = wifiCounters[entry.path].rxPackets;
//             wifi[index].parameters.BytesSent = wifiCounters[entry.path].txBytes;
//             wifi[index].parameters.BytesReceived = wifiCounters[entry.path].rxBytes;
//             return true;
//           }
//         }); */

//         return encryptArray(wifi);
//       });
//       this.get('/serviceElements/Device.WiFi.X_000E50_MultiAP.', () => {
//         return encryptArray(wifi_x000e50multiap);
//       });
//       this.get('/serviceElements/Device.WiFi.X_000E50_MultiAP.Node.', () => {
//         return wifi_x000e50multiap.filter(obj => obj.path.includes("Device.WiFi.X_000E50_MultiAP.Node."));
//       });
//       this.get('/serviceElements/Device.WiFi.X_000E50_MultiAP.Devices.', () => {
//         return wifi_x000e50multiap.filter(obj => obj.path.includes("Device.WiFi.X_000E50_MultiAP.Devices."));
//       });

//       this.get('/serviceElements/Device.WiFi.SSID.WiFi-2G.', () => {
//         return wifi_ssid_wifi_2g;
//       });
//       this.get('/serviceElements/Device.WiFi.AccessPoint.[CustomAlias=="WiFi-2G"].Security.', () => {
//         return wifi_ap_customalias_2g_security;
//       });
//       this.get('/serviceElements/Device.WiFi.AccessPoint.[CustomAlias=="WiFi-5G"].Security.', () => {
//         return wifi_ap_customalias_5g_security;
//       });
//       this.get('/serviceElements/Device.WiFi.Radio.[Alias=="Wl0"].', () => {
//         return wifi_radio_alias_w10;
//       });
//       this.get('/serviceElements/Device.WiFi.Radio.[Alias=="Wl1"].', () => {
//         return wifi_radio_alias_w11;
//       });
//       this.get('/serviceElements/Device.WiFi.SSID.[CustomAlias=="WiFi-2G"].', () => {
//         return wifi_ssid_customalias_2g;
//       });
//       this.get('/serviceElements/Device.WiFi.SSID.[CustomAlias=="WiFi-5G"].', () => {
//         return wifi_ssid_customalias_5g;
//       });
//       this.get('/serviceElements/Device.XPON.', () => {
//         return xpon;
//       });

//       this.get('/serviceElements/Device.X_SC_Omci.', () => {
//         return xscomci;
//       });

//       this.get('/serviceElements/Device.DNS.', () => {
//         return dns;
//       });

//       this.get('/serviceElements/Device.NAT.', () => {
//         return nat;
//       });

//       this.get('/serviceElements/Device.NAT.InterfaceSetting.1.', () => {
//         return nat_interfacesetting_1;
//       });

//       this.get('/serviceElements/Device.NAT.InterfaceSetting.2.', () => {
//         return nat_interfacesetting_2;
//       });

//       this.get('/serviceElements/Device.NAT.InterfaceSetting.3.', () => {
//         return nat_interfacesetting_3;
//       });

//       this.get('/serviceElements/Device.NAT.PortMapping.', () => {
//         return port_mapping;
//       });

//       this.get('/serviceElements/Reboot.', () => {
//         return [
//           {
//             parameters: { BootCounter: 31 },
//             path: 'Reboot.',
//           },
//           {
//             parameters: {
//               BootReason: 'Power Off',
//             },
//             path: 'Reboot.Reboot.30.'
//           },
//           {
//             parameters: {
//               BootReason: 'Crash',
//             },
//             path: 'Reboot.Reboot.31.'
//           }
//         ];
//       });

//       this.get('/serviceElements/Device.Firewall.', () => {
//         return firewall;
//       });

//       this.get('/serviceElements/Device.Some.', () => {
//         return some;
//       });

//       this.get('/serviceElements/Device.Syslog.Action.*.LogFile.', () => {
//         return syslog_filepath;
//       });

//       this.get('/serviceElements/Device.Firewall.', () => {
//         return firewall;
//       });

//       this.get('/serviceElements/Device.Firewall.X_PRPLWARE-COM_InterfaceSetting.', () => {
//         return firewall.filter((entry) => {
//           return entry.path.startsWith('Device.Firewall.X_PRPLWARE-COM_InterfaceSetting.');
//         });
//       });

//       this.get('/serviceElements/Device.Optical.', () => {
//         return optical;
//       });

//       this.get('/serviceElements/Device.IP.', () => {
//         return ip;
//       });

//       this.get('/serviceElements/Device.DynamicDNS.', () => {
//         return dynamicdns;
//       });

//       this.get('/serviceElements/Device.DNS.X_SecureDNS.', () => {
//          return [
//                 {
//                   "parameters": {
//                    "ConfigureAllDevices": 0,
//                    "Enable": 1
//                   },
//                   "path": "Device.DNS.X_SecureDNS."
//                 }
//               ];
//       });
      
//       this.get('/serviceElements/Device.X_Management.', () => {
//          return [
//                 {
//                   "parameters": {
//                    "OpenModemEnable": 1
//                   },
//                   "path": "Device.X_Management."
//                 }
//               ];
//       });
//       this.post('/commands', (schema, request) => {
//         return [{ "failure": { "errmsg": "", "errcode": 0 }, "executed": "Device.DeviceInfo.FirmwareImage.1.Download()" }];
//         // return [{ "outputArgs": { "status": 1 }, "executed": "WANManager.setWANMode()" }];
//       }, { timing: 1000 });

//       this.get('/serviceElements/Device.Hosts.', () => {
//         return hosts;
//       });

//       this.get('/serviceElements/Device.Logical.', () => {
//         return logical;
//       });

//       this.get('/serviceElements/Device.Ethernet.', () => {
//         return ethernet;
//       });

//       this.get('/serviceElements/Device.UserInterface.', () => {
//         return userinterface;
//       });
//       this.get('/serviceElements/Device.UserInterface.HTTPAccess.', () => {
//         return userinterface_httpaccess;
//       });
//       this.get('/serviceElements/Device.UserInterface.HTTPAccess.[Alias=="LocalGUI"].', () => {
//         return userinterface_httpaccess;
//       });
//       this.get('/serviceElements/Device.UserInterface.HTTPAccess.[Alias=="LocalGUI_HTTPS"].', () => {
//         return userinterface_httpaccess;
//       });
//       //admin
//       //serviceElements/Device.UserInterface.HTTPAccess.2.Session.4.
//       this.get('/serviceElements/Device.UserInterface.HTTPAccess.2.Session.4.', (schema, request) => {
//         let randomstr = generateRandom16DigitString(32);
//         let ret = getUserInterfaceHttpAccessData(request.url);
//         return new Response(
//           200,
//           {
//             'Content-Type': 'application/json',
//             'X-CSRF-Token': randomstr,
//             'Cache-Control': 'no-cache'
//           },
//           [ret]
//         );
//       });
//       //superadmin root
//       //serviceElements/Device.UserInterface.HTTPAccess.1.Session.1.
//       this.get('/serviceElements/Device.UserInterface.HTTPAccess.1.Session.1.', (schema, request) => {
//         let randomstr = generateRandom16DigitString(32);
//         let ret = getUserInterfaceHttpAccessData(request.url);
//         return new Response(
//           200,
//           {
//             'Content-Type': 'application/json',
//             'X-CSRF-Token': randomstr,
//             'Cache-Control': 'no-cache'
//           },
//           [ret]
//         );
//       });

//       this.post('serviceElements/Device.DHCPv4.', () => {
//         return { success: 'ok' };
//       });

//       this.get('/serviceElements/Device.XPON.ONU.', () => {
//         return xpon_one;
//       });

//       this.get('/serviceElements/systemlog', (schema, request) => {
//         let start = parseInt(request.queryParams.start)
//         let end = parseInt(request.queryParams.end)

//         if (start === 0 && end === -1)
//           return syslog

//         return syslog.slice(start, end)
//       })

//       this.get('/serviceElements/Device.Routing.Router.', () => {
//         return [{"parameters":{"Enable":1,"IPv6ForwardingNumberOfEntries":3,"IPv4ForwardingNumberOfEntries":4,"Status":"Enabled","Alias":"main"},"path":"Device.Routing.Router.1."},{"parameters":{"ForwardingMetric":-1,"StaticRoute":0,"DestSubnetMask":"0.0.0.0","Interface":"Device.IP.Interface.2.","Status":"Enabled","Enable":1,"DestIPAddress":"0.0.0.0","GatewayIPAddress":"","Origin":"IPCP","ForwardingPolicy":-1,"Alias":"cpe-default"},"path":"Device.Routing.Router.1.IPv4Forwarding.1."},{"parameters":{"ForwardingMetric":0,"StaticRoute":0,"DestSubnetMask":"255.255.255.0","Interface":"br-lan","Status":"Enabled","Enable":1,"DestIPAddress":"192.168.1.0","GatewayIPAddress":"","Origin":"Automatic","ForwardingPolicy":-1,"Alias":"cpe-IPv4Forwarding-2"},"path":"Device.Routing.Router.1.IPv4Forwarding.2."},{"parameters":{"ForwardingMetric":0,"StaticRoute":0,"DestSubnetMask":"255.255.255.0","Interface":"br-guest","Status":"Enabled","Enable":1,"DestIPAddress":"192.168.5.0","GatewayIPAddress":"","Origin":"Automatic","ForwardingPolicy":-1,"Alias":"cpe-IPv4Forwarding-3"},"path":"Device.Routing.Router.1.IPv4Forwarding.3."},{"parameters":{"ForwardingMetric":0,"StaticRoute":0,"DestSubnetMask":"255.255.255.0","Interface":"br-lcm","Status":"Enabled","Enable":1,"DestIPAddress":"192.168.2.0","GatewayIPAddress":"","Origin":"Automatic","ForwardingPolicy":-1,"Alias":"cpe-IPv4Forwarding-4"},"path":"Device.Routing.Router.1.IPv4Forwarding.4."},{"parameters":{"ForwardingMetric":-1,"NextHop":"","Interface":"Device.IP.Interface.1.","Status":"Disabled","Enable":0,"ExpirationTime":"9999-12-31T23:59:59Z","Origin":"Static","ForwardingPolicy":-1,"Alias":"prefix_blackhole-default","Type":"Blackhole","DestIPPrefix":""},"path":"Device.Routing.Router.1.IPv6Forwarding.1."},{"parameters":{"ForwardingMetric":256,"NextHop":"","Interface":"br-lan","Status":"Enabled","Enable":1,"ExpirationTime":"9999-12-31T23:59:59Z","Origin":"Automatic","ForwardingPolicy":-1,"Alias":"cpe-IPv6Forwarding-2","Type":"Normal","DestIPPrefix":"fe80::/64"},"path":"Device.Routing.Router.1.IPv6Forwarding.2."},{"parameters":{"ForwardingMetric":2147483647,"NextHop":"","Interface":"lo","Status":"Enabled","Enable":1,"ExpirationTime":"9999-12-31T23:59:59Z","Origin":"Automatic","ForwardingPolicy":-1,"Alias":"cpe-IPv6Forwarding-3","Type":"Unreachable","DestIPPrefix":"fdea:e111:ce6b::/48"},"path":"Device.Routing.Router.1.IPv6Forwarding.3."},{"parameters":{"Enable":1,"IPv6ForwardingNumberOfEntries":0,"IPv4ForwardingNumberOfEntries":0,"Status":"Enabled","Alias":"option121"},"path":"Device.Routing.Router.17."},{"parameters":{"Enable":1,"IPv6ForwardingNumberOfEntries":1,"IPv4ForwardingNumberOfEntries":1,"Status":"Enabled","Alias":"ETH-Voice"},"path":"Device.Routing.Router.2."},{"parameters":{"ForwardingMetric":-1,"StaticRoute":0,"DestSubnetMask":"0.0.0.0","Interface":"Device.IP.Interface.9.","Status":"Enabled","Enable":1,"DestIPAddress":"0.0.0.0","GatewayIPAddress":"","Origin":"IPCP","ForwardingPolicy":-1,"Alias":"cpe-default"},"path":"Device.Routing.Router.2.IPv4Forwarding.1."},{"parameters":{"ForwardingMetric":-1,"NextHop":"","Interface":"Device.IP.Interface.1.","Status":"Disabled","Enable":0,"ExpirationTime":"9999-12-31T23:59:59Z","Origin":"Static","ForwardingPolicy":-1,"Alias":"prefix_blackhole-default","Type":"Blackhole","DestIPPrefix":""},"path":"Device.Routing.Router.2.IPv6Forwarding.1."},{"parameters":{"Enable":1,"IPv6ForwardingNumberOfEntries":1,"IPv4ForwardingNumberOfEntries":1,"Status":"Enabled","Alias":"FTTH-Voice"},"path":"Device.Routing.Router.3."},{"parameters":{"ForwardingMetric":-1,"StaticRoute":0,"DestSubnetMask":"0.0.0.0","Interface":"Device.IP.Interface.9.","Status":"Enabled","Enable":1,"DestIPAddress":"0.0.0.0","GatewayIPAddress":"","Origin":"IPCP","ForwardingPolicy":-1,"Alias":"cpe-default"},"path":"Device.Routing.Router.3.IPv4Forwarding.1."},{"parameters":{"ForwardingMetric":-1,"NextHop":"","Interface":"Device.IP.Interface.1.","Status":"Disabled","Enable":0,"ExpirationTime":"9999-12-31T23:59:59Z","Origin":"Static","ForwardingPolicy":-1,"Alias":"prefix_blackhole-default","Type":"Blackhole","DestIPPrefix":""},"path":"Device.Routing.Router.3.IPv6Forwarding.1."}]
//       })


//       this.get('/serviceElements/Device.Syslog.', () => {
//         return syslog2
//       })

//       this.get('/assets/log/messages_wifi', () => {
//         return wifi_log
//       })

//       //yikes....
//       this.get('/assets/log/messages_dhcp', () => {
//         return dhcp_log
//       })

//       this.get('/mnt/log/messages', () => {
//         return messages_log
//       })

//       this.get('/var/log/messages/firewall', () => {

//       })

//       this.get('/var/log/messages/lcm', () => {

//       })

//       this.get('/var/log/messages/messages_remote', () => {

//       })

//       this.get('/serviceElements/Device.Users.User.[Alias=="superadmin-user"].', () => {
//         return [
//           {
//             "parameters": {
//               "Language": "",
//               "Username": "superadmin",
//               "X_PRPL-COM_HashedPassword": "$6$dce1e7d16e3fcfa5$mwx0oQ/6ZJPxrlAAs5fEZhyFwml8hML11pfYmhJK3hvR66jJSKi8UEvpYgnUO7a9li6qDpei/XGw8mKCwGC5J1",
//               "Password": "",
//               "X_PRPL-COM_HomeDirectory": "/superadmin",
//               "Shell": "Users.SupportedShell.1",
//               "StaticUser": 1,
//               "X_18EFC0_RandomPassword": 0,
//               "UserID": 0,
//               "Enable": 1,
//               "X_PRPL-COM_WUIMode": "Basic",
//               "GroupParticipation": "Users.Group.1",
//               "RoleParticipation": "Users.Role.1",
//               "Alias": "superadmin-user"
//             },
//             "path": "Device.Users.User.1."
//           }
//         ];
//       })

//       this.get('/serviceElements/Device.Users.User.[Alias=="root-user"].', () => {
//         return [
//           {
//             "parameters": {
//               "Language": "",
//               "Username": "root",
//               "X_PRPL-COM_HashedPassword": "$6$dce1e7d16e3fcfa5$SrWHGk58TlO8gorXhBYfgfjaIAhiHtGK2q8kO7WwbeK3LfjIXnU8FeTFfQoPDqTmVKh1aqACLOolbX7J3yQlt.",
//               "Password": "",
//               "X_PRPL-COM_HomeDirectory": "/root",
//               "Shell": "Users.SupportedShell.1",
//               "StaticUser": 1,
//               "X_18EFC0_RandomPassword": 0,
//               "UserID": 0,
//               "Enable": 1,
//               "X_PRPL-COM_WUIMode": "Basic",
//               "GroupParticipation": "Users.Group.1",
//               "RoleParticipation": "Users.Role.1",
//               "Alias": "root-user"
//             },
//             "path": "Device.Users.User.1."
//           }
//         ];
//       })

//       this.get('/serviceElements/Device.Users.User.[Alias=="admin-user"].', () => {
//         return [
//           {
//             "parameters": {
//               "Language": "",
//               "Username": "admin",
//               "X_PRPL-COM_HashedPassword": "$6$e7c0aa1e35c56c96$HMzAYV/E0a/nY/SdseiwBFIvzJ0xkciEaOkgW4zqsjUVasOAezLVYui80CnmHpD1FeFFAWa5VfyRPiduyPEHH.",
//               "Password": "",
//               "X_PRPL-COM_HomeDirectory": "/var",
//               "Shell": "Users.SupportedShell.2",
//               "StaticUser": 1,
//               "X_18EFC0_RandomPassword": 0,
//               "UserID": 1000,
//               "Enable": 1,
//               "X_PRPL-COM_WUIMode": "Basic",
//               "GroupParticipation": "Users.Group.11",
//               "RoleParticipation": "Users.Role.1",
//               "Alias": "admin-user"
//             },
//             "path": "Device.Users.User.13."
//           }
//         ];
//       })

//       this.get('/serviceElements/Device.Users.User.[Username=="root"].', () => {
//         return [{ "parameters": { "Language": "en-us", "Username": "root", "X_PRPL-COM_HashedPassword": "", "Password": "root", "X_PRPL-COM_HomeDirectory": "/root", "Shell": "Users.SupportedShell.1", "StaticUser": 1, "UserID": 0, "Enable": 1, "GroupParticipation": "Users.Group.1", "RoleParticipation": "Users.Role.1", "Alias": "root-user", "X_PRPL-COM_WUIMode" : "Expert" }, "path": "Device.Users.User.1." }]

//       })

//       this.get('/serviceElements/Device.Users.User.[Username=="superadmin"].', () => {
//         return [{ "parameters": { "Language": "en-us", "Username": "superadmin", "X_PRPL-COM_HashedPassword": "", "Password": "superadmin", "X_PRPL-COM_HomeDirectory": "/root", "Shell": "Users.SupportedShell.1", "StaticUser": 1, "UserID": 0, "Enable": 1, "GroupParticipation": "Users.Group.1", "RoleParticipation": "Users.Role.1", "Alias": "superadmin-user", "X_PRPL-COM_WUIMode" : "Expert" }, "path": "Device.Users.User.1." }]
//       })

//       this.get('/serviceElements/Device.Users.User.[Username=="admin"].', () => {
//         return [{ "parameters": { "Language": "", "Username": "admin", "X_PRPL-COM_HashedPassword": "$6$38af8450a915c016$vaDHAByxn67aclRfr7Fhem.OnuQdHVyY5uJv9vLe7ul6BpcbSvCeOa.b38026Pru3Ct61WW2JeTh24T5eRACs/", "Password": "", "X_PRPL-COM_HomeDirectory": "/var", "Shell": "Users.SupportedShell.2", "StaticUser": 1, "UserID": 1000, "Enable": 1, "GroupParticipation": "Users.Group.11", "RoleParticipation": "Users.Role.1", "Alias": "admin-user", "X_PRPL-COM_WUIMode" : "Expert" }, "path": "Device.Users.User.13." }]
//       })

//       this.get('/serviceElements/Device.Users.User.[Username==""].', () => {
//         return [{ "parameters": { "Language": "", "Username": "admin", "X_PRPL-COM_HashedPassword": "$6$38af8450a915c016$vaDHAByxn67aclRfr7Fhem.OnuQdHVyY5uJv9vLe7ul6BpcbSvCeOa.b38026Pru3Ct61WW2JeTh24T5eRACs/", "Password": "", "X_PRPL-COM_HomeDirectory": "/var", "Shell": "Users.SupportedShell.2", "StaticUser": 1, "UserID": 1000, "Enable": 1, "GroupParticipation": "Users.Group.11", "RoleParticipation": "Users.Role.1", "Alias": "admin-user", "X_PRPL-COM_WUIMode" : "Expert" }, "path": "Device.Users.User.13." }]
//       })

//       this.get('/serviceElements/Device.Firewall.DMZ.wanDMZ.', () => {
//         return [{ "parameters": { "RemainingLeaseTime": 0, "DestIP": "24.24.24.24", "LeaseDuration": 10000, "Interface": "Device.Logical.Interface.1.", "Status": "Disabled", "Description": "Default instance for the UI.", "X_PRPL-COM_Log": 1, "Enable": 1, "Origin": "User", "Alias": "wanDMZ", "SourcePrefix": "" }, "path": "Device.Firewall.DMZ.1." }]
//       })

//       this.get('/serviceElements/Device.Logical.Interface.1.X_PRPLWARE-COM_WAN.', () => {
//         return [{ "parameters": { "IPv4Address": "12.12.12.12", "IPv6Address": "", "Status": "Enabled" }, "path": "Device.Logical.Interface.1.X_PRPLWARE-COM_WAN." }]
//       })

//       this.get('/serviceElements/Device.WiFi.Radio.1.', () => {
//         return wifi.filter(obj => obj.path.includes("Device.WiFi.Radio.1."));
//       });

//       this.get('/serviceElements/Device.WiFi.Radio.1.DriverConfig.', () => {
//         return wifi.filter(obj => obj.path.includes("Device.WiFi.Radio.1.DriverConfig."));
//       })

//       this.get('/serviceElements/Device.WiFi.Radio.2.', () => {
//         return wifi.filter(obj => obj.path.includes("Device.WiFi.Radio.2."));
//       })

//       this.get('/serviceElements/Device.WiFi.Radio.2.DriverConfig.', () => {
//         return wifi.filter(obj => obj.path.includes("Device.WiFi.Radio.2.DriverConfig."));
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.WiFi-2G.Security.', () => {
//         return [{ "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_2g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.2.Security." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.WiFi-5G.Security.', () => {
//         return [{ "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_2g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.2.Security." }]
//       })

//       this.get('/serviceElements/Device.WiFi.SSID.1.', () => {
//         return [{ "parameters": { "Status": "Up", "LastStatusChangeTimeStamp": "2025-03-03T03:22:53Z", "SSID": "PRPL_WIFI_5G", "LowerLayers": "Device.WiFi.Radio.1", "MLDUnit": 0, "MACAddress": "18:EF:C0:00:02:84", "BSSID": "18:ef:c0:00:02:84", "LastChange": 6015, "Enable": 1, "Index": 20, "Name": "wl0", "Alias": "WiFi-5G" }, "path": "Device.WiFi.SSID.1." }, { "parameters": { "MulticastPacketsSent": 0, "ErrorsSent": 0, "BroadcastPacketsSent": 0, "BytesSent": 2443443, "PacketsSent": 5990, "BytesReceived": 0, "DiscardPacketsReceived": 124, "ErrorsReceived": 0, "MulticastPacketsReceived": 0, "UnknownProtoPacketsReceived": 0, "MultipleRetryCount": 0, "FailedRetransCount": 0, "UnicastPacketsSent": 0, "UnicastPacketsReceived": 0, "PacketsReceived": 0, "DiscardPacketsSent": 27, "RetransCount": 0, "BroadcastPacketsReceived": 0, "RetryCount": 0 }, "path": "Device.WiFi.SSID.1.Stats." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.1.Stats.WmmBytesReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.1.Stats.WmmBytesSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.1.Stats.WmmFailedBytesReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.1.Stats.WmmFailedReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.1.Stats.WmmFailedSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.1.Stats.WmmFailedbytesSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.1.Stats.WmmPacketsReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.1.Stats.WmmPacketsSent." }]
//       })

//       this.get('/serviceElements/Device.WiFi.SSID.2.', () => {
//         return [{ "parameters": { "Status": "Up", "LastStatusChangeTimeStamp": "2025-03-03T03:22:56Z", "SSID": "PRPL_WIFI_2.4G", "LowerLayers": "Device.WiFi.Radio.2", "MLDUnit": 0, "MACAddress": "18:EF:C0:00:02:85", "BSSID": "18:ef:c0:00:02:85", "LastChange": 6022, "Enable": 1, "Index": 21, "Name": "wl1", "Alias": "WiFi-2G" }, "path": "Device.WiFi.SSID.2." }, { "parameters": { "MulticastPacketsSent": 0, "ErrorsSent": 0, "BroadcastPacketsSent": 0, "BytesSent": 2431849, "PacketsSent": 5970, "BytesReceived": 0, "DiscardPacketsReceived": 50, "ErrorsReceived": 0, "MulticastPacketsReceived": 0, "UnknownProtoPacketsReceived": 0, "MultipleRetryCount": 0, "FailedRetransCount": 0, "UnicastPacketsSent": 0, "UnicastPacketsReceived": 0, "PacketsReceived": 0, "DiscardPacketsSent": 56, "RetransCount": 0, "BroadcastPacketsReceived": 0, "RetryCount": 0 }, "path": "Device.WiFi.SSID.3.Stats." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmBytesReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmBytesSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmFailedBytesReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmFailedReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmFailedSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmFailedbytesSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmPacketsReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmPacketsSent." }]
//       })

//       this.get('/serviceElements/Device.WiFi.SSID.3.', () => {
//         return [{ "parameters": { "Status": "Up", "LastStatusChangeTimeStamp": "2025-03-03T03:22:56Z", "SSID": "PRPL_WIFI_2.4G", "LowerLayers": "Device.WiFi.Radio.2", "MLDUnit": 0, "MACAddress": "18:EF:C0:00:02:85", "BSSID": "18:ef:c0:00:02:85", "LastChange": 6022, "Enable": 1, "Index": 21, "Name": "wl1", "Alias": "WiFi-2G" }, "path": "Device.WiFi.SSID.3." }, { "parameters": { "MulticastPacketsSent": 0, "ErrorsSent": 0, "BroadcastPacketsSent": 0, "BytesSent": 2431849, "PacketsSent": 5970, "BytesReceived": 0, "DiscardPacketsReceived": 50, "ErrorsReceived": 0, "MulticastPacketsReceived": 0, "UnknownProtoPacketsReceived": 0, "MultipleRetryCount": 0, "FailedRetransCount": 0, "UnicastPacketsSent": 0, "UnicastPacketsReceived": 0, "PacketsReceived": 0, "DiscardPacketsSent": 56, "RetransCount": 0, "BroadcastPacketsReceived": 0, "RetryCount": 0 }, "path": "Device.WiFi.SSID.3.Stats." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmBytesReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmBytesSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmFailedBytesReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmFailedReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmFailedSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmFailedbytesSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmPacketsReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.3.Stats.WmmPacketsSent." }]
//       })

//       this.get('/serviceElements/Device.WiFi.SSID.4.', () => {
//         return wifi.filter(iface =>
//           iface.path.includes('Device.WiFi.SSID.4.') // assuming .9. is Alias==voip
//         );
//       })

//       this.get('/serviceElements/Device.WiFi.SSID.5.', () => {
//         return [{ "parameters": { "Status": "Up", "LastStatusChangeTimeStamp": "2025-03-03T03:22:53Z", "SSID": "PRPL_WIFI_GUEST_5G", "LowerLayers": "Device.WiFi.Radio.1", "MLDUnit": 0, "MACAddress": "18:EF:C0:00:02:86", "BSSID": "18:ef:c0:00:02:86", "LastChange": 6025, "Enable": 1, "Index": 22, "Name": "wl0.1", "Alias": "wl0.2" }, "path": "Device.WiFi.SSID.5." }, { "parameters": { "MulticastPacketsSent": 0, "ErrorsSent": 0, "BroadcastPacketsSent": 0, "BytesSent": 2443443, "PacketsSent": 5990, "BytesReceived": 0, "DiscardPacketsReceived": 124, "ErrorsReceived": 0, "MulticastPacketsReceived": 0, "UnknownProtoPacketsReceived": 0, "MultipleRetryCount": 0, "FailedRetransCount": 0, "UnicastPacketsSent": 0, "UnicastPacketsReceived": 0, "PacketsReceived": 0, "DiscardPacketsSent": 27, "RetransCount": 0, "BroadcastPacketsReceived": 0, "RetryCount": 0 }, "path": "Device.WiFi.SSID.5.Stats." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.5.Stats.WmmBytesReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.5.Stats.WmmBytesSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.5.Stats.WmmFailedBytesReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.5.Stats.WmmFailedReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.5.Stats.WmmFailedSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.5.Stats.WmmFailedbytesSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.5.Stats.WmmPacketsReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.5.Stats.WmmPacketsSent." }]
//       })

//       this.get('/serviceElements/Device.WiFi.SSID.6.', () => {
//         return [{ "parameters": { "Status": "Up", "LastStatusChangeTimeStamp": "2025-03-03T03:22:56Z", "SSID": "PRPL_WIFI_GUEST_2.4G", "LowerLayers": "Device.WiFi.Radio.2", "MLDUnit": 0, "MACAddress": "18:EF:C0:00:02:87", "BSSID": "18:ef:c0:00:02:87", "LastChange": 6022, "Enable": 1, "Index": 21, "Name": "wl1.1", "Alias": "wl1.2" }, "path": "Device.WiFi.SSID.6." }, { "parameters": { "MulticastPacketsSent": 0, "ErrorsSent": 0, "BroadcastPacketsSent": 0, "BytesSent": 2431849, "PacketsSent": 5970, "BytesReceived": 0, "DiscardPacketsReceived": 50, "ErrorsReceived": 0, "MulticastPacketsReceived": 0, "UnknownProtoPacketsReceived": 0, "MultipleRetryCount": 0, "FailedRetransCount": 0, "UnicastPacketsSent": 0, "UnicastPacketsReceived": 0, "PacketsReceived": 0, "DiscardPacketsSent": 56, "RetransCount": 0, "BroadcastPacketsReceived": 0, "RetryCount": 0 }, "path": "Device.WiFi.SSID.6.Stats." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.6.Stats.WmmBytesReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.6.Stats.WmmBytesSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.6.Stats.WmmFailedBytesReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.6.Stats.WmmFailedReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.6.Stats.WmmFailedSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.6.Stats.WmmFailedbytesSent." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.6.Stats.WmmPacketsReceived." }, { "parameters": { "AC_VI": 0, "AC_BK": 0, "AC_BE": 0, "AC_VO": 0 }, "path": "Device.WiFi.SSID.6.Stats.WmmPacketsSent." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.1.', () => {
//         return [{ "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl0", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 20, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.1", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 1, "UAPSDCapability": 0, "MultiAPType": "FronthaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "WiFi-5G", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.1." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.1.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.1.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.1.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "823187368A555A92", "R0KHKey": "6B28E4B30648C21C82EE455F7B2BE8DF" }, "path": "Device.WiFi.AccessPoint.1.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.1.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.1.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.1.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.1.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.1.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_5g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.1.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.1.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "10965900", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.1.WPS." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.WiFi-5G.', () => {
//         return [{ "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl0", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 20, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.1", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 1, "UAPSDCapability": 0, "MultiAPType": "FronthaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "WiFi-5G", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.1." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.1.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.1.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.1.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "823187368A555A92", "R0KHKey": "6B28E4B30648C21C82EE455F7B2BE8DF" }, "path": "Device.WiFi.AccessPoint.1.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.1.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.1.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.1.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.1.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.1.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_5g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.1.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.1.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "10965900", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.1.WPS." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.3.', () => {
//         return [{ "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl1", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 21, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.3", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 0, "UAPSDCapability": 0, "MultiAPType": "FronthaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "WiFi-2G", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.3." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.3.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.3.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.3.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "F71E3D626F56CF8B", "R0KHKey": "6BA90189952310CF0B0E0D0E63280317" }, "path": "Device.WiFi.AccessPoint.3.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.3.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.3.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.3.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.3.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.3.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_2g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.3.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.3.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "10965900", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.3.WPS." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.WiFi-2G.', () => {
//         return [{ "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl1", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 21, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.3", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 0, "UAPSDCapability": 0, "MultiAPType": "FronthaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "WiFi-2G", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.3." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.3.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.3.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.3.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "F71E3D626F56CF8B", "R0KHKey": "6BA90189952310CF0B0E0D0E63280317" }, "path": "Device.WiFi.AccessPoint.3.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.3.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.3.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.3.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.3.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.3.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_2g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.3.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.3.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "10965900", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.3.WPS." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.5.', () => {
//         return [{ "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl0", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 20, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.5", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 1, "UAPSDCapability": 0, "MultiAPType": "FronthaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "wl0.1", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.5." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.5.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.5.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.5.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "823187368A555A92", "R0KHKey": "6B28E4B30648C21C82EE455F7B2BE8DF" }, "path": "Device.WiFi.AccessPoint.5.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.5.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.5.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.5.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.5.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.5.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_5g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.5.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.5.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "10965900", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.5.WPS." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.6.', () => {
//         return [{ "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl1", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 21, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.6", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 0, "UAPSDCapability": 0, "MultiAPType": "FronthaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "wl1.1", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.6." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.6.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.6.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.6.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "F71E3D626F56CF8B", "R0KHKey": "6BA90189952310CF0B0E0D0E63280317" }, "path": "Device.WiFi.AccessPoint.6.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.6.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.6.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.6.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.6.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.6.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_2g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.6.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.6.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "10965900", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.6.WPS." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.1.Security.', () => {
//         return [{ "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_5g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.1.Security." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.3.Security.', () => {
//         return [{ "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_2g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.3.Security." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.5.Security.', () => {
//         return [{ "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "WiFi-Guest-Password_5g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.5.Security." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.6.Security.', () => {
//         return [{ "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "WiFi-Guest-Password_2g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.6.Security." }]
//       })

//       this.get('/serviceElements/Device.Syslog.Action.', () => {
//         return [{ "parameters": { "SourceRef": "Device.Syslog.Source.1,Device.Syslog.Source.2", "TemplateRef": "Device.Syslog.Template.1", "StructuredData": 0, "FilterRef": "Device.Syslog.Filter.1", "Alias": "wifi" }, "path": "Device.Syslog.Action.1." }, { "parameters": { "Enable": 1, "VendorLogFileRef": "DeviceInfo.VendorLogFile.2", "FilePath": "file:///var/log/messages_wifi" }, "path": "Device.Syslog.Action.1.LogFile." }, { "parameters": { "Port": 514, "Address": "", "Protocol": "UDP", "Certificate": "", "X_PRPL-COM_CACertificate": "", "X_PRPL-COM_Status": "Disabled", "PeerVerify": 0, "Enable": 0 }, "path": "Device.Syslog.Action.1.LogRemote." }, { "parameters": { "SourceRef": "Device.Syslog.Source.1,Device.Syslog.Source.2", "TemplateRef": "Device.Syslog.Template.1", "StructuredData": 0, "FilterRef": "Device.Syslog.Filter.2", "Alias": "firewall" }, "path": "Device.Syslog.Action.2." }, { "parameters": { "Enable": 1, "VendorLogFileRef": "DeviceInfo.VendorLogFile.6", "FilePath": "file:///var/log/messages_firewall" }, "path": "Device.Syslog.Action.2.LogFile." }, { "parameters": { "Port": 514, "Address": "", "Protocol": "UDP", "Certificate": "", "X_PRPL-COM_CACertificate": "", "X_PRPL-COM_Status": "Disabled", "PeerVerify": 0, "Enable": 0 }, "path": "Device.Syslog.Action.2.LogRemote." }, { "parameters": { "SourceRef": "Device.Syslog.Source.1", "TemplateRef": "Device.Syslog.Template.1", "StructuredData": 0, "FilterRef": "Device.Syslog.Filter.3", "Alias": "dhcp" }, "path": "Device.Syslog.Action.3." }, { "parameters": { "Enable": 1, "VendorLogFileRef": "DeviceInfo.VendorLogFile.4", "FilePath": "file:///var/log/messages_dhcp" }, "path": "Device.Syslog.Action.3.LogFile." }, { "parameters": { "Port": 514, "Address": "", "Protocol": "UDP", "Certificate": "", "X_PRPL-COM_CACertificate": "", "X_PRPL-COM_Status": "Disabled", "PeerVerify": 0, "Enable": 0 }, "path": "Device.Syslog.Action.3.LogRemote." }, { "parameters": { "SourceRef": "Device.Syslog.Source.1", "TemplateRef": "Device.Syslog.Template.1", "StructuredData": 0, "FilterRef": "Device.Syslog.Filter.4", "Alias": "lcm" }, "path": "Device.Syslog.Action.4." }, { "parameters": { "Enable": 1, "VendorLogFileRef": "DeviceInfo.VendorLogFile.5", "FilePath": "file:///var/log/messages_lcm.log" }, "path": "Device.Syslog.Action.4.LogFile." }, { "parameters": { "Port": 514, "Address": "", "Protocol": "UDP", "Certificate": "", "X_PRPL-COM_CACertificate": "", "X_PRPL-COM_Status": "Disabled", "PeerVerify": 0, "Enable": 0 }, "path": "Device.Syslog.Action.4.LogRemote." }, { "parameters": { "SourceRef": "Device.Syslog.Source.1,Device.Syslog.Source.2,Device.Syslog.Source.3", "TemplateRef": "Device.Syslog.Template.1", "StructuredData": 0, "FilterRef": "", "Alias": "messages" }, "path": "Device.Syslog.Action.5." }, { "parameters": { "Enable": 1, "VendorLogFileRef": "DeviceInfo.VendorLogFile.3", "FilePath": "file:///var/log/messages" }, "path": "Device.Syslog.Action.5.LogFile." }, { "parameters": { "Port": 514, "Address": "", "Protocol": "UDP", "Certificate": "", "X_PRPL-COM_CACertificate": "", "X_PRPL-COM_Status": "Disabled", "PeerVerify": 0, "Enable": 0 }, "path": "Device.Syslog.Action.5.LogRemote." }, { "parameters": { "SourceRef": "Device.Syslog.Source.1,Device.Syslog.Source.2,Device.Syslog.Source.3", "TemplateRef": "", "StructuredData": 0, "FilterRef": "", "Alias": "messages_remote" }, "path": "Device.Syslog.Action.6." }, { "parameters": { "Enable": 0, "VendorLogFileRef": "", "FilePath": "" }, "path": "Device.Syslog.Action.6.LogFile." }, { "parameters": { "Port": 514, "Address": "", "Protocol": "UDP", "Certificate": "", "X_PRPL-COM_CACertificate": "", "X_PRPL-COM_Status": "Disabled", "PeerVerify": 0, "Enable": 0 }, "path": "Device.Syslog.Action.6.LogRemote." }]
//       })

//       this.get('/serviceElements/Device.Syslog.Action.messages.LogFile.', () => {
//         return [{ "parameters": { "Enable": 1, "VendorLogFileRef": "DeviceInfo.VendorLogFile.3", "FilePath": "file:///mnt/log/messages" }, "path": "Device.Syslog.Action.5.LogFile." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.[Alias=="wl0"].', () => {
//         return [{ "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl0", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 20, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.1", "MACFilterAddressList": "00:11:22:33:44:55", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 1, "UAPSDCapability": 0, "MultiAPType": "FronthaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "WiFi-5G", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.1." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.1.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.1.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.1.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "C70228F30E9B2DA3", "R0KHKey": "F65476089171DBDFBFDD8774DD9F8AC0" }, "path": "Device.WiFi.AccessPoint.1.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.1.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.1.MACFiltering." }, { "parameters": { "Alias": "cpe-Entry-1", "MACAddress": "00:11:22:33:44:55" }, "path": "Device.WiFi.AccessPoint.1.MACFiltering.Entry.1." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.1.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.1.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.1.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_5g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.1.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.1.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "40873763", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.1.WPS." }]
//       })

//       this.get('/serviceElements/Device.WiFi.AccessPoint.[Alias=="wl1"].', () => {
//         return [{ "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl1", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 21, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.3", "MACFilterAddressList": "66:55:44:33:22:11", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 1, "UAPSDCapability": 0, "MultiAPType": "FronthaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "WiFi-2G", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.3." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.3.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.3.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.3.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "C254CA1EE24C3CD1", "R0KHKey": "2CA69A27882C01599CF40BD96E71A781" }, "path": "Device.WiFi.AccessPoint.3.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.3.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.3.MACFiltering." }, { "parameters": { "Alias": "cpe-Entry-1", "MACAddress": "66:55:44:33:22:11" }, "path": "Device.WiFi.AccessPoint.3.MACFiltering.Entry.1." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.3.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.3.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.3.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_2g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.3.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.3.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "40873763", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.3.WPS." }]
//       })

//       this.get('/serviceElements/Device.Hosts.Host.', () => {
//         return hosts_host;
//       })
//       this.get('/serviceElements/Device.WiFi.AccessPoint.', () => {
//         return [{ "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl0", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 20, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.1", "MACFilterAddressList": "00:11:22:33:44:55", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 1, "UAPSDCapability": 0, "MultiAPType": "FronthaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "WiFi-5G", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.1." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.1.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.1.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.1.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.1.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "F1667E66CBEB470D", "R0KHKey": "A2FD887F5CA50821810C4A130A90D147" }, "path": "Device.WiFi.AccessPoint.1.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.1.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.1.MACFiltering." }, { "parameters": { "Alias": "testmac", "MACAddress": "00:11:22:33:44:55" }, "path": "Device.WiFi.AccessPoint.1.MACFiltering.Entry.3." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.1.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.1.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.1.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_5g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.1.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.1.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "29858873", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.1.WPS." }, { "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl0", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 29, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.2", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 1, "UAPSDCapability": 0, "MultiAPType": "BackhaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 0, "Alias": "wl0.1", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.2." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.2.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.2.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.2.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.2.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.2.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.2.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.2.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "A9C972AD28EA3D15", "R0KHKey": "F693DD72FBC5725B048D0FC1500B3B8F" }, "path": "Device.WiFi.AccessPoint.2.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.2.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.2.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.2.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.2.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.2.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "BackhaulPassword", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.2.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.2.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "29858873", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.2.WPS." }, { "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl1", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 21, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.3", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 1, "UAPSDCapability": 0, "MultiAPType": "FronthaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "wl1", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.3." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.3.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.3.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.3.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.3.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "960F1032149DC132", "R0KHKey": "0732B4F13D653BDAC6F2414463CF0569" }, "path": "Device.WiFi.AccessPoint.3.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.3.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.3.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.3.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.3.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.3.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "FronthaulPassword_2g", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.3.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.3.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "29858873", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.3.WPS." }, { "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl1", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-lan", "Index": 30, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 1, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Data", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.4", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 1, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 1, "UAPSDCapability": 0, "MultiAPType": "BackhaulBSS", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 0, "Alias": "wl1.1", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.4." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.4.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.4.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.4.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.4.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.4.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.4.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.4.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "08694D8EF6D4F5DC", "R0KHKey": "0650E28CB718B8BB9C06C8EAF6775C73" }, "path": "Device.WiFi.AccessPoint.4.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.4.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.4.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.4.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.4.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.4.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "BackhaulPassword", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.4.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.4.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "SetupLocked", "CertModeEnable": 0, "SelfPIN": "29858873", "Enable": 1, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.4.WPS." }, { "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl0", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-guest", "Index": 27, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 0, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Guest", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.5", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 0, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 0, "UAPSDCapability": 0, "MultiAPType": "", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "wl0.2", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.5." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.5.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.5.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.5.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.5.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "A2DF79AA69CAF4CB", "R0KHKey": "B3853EAA3B4F948FF663704770F525E2" }, "path": "Device.WiFi.AccessPoint.5.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.5.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.5.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.5.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.5.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.5.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "passwordGuest", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.5.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.5.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "Disabled", "CertModeEnable": 0, "SelfPIN": "29858873", "Enable": 0, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.5.WPS." }, { "parameters": { "MultiAPProfile": 0, "MBOAssocDisallowReason": "Off", "RadioReference": "WiFi.Radio.Wl1", "ActiveVideoAssociatedDeviceNumberOfEntries": 0, "WMMCapability": 0, "UAPSDEnable": 0, "BridgeInterface": "br-guest", "Index": 28, "MaxAssociatedDevices": 32, "IEEE80211kEnabled": 0, "DiscoveryMethodEnabled": "Default", "CpeOperationMode": "Router", "ActiveAssociatedDeviceNumberOfEntries": 0, "DefaultDeviceType": "Guest", "RetryLimit": 3, "MCEnable": 0, "MBOEnable": 0, "IsolationEnable": 0, "AssociatedDeviceNumberOfEntries": 0, "SSIDReference": "Device.WiFi.SSID.6", "MACFilterAddressList": "", "Status": "Enabled", "Enable": 0, "APBridgeDisable": 0, "MACAddressControlEnabled": 0, "dbgAPFile": "", "ReferenceApRelay": "", "WMMEnable": 0, "WDSEnable": 0, "UAPSDCapability": 0, "MultiAPType": "", "MultiAPVlanId": 0, "ApRole": "Off", "SSIDAdvertisementEnabled": 1, "Alias": "wl1.2", "dbgAPEnable": 0 }, "path": "Device.WiFi.AccessPoint.6." }, { "parameters": { "Fail": 0, "FastReconnects": 0, "ResetCounters": 0, "FailSecurity": 0, "Success": 0, "Disconnect": 0 }, "path": "Device.WiFi.AccessPoint.6.AssociationCount." }, { "parameters": { "Count": 0, "Type": "Default" }, "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.1." }, { "parameters": { "Count": 0, "Type": "OnStateChange" }, "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.2." }, { "parameters": { "Count": 0, "Type": "OnScan" }, "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.3." }, { "parameters": { "Count": 0, "Type": "User" }, "path": "Device.WiFi.AccessPoint.6.AssociationCount.FastReconnectTypes.4." }, { "parameters": { "BssMaxIdlePeriod": -1 }, "path": "Device.WiFi.AccessPoint.6.DriverConfig." }, { "parameters": { "AccessNetworkType": 2, "L2TrafficInspect": "", "Enable": 0, "DgafDisable": 0, "VenueGroup": 2, "Interworking": 1, "Internet": 0, "Additional": 0, "IcmpV4Echo": 1, "VenueName": "", "VenueType": 8, "WanMetrics": "", "DomainName": "", "Hs2Ie": 0, "RoamingConsortium": "", "OperatingClass": "", "HeSSID": "", "P2PEnable": 0, "GasDelay": 0, "Anqp3gpp_CellNet": "" }, "path": "Device.WiFi.AccessPoint.6.HotSpot2." }, { "parameters": { "Enabled": 0, "FTOverDSEnable": 0, "MobilityDomain": 0, "NASIdentifier": "6AAB508D04C72159", "R0KHKey": "193E4CBB1D641EDDA6EBBC08B0AD237E" }, "path": "Device.WiFi.AccessPoint.6.IEEE80211r." }, { "parameters": { "InterworkingEnable": 0, "QoSMapSet": "" }, "path": "Device.WiFi.AccessPoint.6.IEEE80211u." }, { "parameters": { "TempBlacklistEnable": 1, "Mode": "Off" }, "path": "Device.WiFi.AccessPoint.6.MACFiltering." }, { "parameters": { "ErrorsSent": 0, "MulticastBytesReceived": 0, "BroadcastBytesSent": 0, "PacketsSent": 0, "EstServiceParametersVI": "", "UnicastBytesSent": 0, "BroadcastBytesReceived": 0, "EstServiceParametersVO": "", "LinkID": 0, "EstServiceParametersBE": "", "UnicastBytesReceived": 0, "MLORole": "", "PacketsReceived": 0, "EstServiceParametersBK": "", "MulticastBytesSent": 0 }, "path": "Device.WiFi.AccessPoint.6.MLOStats." }, { "parameters": {}, "path": "Device.WiFi.AccessPoint.6.ProbeFiltering." }, { "parameters": { "RssiInterval": 10, "HistoryEnable": 1, "HistoryIntervalCoeff": 1, "Enable": 0, "SendEventOnDisassoc": 1, "AveragingFactor": 500, "Interval": 1000, "HistoryLen": 10, "SendPeriodicEvent": 0, "SendEventOnAssoc": 1 }, "path": "Device.WiFi.AccessPoint.6.RssiEventing." }, { "parameters": { "RadiusCalledStationId": "", "MFPConfig": "Disabled", "SAEPassphrase": "", "RadiusOwnIPAddress": "", "RadiusChargeableUserId": 0, "EncryptionMode": "Default", "RadiusNASIdentifier": "", "RekeyingInterval": 3600, "OWETransitionInterface": "", "ModesAvailable": "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal", "ModeEnabled": "WPA2-WPA3-Personal", "RadiusServerPort": 1812, "RadiusSecret": "", "TransitionDisable": "", "KeyPassPhrase": "passwordGuest", "SHA256Enable": 0, "ModesSupported": "None,WEP-64,WEP-128,WEP-128iv,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise", "PreSharedKey": "", "RadiusServerIPAddr": "", "RadiusDefaultSessionTimeout": 0, "WEPKey": "123456789ABCD", "SPPAmsdu": -1 }, "path": "Device.WiFi.AccessPoint.6.Security." }, { "parameters": { "Enable": 0 }, "path": "Device.WiFi.AccessPoint.6.VendorIEs." }, { "parameters": { "RestartOnRequest": 0, "ConfigMethodsEnabled": "Display,PIN,PhysicalPushButton,VirtualPushButton,VirtualDisplay", "PairingInProgress": 0, "Status": "Disabled", "CertModeEnable": 0, "SelfPIN": "29858873", "Enable": 0, "UUID": "454c595a-5744-f444-f446-4c44454c595a", "ConfigMethodsSupported": "Label,Display,PushButton,PIN,PhysicalPushButton,PhysicalDisplay,VirtualPushButton,VirtualDisplay", "RelayCredentialsEnable": 0, "Version": "2.0", "Configured": 1 }, "path": "Device.WiFi.AccessPoint.6.WPS." }]
//       })
//       this.get('/serviceElements/Device.CaptivePortal.', () => {
//         return [
//           {
//             "parameters": {
//               "AllowedList": "",
//               "Enable": 0,
//               "Status": "Enabled",
//               "URL": "",
//             },
//             "path": "Device.CaptivePortal."
//           }
//         ]
//       })
//       this.get('/serviceElements/Device.X_FASTWEB_AppCfg.', () => {
//         if (logon_user == 'root'){
//             return [{"parameters": {"FastWebUI": 0,},"path": "Device.X_FASTWEB_AppCfg."}];
//         }else{
//             return [{"parameters": {"FastWebUI": 1,},"path": "Device.X_FASTWEB_AppCfg."}];
//         }
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.X_PRPLWARE-COM_RingScheduleService.',()=>{
//         return ring_sched;
//       });
//       this.get('/serviceElements/Device.Services.VoiceService.1.X_PRPLWARE-COM_RingScheduleService.RingSchedule.',()=>{
//         return ring_sched;
//       });

//       this.get('/serviceElements/Device.Services.VoiceService.1.X_FASTWEB_RingScheduleService.',()=>{
//         return ring_sched;
//       });
//       this.get('/serviceElements/Device.Services.VoiceService.1.X_FASTWEB_RingScheduleService.RingSchedule.',()=>{
//         return ring_sched;
//       });

//       //defaults. always put this at last

//       this.get('/serviceElements/Device.PPP.Interface.1.', () => {
//         return [{ "parameters": { "Username": "softathome", "Password": "", "Status": "NotPresent", "ConnectionTrigger": "AlwaysOn", "LowerLayers": "", "IPv6CPEnable": 0, "ConnectionStatus": "Unconfigured", "Enable": 0, "Name": "pppoe-wan", "AutoDisconnectTime": 0, "LastConnectionError": "ERROR_NONE", "CompressionProtocol": "None", "CurrentMRUSize": 1500, "AuthenticationProtocol": "None", "LastChange": 8268, "LCPEcho": 15, "LCPEchoRetry": 5, "EncryptionProtocol": "None", "IPCPEnable": 1, "WarnDisconnectDelay": 0, "IdleDisconnectTime": 0, "Alias": "wan", "MaxMRUSize": 1500 }, "path": "Device.PPP.Interface.1." }, { "parameters": { "RemoteIPAddress": "", "LocalIPAddress": "", "DNSServers": "", "PassthroughEnable": 1, "PassthroughDHCPPool": "" }, "path": "Device.PPP.Interface.1.IPCP." }, { "parameters": { "RemoteInterfaceIdentifier": "", "LocalInterfaceIdentifier": "" }, "path": "Device.PPP.Interface.1.IPv6CP." }, { "parameters": { "ServiceName": "", "SessionID": 1, "ACName": "" }, "path": "Device.PPP.Interface.1.PPPoE." }, { "parameters": { "MulticastPacketsSent": 0, "ErrorsSent": 0, "BroadcastPacketsSent": 0, "BytesSent": 0, "PacketsSent": 0, "BytesReceived": 0, "DiscardPacketsReceived": 0, "ErrorsReceived": 0, "MulticastPacketsReceived": 0, "UnknownProtoPacketsReceived": 0, "UnicastPacketsSent": 0, "UnicastPacketsReceived": 0, "PacketsReceived": 0, "DiscardPacketsSent": 0, "BroadcastPacketsReceived": 0 }, "path": "Device.PPP.Interface.1.Stats." }]
//       })

//       this.get('/serviceElements/Device.PPP.Interface.1.IPCP.', () => {
//         return ppp.filter(rule => rule.path.includes('Device.PPP.Interface.1.IPCP.'));
//       })

//       this.get('/serviceElements/Device.Ethernet.VLANTermination.', () => {
//         return vlantermination
//       })

//       this.get('/serviceElements/Device.Ethernet.VLANTermination.[Alias=="wan"].LowerLayers', () => {
//         return [
//           {
//             "parameters": {
//               "LowerLayers": "Device.Ethernet.Link.2."
//             },
//             "path": "Device.Ethernet.VLANTermination.1."
//           }
//         ];
//       })

//       this.get('/serviceElements/Device.Routing.', () => {
//         return routing;
//       });

//       this.get('/serviceElements/Device.Services.VoiceService.1.', () => {
//         return serviceVoiceservice1.filter(iface =>
//           iface.path.includes('Device.Services.VoiceService.1.')
//         );
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.SIP.', () => {
//         return [{ "parameters": { "RegistrarNumberOfEntries": 0, "ProxyNumberOfEntries": 0, "NetworkNumberOfEntries": 1, "ClientNumberOfEntries": 2 }, "path": "Device.Services.VoiceService.1.SIP." }, { "parameters": { "X_PRPLWARE-COM_DisplayName": "", "RegisterURI": "", "MaxSessions": 0, "Status": "Disabled", "Enable": 0, "RegisterMode": "RFC3261", "T38Enable": 0, "E164Format": 1, "SIPEventSubscribeNumberOfEntries": 0, "AuthPassword": "", "ContactNumberOfEntries": 0, "Origin": "Static", "Alias": "SIP_Client_1", "Network": "", "AuthUserName": "", "QuiescentMode": 0 }, "path": "Device.Services.VoiceService.1.SIP.Client.1." }, { "parameters": { "X_PRPLWARE-COM_DisplayName": "", "RegisterURI": "", "MaxSessions": 0, "Status": "Disabled", "Enable": 0, "RegisterMode": "RFC3261", "T38Enable": 0, "E164Format": 1, "SIPEventSubscribeNumberOfEntries": 0, "AuthPassword": "", "ContactNumberOfEntries": 0, "Origin": "Static", "Alias": "SIP_Client_2", "Network": "", "AuthUserName": "", "QuiescentMode": 0 }, "path": "Device.Services.VoiceService.1.SIP.Client.2." }, { "parameters": { "TimerI": 500, "TimerJ": 500, "TimerK": 32000, "DSCPMark": 46, "InboundAuthUsername": "", "InboundAuthPassword": "", "ProxyServerTransport": "UDP", "ChosenPort": 0, "TimerT1": 500, "UserAgentPort": 5060, "TimerT2": 1000, "TimerT4": 4000, "RegistrationPeriod": 3600, "InviteExpires": 32000, "ChosenIPAddress": "", "RegistrarServer": "", "RegistrarServerPort": 5060, "RegisterRetryInterval": 32, "OutboundProxy": "", "Organization": "", "OutboundProxyPrecedence": "Static", "RegisterExpires": 3600, "ChosenDomain": "", "STUNServer": "", "Status": "Disabled", "UserAgentDomain": "", "OutboundProxyPort": 5060, "EthernetPriorityMark": 5, "Enable": 0, "STUNEnable": 0, "RegistrarServerTransport": "UDP", "UserAgentTransport": "UDP", "ProxyServer": "", "ReInviteExpires": 32000, "UseCodecPriorityInSDPResponse": 0, "ServerDomain": "UDP", "Realm": "", "TimerA": 500, "TimerB": 32000, "InboundAuth": "None", "OutboundProxyResolvedAddress": "", "ProxyServerPort": 5060, "TimerC": 500, "TimerD": 1000, "Alias": "SIP_Network_1", "TimerE": 500, "TimerF": 32000, "NonVoiceBandwidthReservedDownstream": 0, "QuiescentMode": 0, "TimerG": 500, "NonVoiceBandwidthReservedUpstream": 0, "TimerH": 32000, "VLANIDMark": 0 }, "path": "Device.Services.VoiceService.1.SIP.Network.1." }]
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.SIP.Network.1.', () => {
//         return [{"parameters":{"TimerI":500,"TimerJ":500,"TimerK":32000,"DSCPMark":46,"InboundAuthUsername":"","InboundAuthPassword":"","ProxyServerTransport":"UDP","ChosenPort":0,"TimerT1":500,"UserAgentPort":5060,"TimerT2":1000,"TimerT4":4000,"RegistrationPeriod":3600,"InviteExpires":32000,"ChosenIPAddress":"","RegistrarServer":"","RegistrarServerPort":5060,"RegisterRetryInterval":5,"OutboundProxy":"ims.vodafone.it","Organization":"","OutboundProxyPrecedence":"Static","RegisterExpires":3600,"ChosenDomain":"","STUNServer":"","Status":"Disabled","UserAgentDomain":"ims.vodafone.it","OutboundProxyPort":5060,"EthernetPriorityMark":6,"Enable":0,"STUNEnable":0,"RegistrarServerTransport":"UDP","UserAgentTransport":"UDP","ProxyServer":"ims.vodafone.it","ReInviteExpires":32000,"UseCodecPriorityInSDPResponse":0,"ServerDomain":"ims.vodafone.it","Realm":"","TimerA":500,"TimerB":32000,"InboundAuth":"None","OutboundProxyResolvedAddress":"","ProxyServerPort":5060,"TimerC":500,"TimerD":1000,"Alias":"SIP_Network_1","TimerE":500,"TimerF":32000,"NonVoiceBandwidthReservedDownstream":0,"QuiescentMode":0,"TimerG":500,"NonVoiceBandwidthReservedUpstream":0,"TimerH":32000,"VLANIDMark":0},"path":"Device.Services.VoiceService.1.SIP.Network.1."}]
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.SIP.Client.1.', () => {
//         return [{"parameters":{"X_PRPLWARE-COM_DisplayName":"Main","RegisterURI":"+7030","MaxSessions":0,"Status":"Disabled","Enable":1,"RegisterMode":"RFC3261","T38Enable":0,"E164Format":1,"SIPEventSubscribeNumberOfEntries":0,"AuthPassword":"admin","ContactNumberOfEntries":0,"Origin":"Static","Alias":"SIP_Client_1","Network":"","AuthUserName":"+7030","QuiescentMode":0},"path":"Device.Services.VoiceService.1.SIP.Client.1."}]
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.SIP.Client.2.', () => {
//         return [{"parameters":{"X_PRPLWARE-COM_DisplayName":"Secondary","RegisterURI":"7031","MaxSessions":0,"Status":"Disabled","Enable":1,"RegisterMode":"RFC3261","T38Enable":0,"E164Format":1,"SIPEventSubscribeNumberOfEntries":0,"AuthPassword":"admin","ContactNumberOfEntries":0,"Origin":"Static","Alias":"SIP_Client_2","Network":"","AuthUserName":"7031","QuiescentMode":0},"path":"Device.Services.VoiceService.1.SIP.Client.2."}]
//       })

//       this.get('/serviceElements/Device.X_PRPL-COM_WiFiScheduler.', () => {
//         return [{ "parameters": { "Enable": 1, "EnableMethod": "Parameter", "GlobalTargetConfig": "WiFi.X_SC_Schedule", "GroupTargetConfig": "WiFi.X_SC_Schedule.List" }, "path": "Device.X_PRPL-COM_WiFiScheduler." }, { "parameters": {}, "path": "Device.X_PRPL-COM_WiFiScheduler.Network." }, { "parameters": { "Enable": 0, "StartTime": "11:00", "Duration": 11100, "Alias": "cpe-Schedule-1", "Day": "monday,tuesday,friday", "Running": 0 }, "path": "Device.X_PRPL-COM_WiFiScheduler.Network.Schedule.1." }]
//       })

//       this.get('/serviceElements/Device.WiFi.X_SC_Schedule.', () => {
//         return [{ "parameters": { "Enable": 0, "WiFiEnable": 0, "ListNumberOfEntries": 0 }, "path": "Device.WiFi.X_SC_Schedule." }]
//       })

//       this.get('/serviceElements/Device.Hosts.AccessControl.', () => {
//         return []
//       })

//       this.get('/serviceElements/Device.IP.Interface.mgmt.', () => {
//         return [{ "parameters": { "AutoIPEnable": 0, "IPv4AddressNumberOfEntries": 1, "IPv6AddressNumberOfEntries": 0, "Status": "Up", "LowerLayers": "Device.Ethernet.VLANTermination.4.", "MaxMTUSize": 1500, "Enable": 1, "IPv6Enable": 0, "Reset": 0, "Name": "vlan_mgmt", "Router": "Device.Routing.Router.ETH_MGMT.", "X_PRPL-COM_Description": "", "Type": "Normal", "Loopback": 0, "IPv4Enable": 1, "IPv6PrefixNumberOfEntries": 0, "ULAEnable": 0, "LastChange": 1999, "Alias": "mgmt" }, "path": "Device.IP.Interface.10." }, { "parameters": { "Enable": 1, "IPAddress": "172.16.30.42", "SubnetMask": "255.255.255.0", "AddressingType": "DHCP", "Status": "Enabled", "Alias": "primary" }, "path": "Device.IP.Interface.10.IPv4Address.1." }, { "parameters": { "MulticastPacketsSent": 0, "ErrorsSent": 0, "BroadcastPacketsSent": 0, "BytesSent": 12480, "PacketsSent": 26, "BytesReceived": 62046, "DiscardPacketsReceived": 0, "ErrorsReceived": 0, "MulticastPacketsReceived": 0, "UnknownProtoPacketsReceived": 0, "UnicastPacketsSent": 0, "UnicastPacketsReceived": 0, "PacketsReceived": 492, "DiscardPacketsSent": 0, "BroadcastPacketsReceived": 0 }, "path": "Device.IP.Interface.10.Stats." }, { "parameters": { "NeighborReachableTime": 30000 }, "path": "Device.IP.Interface.10.X_PRPL-COM_IPv4Config." }, { "parameters": { "NeighborReachableTime": 30000 }, "path": "Device.IP.Interface.10.X_PRPL-COM_IPv6Config." }]
//       })

//       this.get('/serviceElements/Device.IP.Interface.[Alias=="guest"].', () => {
//         return ip.filter(iface =>
//           iface.path.includes('Device.IP.Interface.5.') // assuming .9. is Alias==voip
//         );
//       })

//       this.get('/serviceElements/Device.IP.Interface.2.', () => {
//         return ip.filter(iface =>
//           iface.path.includes('Device.IP.Interface.2.') // assuming .9. is Alias==voip
//         );
//       })
//       this.get('/serviceElements/Device.IP.Interface.9.', () => {
//         return ip.filter(iface =>
//           iface.path.includes('Device.IP.Interface.9.')
//         );
//       })

//       this.get('/serviceElements/Device.Logical.Interface.[Alias=="lan"].', () => {
//         return logical.filter(iface =>
//           iface.path.includes('Device.Logical.Interface.3.') // assuming .9. is Alias==voip
//         );
//       })

//       this.get('/serviceElements/Device.IP.Interface.voip.', () => {
//         return ip.filter(iface =>
//           iface.path.includes('Device.IP.Interface.9.') // assuming .9. is Alias==voip
//         );
//       })

//       this.get('/serviceElements/Device.IP.Interface.iptv.', () => {
//         return [{ "parameters": { "AutoIPEnable": 0, "IPv4AddressNumberOfEntries": 1, "IPv6AddressNumberOfEntries": 0, "Status": "Up", "LowerLayers": "Device.Ethernet.VLANTermination.2.", "MaxMTUSize": 1500, "Enable": 1, "IPv6Enable": 0, "Reset": 0, "Name": "vlan_iptv", "Router": "Device.Routing.Router.ETH_IPTV.", "X_PRPL-COM_Description": "", "Type": "Normal", "Loopback": 0, "IPv4Enable": 1, "IPv6PrefixNumberOfEntries": 0, "ULAEnable": 0, "LastChange": 1975, "Alias": "iptv" }, "path": "Device.IP.Interface.9." }, { "parameters": { "Enable": 1, "IPAddress": "172.16.25.197", "SubnetMask": "255.255.255.0", "AddressingType": "DHCP", "Status": "Enabled", "Alias": "primary" }, "path": "Device.IP.Interface.9.IPv4Address.1." }, { "parameters": { "MulticastPacketsSent": 0, "ErrorsSent": 0, "BroadcastPacketsSent": 0, "BytesSent": 1794, "PacketsSent": 12, "BytesReceived": 29458, "DiscardPacketsReceived": 0, "ErrorsReceived": 0, "MulticastPacketsReceived": 0, "UnknownProtoPacketsReceived": 0, "UnicastPacketsSent": 0, "UnicastPacketsReceived": 0, "PacketsReceived": 313, "DiscardPacketsSent": 0, "BroadcastPacketsReceived": 0 }, "path": "Device.IP.Interface.9.Stats." }, { "parameters": { "NeighborReachableTime": 30000 }, "path": "Device.IP.Interface.9.X_PRPL-COM_IPv4Config." }, { "parameters": { "NeighborReachableTime": 30000 }, "path": "Device.IP.Interface.9.X_PRPL-COM_IPv6Config." }]
//       })

//       this.get('/serviceElements/Device.Ethernet.Link.', () => {
//         return [{"parameters":{"PriorityTagging":0,"Status":"Up","LowerLayers":"","MACAddress":"00:00:00:00:00:00","LastChange":286224,"Enable":1,"Name":"lo","Alias":"link_lo","FlowControl":0},"path":"Device.Ethernet.Link.1."},{"parameters":{"MulticastPacketsSent":0,"ErrorsSent":0,"BroadcastPacketsSent":0,"BytesSent":2006623660,"PacketsSent":6378433,"BytesReceived":2006623660,"DiscardPacketsReceived":0,"ErrorsReceived":0,"MulticastPacketsReceived":0,"UnknownProtoPacketsReceived":0,"UnicastPacketsSent":0,"UnicastPacketsReceived":0,"PacketsReceived":6378433,"DiscardPacketsSent":0,"BroadcastPacketsReceived":0},"path":"Device.Ethernet.Link.1.Stats."},{"parameters":{"PriorityTagging":0,"Status":"Up","LowerLayers":"Device.Ethernet.Interface.1.","MACAddress":"7E:51:56:32:D8:0A","LastChange":286219,"Enable":1,"Name":"eth0","Alias":"ethernet_wan","FlowControl":0},"path":"Device.Ethernet.Link.2."},{"parameters":{"MulticastPacketsSent":0,"ErrorsSent":0,"BroadcastPacketsSent":0,"BytesSent":99444917,"PacketsSent":526396,"BytesReceived":4022243629,"DiscardPacketsReceived":0,"ErrorsReceived":0,"MulticastPacketsReceived":0,"UnknownProtoPacketsReceived":0,"UnicastPacketsSent":0,"UnicastPacketsReceived":0,"PacketsReceived":242770074,"DiscardPacketsSent":0,"BroadcastPacketsReceived":0},"path":"Device.Ethernet.Link.2.Stats."},{"parameters":{"PriorityTagging":0,"Status":"Up","LowerLayers":"Device.Bridging.Bridge.1.Port.1.","MACAddress":"7E:51:56:32:D8:07","LastChange":286219,"Enable":1,"Name":"br-lan","Alias":"bridge_lan","FlowControl":0},"path":"Device.Ethernet.Link.3."},{"parameters":{"MulticastPacketsSent":0,"ErrorsSent":0,"BroadcastPacketsSent":0,"BytesSent":1662203690,"PacketsSent":2283318,"BytesReceived":727591495,"DiscardPacketsReceived":0,"ErrorsReceived":0,"MulticastPacketsReceived":0,"UnknownProtoPacketsReceived":0,"UnicastPacketsSent":0,"UnicastPacketsReceived":0,"PacketsReceived":3618568,"DiscardPacketsSent":0,"BroadcastPacketsReceived":0},"path":"Device.Ethernet.Link.3.Stats."},{"parameters":{"PriorityTagging":0,"Status":"Down","LowerLayers":"Device.Bridging.Bridge.2.Port.1.","MACAddress":"7E:51:56:32:D8:08","LastChange":286221,"Enable":1,"Name":"br-guest","Alias":"bridge_guest","FlowControl":0},"path":"Device.Ethernet.Link.4."},{"parameters":{"MulticastPacketsSent":0,"ErrorsSent":0,"BroadcastPacketsSent":0,"BytesSent":0,"PacketsSent":0,"BytesReceived":0,"DiscardPacketsReceived":0,"ErrorsReceived":0,"MulticastPacketsReceived":0,"UnknownProtoPacketsReceived":0,"UnicastPacketsSent":0,"UnicastPacketsReceived":0,"PacketsReceived":0,"DiscardPacketsSent":0,"BroadcastPacketsReceived":0},"path":"Device.Ethernet.Link.4.Stats."},{"parameters":{"PriorityTagging":0,"Status":"Down","LowerLayers":"Device.Bridging.Bridge.3.Port.1.","MACAddress":"7E:51:56:32:D8:09","LastChange":286221,"Enable":1,"Name":"br-lcm","Alias":"bridge_lcm","FlowControl":0},"path":"Device.Ethernet.Link.5."},{"parameters":{"MulticastPacketsSent":0,"ErrorsSent":0,"BroadcastPacketsSent":0,"BytesSent":0,"PacketsSent":0,"BytesReceived":0,"DiscardPacketsReceived":0,"ErrorsReceived":0,"MulticastPacketsReceived":0,"UnknownProtoPacketsReceived":0,"UnicastPacketsSent":0,"UnicastPacketsReceived":0,"PacketsReceived":0,"DiscardPacketsSent":0,"BroadcastPacketsReceived":0},"path":"Device.Ethernet.Link.5.Stats."},{"parameters":{"PriorityTagging":0,"Status":"Error","LowerLayers":"Device.XPON.ONU.1.EthernetUNI.1.","MACAddress":"","LastChange":286224,"Enable":1,"Name":"veip0","Alias":"eth_xpon","FlowControl":0},"path":"Device.Ethernet.Link.6."},{"parameters":{"MulticastPacketsSent":0,"ErrorsSent":0,"BroadcastPacketsSent":0,"BytesSent":0,"PacketsSent":0,"BytesReceived":0,"DiscardPacketsReceived":0,"ErrorsReceived":0,"MulticastPacketsReceived":0,"UnknownProtoPacketsReceived":0,"UnicastPacketsSent":0,"UnicastPacketsReceived":0,"PacketsReceived":0,"DiscardPacketsSent":0,"BroadcastPacketsReceived":0},"path":"Device.Ethernet.Link.6.Stats."},{"parameters":{"PriorityTagging":0,"Status":"Error","LowerLayers":"Device.Cellular.Interface.1.","MACAddress":"","LastChange":286224,"Enable":1,"Name":"wwan0","Alias":"wwan","FlowControl":0},"path":"Device.Ethernet.Link.7."},{"parameters":{"MulticastPacketsSent":0,"ErrorsSent":0,"BroadcastPacketsSent":0,"BytesSent":0,"PacketsSent":0,"BytesReceived":0,"DiscardPacketsReceived":0,"ErrorsReceived":0,"MulticastPacketsReceived":0,"UnknownProtoPacketsReceived":0,"UnicastPacketsSent":0,"UnicastPacketsReceived":0,"PacketsReceived":0,"DiscardPacketsSent":0,"BroadcastPacketsReceived":0},"path":"Device.Ethernet.Link.7.Stats."}]
//       })

//       this.get('/serviceElements/Device.Ethernet.Link.2.', () => {
//         return [{"parameters":{"PriorityTagging":0,"Status":"Down","LowerLayers":"Device.Ethernet.Interface.1.","MACAddress":"18:EF:C0:00:02:81","LastChange":264396,"Enable":1,"Name":"eth0","Alias":"ethernet_wan","FlowControl":0},"path":"Device.Ethernet.Link.2."},{"parameters":{"MulticastPacketsSent":0,"ErrorsSent":0,"BroadcastPacketsSent":0,"BytesSent":26282463,"PacketsSent":89710,"BytesReceived":3981340938,"DiscardPacketsReceived":0,"ErrorsReceived":23,"MulticastPacketsReceived":160730724,"UnknownProtoPacketsReceived":0,"UnicastPacketsSent":0,"UnicastPacketsReceived":0,"PacketsReceived":162804970,"DiscardPacketsSent":0,"BroadcastPacketsReceived":0},"path":"Device.Ethernet.Link.2.Stats."}];
//       })

//       this.get('/serviceElements/Device.Ethernet.Interface.[Alias=="ETH0"].', () => {
//         return [{
//           "parameters": {
//             "X_PRPL-COM_MTUMode": "auto",
//             "Status": "Up",
//             "LowerLayers": "",
//             "CurrentDuplexMode": "Full",
//             "MACAddress": "AA:BB:CC:DD:EF:02",
//             "Enable": 1,
//             "Name": "eth0",
//             "CurrentBitRate": 1000,
//             "X_PRPL-COM_Description": "",
//             "DuplexMode": "Auto",
//             "EEECapability": 0,
//             "Upstream": 1,
//             "MaxBitRate": -1,
//             "EEEEnable": 0,
//             "LastChange": 485,
//             "Alias": "ETH0",
//             "X_PRPL-COM_MTU": 1500
//           },
//           "path": "Device.Ethernet.Interface.1."
//         }];
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.CallLog.', () => {
//         return calllog
//         //return []
//         //return new Response(403, {}, { errors: ['Forbidden'] })
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.CallControl.CallingFeatures.Set.', () => {
//         return callingfeatures
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.CallControl.Line.', () => {
//         return voice.filter(rule => rule.path.includes('Device.Services.VoiceService.1.CallControl.Line.'));
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.SIP.Client.', () => {
//         return voice.filter(rule => rule.path.includes('Device.Services.VoiceService.1.SIP.Client.'));
//       })

//       // SIP Network primary and secondary
//       this.get('/serviceElements/Device.Services.VoiceService.1.SIP.Network.1.', () => {
//         return voice.filter(rule => rule.path === 'Device.Services.VoiceService.1.SIP.Network.1.');
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.SIP.Network.2.', () => {
//         return voice.filter(rule => rule.path === 'Device.Services.VoiceService.1.SIP.Network.2.');
//       })

//       // SIP Network collection (some UIs request the list endpoint)
//       this.get('/serviceElements/Device.Services.VoiceService.1.SIP.Network.', () => {
//         return voice.filter(rule => rule.path === 'Device.Services.VoiceService.1.SIP.Network.1.' || rule.path === 'Device.Services.VoiceService.1.SIP.Network.2.');
//       })

//       this.get('/serviceElements/Device.Ethernet.Interface.', () => {
//         return ethernet_interface
//       })

//       this.get('/serviceElements/Device.Services.VoiceService.1.CallControl.X_PRPLWARE-COM_NumberBlocking.', () => {
//         return blocking
//       })

//       this.patch('/serviceElements/:path', () => {
//         return new Response(204)
//       })

//       this.delete('/serviceElements/:path', () => {
//         return new Response(204)
//       })

//       this.post('/serviceElements/*path', (schema, request) => {
//         function getRandomPath() {
//           let randomNum = Math.floor(Math.random() * 1000) + 1;

//           return {
//             path: `${request.params.path}${randomNum}.`
//           };
//         }
//        return getRandomPath();
//       });


//       this.post('/serviceElements/Device.DHCPv4.Server.Pool.1.StaticAddress.', () => {
//         return { success: 'ok' };
//       });

//       this.get('/serviceElements/Device.X_ECO.', () => {
//       return fast_web_eco.filter(item => item.path === 'Device.X_ECO.');
//       });

//       this.get('/serviceElements/Device.X_ECO.ScheduleRule.', () => {
//         return  fast_web_eco.filter(rule => rule.path.includes('Device.X_ECO.ScheduleRule.'));
//       });
//     }

  
// Your routes can now use the pre-loaded fixtures
app.get('/serviceElements/Device.Logical.Interface.', (req, res) => {
    console.log("GET /serviceElements/Device.Logical.Interface.");
    res.json(fixtures.logical);
});

app.get('/serviceElements/Device.DeviceInfo.', (req, res) => {
    console.log('GET /serviceElements/Device.DeviceInfo.');
    res.json(fixtures.deviceInfo);
});

app.post('/api/session', (req, res) => {
    console.log('POST /api/session');
    res.json({
        absoluteTimeout: 3600,
        idleTimeout: 600,
        sessionID: 'mock-session-id',
    });
});

app.get('/api/users', (req, res) => {
    console.log('GET /api/users');
    res.json({
        users: [
            { id: 1, username: 'admin', role: 'admin' },
            { id: 2, username: 'user', role: 'user' },
        ]
    });
});

app.post('/api/login', (req, res) => {
    console.log('POST /api/login', req.body);
    const { username, password } = req.body;
    
    if (username === 'admin' && password === 'password') {
        res.json({
            success: true,
            token: 'mock-jwt-token',
            user: { id: 1, username: 'admin', role: 'admin' }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});
}

// Start server only after fixtures are loaded
async function startServer() {
    await loadFixtures();
    
    // app.listen(PORT, () => {
    //     console.log(`Mock Server running on http://localhost:${PORT}`);
    //     console.log(`Fixtures available:`, Object.keys(fixtures));
    // });
}

startServer();