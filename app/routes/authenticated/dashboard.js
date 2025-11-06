import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default class AuthenticatedDashboardRoute extends Route {
  @service store;
  @service status;
  beforeModel() {
    localStorage.setItem('tab', 'authenticated.dashboard');
  }

  async model() {
    return RSVP.hash({
      deviceinfo: this.store.findRecord('deviceinfo', 'DeviceInfo.').then(
        (device) => resolve(device),
        (err) => {
          resolve({});
        },
      ),
      time: this.store.findRecord('time', 'Time.').then(
        (time) => resolve(time),
        (err) => {
          resolve({});
        }
      ),
      logical: this.store.findAll('logical-interface', 'Logical.Interface.').then(
        (logical) => resolve(logical),
        (err) => {
          resolve({});
        }
      ),
      managementserver: this.store.findRecord('managementserver', 'ManagementServer.').then(
        (server) => resolve(server),
        (err) => {
          resolve({});
        }
      ),
      ethernet: this.store.findRecord('ethernet', 'Ethernet.').then(
        (ethernet) => resolve(ethernet),
        (err) => {
          resolve({});
        }
      ),
      xpon: this.store.findRecord('xpon', 'XPON.').then(
        (xpon) => resolve(xpon),
        (err) => {
          resolve({});
        }
      ),
      client: this.store.query('services-voiceservice-sip-client', {path: 'Services.VoiceService.1.SIP.Client.'}).then(
        (client) => {
          //console.log('Fetched SIP clients:', client);
          return client;
        },
        (err) => {
          console.error('Failed to fetch SIP clients:', err);
          return {};
        }
      ),
      wifi: this.store.findRecord('wifi', 'WiFi.').then(
        (wifi) => resolve(wifi),
        // fallback since the wifi object is not always present
        (err) => {
          resolve({});
        }
      ),
      wifi_radio: this.store.queryRecord('wifi-radio', { path: `WiFi.Radio.[Alias=="Wl0"].` }).then(
        (wifi_radio) => resolve(wifi_radio),
        // fallback since the wifi object is not always present
        (err) => {
          resolve({});
        }
      ),
      wifi_radio1: this.store.queryRecord('wifi-radio', { path: `WiFi.Radio.[Alias=="Wl1"].` }).then(
        (wifi_radio) => resolve(wifi_radio),
        // fallback since the wifi object is not always present
        (err) => {
          resolve({});
        }
      ),
      hosts: this.store.findRecord('hosts', 'Hosts.').then(
        (hosts) => resolve(hosts),
        (err) => {
          resolve({});
        }
      ),
      /*ip: this.store.findAll('ip-interface', 'IP.Interface.', {
        reload: true,
      }),*/
      ip: this.store.findRecord('ip', 'IP.').then(
        (ip) => resolve(ip),
        (err) => {
          resolve({});
        }
      ),
      wan_interface: this.store.queryRecord('ethernet-vlantermination', { path: `Ethernet.VLANTermination.[Alias=="wan"].LowerLayers` }).then(
        (v) => {
          let ret = {vlanTermination: v, ethernetLink: null, ethernetInterface: null};
          if (v && v.LowerLayers) {
            //Device.Ethernet.Link.2. => [Alias=="ethernet_wan"]
            //Device.Ethernet.Link.6. => [Alias=="eth_xpon"]
            let LowerLayers = v.LowerLayers.split('.').slice(1).join('.');
            //console.log(LowerLayers);
            return this.store.findRecord('ethernet-link', LowerLayers).then(
              (link) => {
                ret.ethernetLink = link;
                //Device.Ethernet.Interface.[Alias=="ETH0"].
                return this.store.queryRecord('ethernet-interface', { path: `Ethernet.Interface.[Alias=="ETH0"].` }).then(
                  (iface) => {
                    ret.ethernetInterface = iface;
                    return ret;
                  },
                  (err) => {
                    console.error('Failed to fetch ethernet interface:', err);
                    return ret;
                  }
                );
              },
              (err) => {
                console.error('Failed to fetch ethernet link:', err);
                return ret;
              }
            );
          }
          return ret;
        },
        (err) => {
          console.error('Failed to fetch ethernet vlantermination:', err);
          resolve({vlanTermination: null, ethernetLink: null, ethernetInterface: null});
        }
      ),
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.updateNumNetDisabled();
    controller.updateNumVOIPDisabled();
    controller.getWifiDevices();
  }
  /*async afterModel(model) {
    // add software version to status data
    this.status.addSource('deviceInfo.SoftwareVersion', 1);
    this.status.addData(
      'deviceInfo.SoftwareVersion',
      model.deviceInfo.SoftwareVersion
    );

    // add CPU usage to status
    if (!this.status.hasDataSource('deviceInfo.ProcessStatus'))
      this.status.addSource('deviceInfo.ProcessStatus', 50);
    this.status.addData('deviceInfo.ProcessStatus', {
      usage: model.deviceInfo.get('ProcessStatus.CPUUsage'),
    });

    // add WiFi packet counters to status
    if (model.wifi) {
      if (!this.status.hasDataSource('wifi.SSID.Packets'))
        this.status.addSource('wifi.SSID.Packets', 500);

      model.wifi.get('SSID').forEach((ssid) => {
        ssid.get('Stats').then((stats) => {
          this.status.addData('wifi.SSID.Packets', {
            alias: ssid.get('Alias'),
            sPackets: stats.PacketsSent,
            rPackets: stats.PacketsReceived,
            sBytes: stats.BytesSent,
            rBytes: stats.BytesReceived,
          });
        });
      });
    }

    // add WAN packet and byte counters to status
    if (model.wan) {
      if (!this.status.hasDataSource('wanmanager.WAN.Packets'))
        this.status.addSource('wanmanager.WAN.Packets', 500);

      this.addWanStatistics(model, 'wanmanager.WAN.Packets');
    }

    // trigger regular model update
    this.refreshModel();
  }

  refreshModel() {
    later(
      '',
      () => {
        this.model().then((model) => {
          // collect status data
          // CPU
          this.status.addData('deviceInfo.ProcessStatus', {
            usage: model.deviceInfo.get('ProcessStatus.CPUUsage'),
          });

          // WiFi
          if (model.wifi) {
            model.wifi.get('SSID').forEach((ssid) => {
              ssid.get('Stats').then((stats) => {
                this.status.addData('wifi.SSID.Packets', {
                  alias: ssid.get('Alias'),
                  sPackets: stats.PacketsSent,
                  rPackets: stats.PacketsReceived,
                  sBytes: stats.BytesSent,
                  rBytes: stats.BytesReceived,
                });
              });
            });
          }

          // WAN
          if (model.wan) {
            this.addWanStatistics(model, 'wanmanager.WAN.Packets');
          }
        });
        this.refreshModel();
      },
      5000
    );
  }*/

  /**
   * Adds WAN packets/bytes sent/received data to the internal model
   *
   * @param {*} model
   * @param {*} key
   */
  /*addWanStatistics(model, key) {
    model.wan.get('WAN').forEach((wan) => {
      if (wan.Alias === model.wan.get('WANMode')) {
        wan.get('Intf').then((ifaces) => {
          ifaces.forEach((iface, index) => {
            if (index == 0) {
              iface.get('IPv4Reference.Stats').then((stats) => {
                this.status.addData(key, {
                  sPackets: stats.PacketsSent,
                  rPackets: stats.PacketsReceived,
                  sBytes: stats.BytesSent,
                  rBytes: stats.BytesReceived,
                });
              });
            }
          });
        });
      }
    });
  }*/
}
