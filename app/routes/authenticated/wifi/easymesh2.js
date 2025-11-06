import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedEasyMesh2Route extends Route {
    @service store;

    beforeModel() {
        localStorage.setItem('tab', 'authenticated.wifi.easymesh2');
    }
    
    setupController(controller, model) {
        super.setupController(controller, model);
        controller.setupData();
    }
    
    model() {
        this.store.unloadAll('wifi-x-000e50-multiap-node');
        this.store.unloadAll('wifi-x-000e50-multiap-devices');
        this.store.unloadAll('wifi-x-000e50-multiap');
        this.store.unloadAll('wifi-dataelements-network-device');

        return RSVP.hash({
            easymesh: this.store.findRecord('wifi-x-000e50-multiap', 'WiFi.X_000E50_MultiAP.', { reload: true }).then(
                (Time) => { 
                    //console.log("easymesh", Time);
                    return Time;
                },
                (err) => {
                    //console.log(err);
                    return {};
                }
            ),
            nodelist: this.store.findAll('wifi-x-000e50-multiap-node', { reload: true }).then(
                (Time) => { 
                    //console.log("nodelist gotten", Time);
                    return Time;
                },
                (err) => {
                    //console.log(err);
                    return {};
                }
            ),
            devicelist: this.store.findAll('wifi-x-000e50-multiap-devices', { reload: true }).then(
                (Time) => { 
                    //console.log("devicelist gotten", Time);
                    return Time;
                },
                (err) => {
                    //console.log(err);
                    return {};
                }
            ),
            denetworkdevicelist: this.store.query('wifi-dataelements-network-device', { path: 'WiFi.DataElements.Network.Device.' }).then(
                (Time) => { 
                    //console.log("denetworkdevicelist gotten", Time);
                    return Time;
                },
                (err) => {
                    //console.log(err);
                    return {};
                }
            ),


        });
    }

}
