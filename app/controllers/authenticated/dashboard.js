import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'prpl-webui/config/environment';
import { action } from '@ember/object';

export default class AuthenticatedDashboardController extends Controller {
  @service status;
  @service wizard;
  @service router
  @service store
  @service eaactrl;

  @tracked CPUdata;
  @tracked WiFiSSIDStatistics;
  @tracked WANStatistics;
  @tracked acsModalOpen = false;
  @tracked isGuestResult;

  @tracked numVOIPDisabled = 0;
  @tracked numNetDisabled = 0;

  @tracked SSID2G = '';
  @tracked SSID5G = '';
  @tracked SSID2G_Guest = '';
  @tracked SSID5G_Guest = '';
  @tracked mainWifiDevices = [];
  @tracked guestWifiDevices = [];

  @action
  startWizardFlow(event) {
    event.preventDefault(); // Prevent default link behavior

    /*this.store.findRecord('captiveportal', 'CaptivePortal.').then((res) => {
      res.Enable = 1
      res.save()
    })*/

    this.wizard.initWizard().then(() => {
      this.router.transitionTo('wizard.wanMode');
    }).catch((error) => {
      console.error('Failed to initialize wizard:', error);
      // Optionally show an error to the user
    });
  }

  @action
  openACSURL() {
    this.acsModalOpen = true;
  }

  init() {
    super.init(...arguments);
    this.modelType = config.APP.modelType || 'Neutral';
    this.status.on('deviceInfo.ProcessStatus-Added', () => {
      let data = this.status.getData('deviceInfo.ProcessStatus');
      this.set('CPUdata', data);
    });

    this.status.on('wifi.SSID.Packets-Added', () => {
      let data = this.status.getData('wifi.SSID.Packets');
      this.set('WiFiSSIDStatistics', data);
    });

    this.status.on('wanmanager.WAN.Packets-Added', () => {
      let data = this.status.getData('wanmanager.WAN.Packets');
      this.set('WANStatistics', data);
    });
  }
  formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  
  async getWifiDevices(){
    const hostModel  = this.store.peekRecord('hosts', 'Hosts.').Host;

    hostModel.forEach(host => {
      if((host.InterfaceType === "Wi-Fi"  || host.InterfaceType === 'Other') && host.IPaddress != "" && host.Active == 1){
        let path = host.Layer1Interface.replace('Device.','')+".";
        let reco = this.store.peekRecord('wifi-ssid', path);
        let ssid = this.model.wifi.SSID.find((ssid)=> ssid.MACAddress?.toLowerCase () === reco.MACAddress?.toLowerCase());

        if(ssid && (ssid.Alias === "WiFi-2G" || ssid.Alias === "WiFi-5G" || ssid.Alias === "WiFi-6G")) {
          this.mainWifiDevices.push(host);
        }
        if( ssid && (ssid.Alias === "WiFi-2G-Guest" || ssid.Alias === "WiFi-5G-Guest" || ssid.Alias === "WiFi-6G-Guest")) {
          this.guestWifiDevices.push(host);
        }
      }
    })
  }

  get hasNetDisabled() {
    return this.numNetDisabled > 0 ? 1 : 0;
  }

  async updateNumNetDisabled() {
    this.numNetDisabled = await this.getNumNetDisabled();
  }

  getNumNetDisabled() {
    return this.model.hosts.Host.filter(host => host.Active === 0 && host.InterfaceType === "Ethernet").length;
  }

  get hasVOIPDisabled() {
    return this.numVOIPDisabled > 0 ? 1 : 0;
  }

  async updateNumVOIPDisabled() {
    this.numVOIPDisabled = await this.getNumVOIPDisabled();
  }

  async getNumVOIPDisabled() {
    let count = 0;
    const promises = this.model.client.map(async (cli) => {
      if (cli.Status == "Disabled") {
        count++;
      }
    });
    await Promise.all(promises);
    return count;
  }

  getSSIDInfo(alias2G, alias5G, targetProperty2G, targetProperty5G) {
    const RADIO_ENABLED = 1;
    const SSID_SPLIT_ENABLED = 1;

    const radio0 = this.model.wifi_radio.Enable;
    const radio1 = this.model.wifi_radio1.Enable;
    const SSIDSplit = this.model.wifi.X_SC_SSIDSplit;
    
    const ssid2G = this.model.wifi.SSID.find(ssid => ssid.Alias === alias2G);
    const ssid5G = this.model.wifi.SSID.find(ssid => ssid.Alias === alias5G);
    
    const enable2G = ssid2G?.Enable === RADIO_ENABLED;
    const enable5G = ssid5G?.Enable === RADIO_ENABLED;
    
    this[targetProperty2G] = '';
    this[targetProperty5G] = '';
    
    const bothRadiosEnabled = radio0 === RADIO_ENABLED && radio1 === RADIO_ENABLED;
    const splitEnabled = SSIDSplit === SSID_SPLIT_ENABLED;
    
    if (bothRadiosEnabled) {
      if (splitEnabled) {
        if (enable2G) this[targetProperty2G] = ssid2G.SSID;
        if (enable5G) this[targetProperty5G] = ssid5G.SSID;
      } else {
        if (enable2G || enable5G) {
          this[targetProperty2G] = ssid2G.SSID;
        }
      }
    } else if (radio1 === RADIO_ENABLED && enable2G) {
      this[targetProperty2G] = ssid2G.SSID;
    } else if (radio0 === RADIO_ENABLED && enable5G) {
      this[targetProperty5G] = ssid5G.SSID;
    }
    return this[targetProperty2G] !== '' || this[targetProperty5G] !== '';
  }

  get show_WiFiSSID() {
    return this.getSSIDInfo(
      'WiFi-2G', 
      'WiFi-5G', 
      'SSID2G', 
      'SSID5G'
    );
  }

  get show_WiFiSSID_Guest() {
    return this.getSSIDInfo(
      'WiFi-2G-Guest', 
      'WiFi-5G-Guest', 
      'SSID2G_Guest', 
      'SSID5G_Guest'
    );
  }
  get activeSSIDs() {
    const ssids = [];
    if (this.SSID2G) ssids.push(this.SSID2G);
    if (this.SSID5G) ssids.push(this.SSID5G);
    return ssids;
  }
  get activeGuestSSIDs() {
    const ssids = [];
    if (this.SSID2G_Guest) ssids.push(this.SSID2G_Guest);
    if (this.SSID5G_Guest) ssids.push(this.SSID5G_Guest);
    return ssids;
  }
}
