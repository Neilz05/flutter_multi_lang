import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class StatusLanStatusDhcpComponent extends Component {
    @service store;
    @tracked activeHostObj = {};
    @tracked hostInDHCP = [];

    @action
    getTimeDifference(date1, date2) {
        // date2 = date2.split('.')[0]; // Remove the fractional seconds part
        // date1 = date1.split('.')[0].replace(/Z$/, ''); // Remove the fractional seconds part
        let d1 = new Date(date1);
        let d2 = new Date(date2);

        // Get the time difference in milliseconds
        let diffMs = Math.abs(d1 - d2);

        // Convert milliseconds to hours, minutes, and seconds
        let hours = Math.floor(diffMs / (1000 * 60 * 60));
        let minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        // Format the output as HH:MM:SS
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    @action
    checkHostActive(client) {
        let promises = client.map((cl) => {
            return this.store.findAll('hosts-host').then((hosts) => {
                let activeHost = hosts.find((h) => h.PhysAddress === cl.Chaddr);
                if (activeHost) {
                    this.activeHostObj = {
                        ...this.activeHostObj,
                        [cl.Chaddr]: activeHost.Active === 1
                    };
                }
            });
        });
        return Promise.all(promises); //
    }

    @action
    findDHCPHosts(client) {
        // append new MACs without dupes in case theres more than 1 Pool
        this.hostInDHCP = [...new Set ([...this.hostInDHCP, ...client.map(cl => cl.Chaddr.toLowerCase())])];
    }

    @action
    isHostDHCP(mac) {
        return this.hostInDHCP.includes(mac.toLowerCase()) ? 'DHCP' : 'Static';
    }

    /*@action
    checkHost(chAddr) {
        this.checkHostActive(this.args.pool.Client).then(() => {
            console.log('Active Host Object:', this.activeHostObj);
            // Return false if not yet loaded, or the actual value if loaded
            console.log("Return value: ", this.activeHostObj[chAddr] ?? false);
            // return this.activeHostObj[chAddr] ?? false;
        });
        return true;
    }*/
}