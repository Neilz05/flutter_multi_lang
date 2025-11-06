import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedSecurityDmzRoute extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.internet.dmz');

        /* 
        Device.Firewall.DMZ is apparently a multi-instance object;
        Meaning that DMZ has multiple "DMZ" objects.
        Its denoted as Device.Firewall.DMZ.1, Device.Firewall.DMZ.2, etc.
        
        In this case, we only need the DMZ instance with "wanDMZ" as its Alias.
        Rather than getting the DMZ object then looping through to find the wanDMZ object,
        the ba-cli implementation can apparently support aliases such that
        Device.Firewall.DMZ.1 can be the same thing as Device.Firewall.DMZ.wanDMZ (assuming Device.Firewall.DMZ.1 has Alias="wanDMZ")
        So we can just request directly Device.Firewall.DMZ.wanDMZ. to save time
    
        This will, however return a warning in the console if we use findRecord, as the return path is Device.Firewall.DMZ.x. (where x is 1...n) while 
        we requested Device.Firewall.DMZ.wanDMZ.

        We bypass this by using queryRecord instead.
        */
        return this.store.queryRecord('firewall-dmz', {path: 'Firewall.DMZ.wanDMZ.'})
    }

     model() {
        const dmz = this.store.peekRecord('firewall-dmz', 'Firewall.DMZ.1.')

        return RSVP.hash({
            logical: this.store.query('logical-interface-xprplwarecomwan',{path:`${dmz.Interface.substring(7)}X_PRPLWARE-COM_WAN.`} ),
            hosts: this.store.findRecord('hosts', 'Hosts.').then(
                (hosts) => resolve(hosts),
                (err) => {
                    resolve({});
                }
            ),
            dmz: dmz
        })
    }
}
