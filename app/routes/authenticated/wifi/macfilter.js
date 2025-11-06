import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedWifiMacfilterRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.wifi.macfilter');
    }

    async model() {
        let wl0_index = null;
        let wl1_index = null;

        const wl0 = await this.store.query('wifi-accesspoint', {path: 'WiFi.AccessPoint.WiFi-5G.'}).then((res) => {
            // wl0.id is some value like "WiFi.AccessPoint.x." where x is an index. we extract that. 
            wl0_index = res.firstObject.id.split('.').slice(-2, -1)[0];
            return res.firstObject
        })

        const wl1 = await this.store.query('wifi-accesspoint', {path: 'WiFi.AccessPoint.WiFi-2G.'}).then((res) => {
            wl1_index = res.firstObject.id.split('.').slice(-2, -1)[0];
            return res.firstObject
        })

        return {
            // in case it is needed. DO NOT CHANGE.
            wl0_index: wl0_index,
            wl1_index: wl1_index,

            wl0: wl0,
            wl1: wl1,

            /* wl0_filter: this.store.peekRecord('wifi-accesspoint-macfiltering', `WiFi.AccessPoint.${wl0_index}.MACFiltering.`),
            wl1_filter: this.store.peekRecord('wifi-accesspoint-macfiltering', `WiFi.AccessPoint.${wl1_index}.MACFiltering.`),

            wl0_entry: this.store.peekAll('wifi-accesspoint-macfiltering-entry').filter((item) => item.id.startsWith(`WiFi.AccessPoint.${wl0_index}.MACFiltering.Entry.`)),
            wl1_entry: this.store.peekAll('wifi-accesspoint-macfiltering-entry').filter((item) => item.id.startsWith(`WiFi.AccessPoint.${wl1_index}.MACFiltering.Entry.`)), */
        }
    }
}