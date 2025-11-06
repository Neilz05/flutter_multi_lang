import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportWLanStatusRoute extends Route {
  @service store;

  beforeModel() {
    localStorage.setItem('tab', 'authenticated.status-and-support.wlan-status');
  }

  model() {
    return RSVP.hash({
        WiFi5GRadio: this.store.findRecord('wifi-radio','WiFi.Radio.[Alias=="Wl0"].').then(
            (radio) => resolve(radio),
            (err) => {
                resolve({});
            }
        ),
        WiFi5GAccessPointSecurity: this.store.findRecord('wifi-accesspoint-security', 'WiFi.AccessPoint.[CustomAlias=="WiFi-5G"].Security.').then(
            (security) => resolve(security),
            (err) => {
                resolve({});
            }
        ),
        WiFi5GSSID: this.store.findRecord('wifi-ssid', 'WiFi.SSID.[CustomAlias=="WiFi-5G"].').then(
            (ssid) => resolve(ssid),
            (err) => {
                resolve({});
            }
        ),

        WiFi2GRadio: this.store.findRecord('wifi-radio', 'WiFi.Radio.[Alias=="Wl1"].').then(
            (radio) => resolve(radio),
            (err) => {
                resolve({});
            }
        ),
        WiFi2GAccessPointSecurity: this.store.findRecord('wifi-accesspoint-security', 'WiFi.AccessPoint.[CustomAlias=="WiFi-2G"].Security.').then(
            (security) => resolve(security),
            (err) => {
                resolve({});
            }
        ),
        WiFi2GSSID: this.store.findRecord('wifi-ssid', 'WiFi.SSID.[CustomAlias=="WiFi-2G"].').then(
            (ssid) => resolve(ssid),
            (err) => {
                resolve({});
            }
        )
    })
  }
}
