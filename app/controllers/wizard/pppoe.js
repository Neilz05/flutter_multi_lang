import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class PPPOEController extends Controller {
    @service wizard
    @service store
    @service router
    @service eaactrl;
    @tracked showPassword1 = false;
    @tracked isChanged = false;
    @tracked invalidInternetVLANMessage = "";

    @action
    async handleSubmit(event) {
        event.preventDefault()
        const state = this.wizard.getState()

        if (!this.isChanged && this.invalidInternetVLANMessage === "") {
            if (document.getElementById('vlan_id')) {
                let val = document.getElementById('vlan_id').value;

                if (Number(val) === 0) {
                    this.wizard.InternetVLANChangeSet.VLANID = 0;
                }
            }
        }

        await Promise.all([
            this.wizard.pppChangeSet.validate(),
            this.wizard.InternetVLANChangeSet.validate()
        ]);

        /* console.log('After validation, isValid?', this.wizard.pppChangeSet.isValid);
        console.log('Errors:', this.wizard.pppChangeSet.error);

        console.log('After validation, isValid?', this.wizard.InternetVLANChangeSet.isValid);
        console.log('Errors:', this.wizard.InternetVLANChangeSet.error); */



        if (state === 'stand-alone') {
            // only check ppp set
            if (this.wizard.pppChangeSet.isValid) {
                this.setWANCredentials();
                this.wizard.pppChangeSet.execute()
                this.router.transitionTo('wizard.password')
            }
        }
        else if (state === 'pnp-router') {
            if (this.wizard.pppChangeSet.isValid && this.wizard.InternetVLANChangeSet.isValid && this.invalidInternetVLANMessage === "") {
                this.setWANCredentials();
                this.wizard.pppChangeSet.execute()
                this.wizard.InternetVLANChangeSet.execute()
                this.router.transitionTo('wizard.password')
            }
        }
        else if (state === 'triple-play') {
            if (this.wizard.pppChangeSet.isValid) {
                this.setWANCredentials();
                this.wizard.pppChangeSet.execute()
                this.router.transitionTo('wizard.sip')
            }
        }
    }

    @action
    setOperationMode(state) {
        this.wizard.setState(state)
    }

    @action
    eyeControl1(e) {
        e.preventDefault()
        this.showPassword1 = !this.showPassword1;
    }

    @action
    handleInputChange(event){
        this.isChanged = true;

        if (this.inputIsNumber(event.target.value)) {
            this.invalidInternetVLANMessage = "";
        } else {
            this.invalidInternetVLANMessage = "VLAN ID must only contain numbers. No other characters are permitted.";
        }
    }

    @action
    inputIsNumber(input) {
        const regex = /^\d+$/;
        return regex.test(input);
    }

    @action
    setWANCredentials() {
        const wanmanager = this.store.peekRecord('x-prpl-com-wanmanager', 'WANManager.');
 
        wanmanager.WAN.forEach((wan) => {
            if (wan.Alias === 'Ethernet' || wan.Alias === 'GPON') {
                    wan.Intf.forEach((intf) => {
                    if (intf.Name === 'wan') {
                        intf.UserName = this.wizard.pppChangeSet.Username;
                        intf.Password = this.wizard.pppChangeSet.Password;
                    }
                });
            }
        });
    } 

    @action
    isUntagged(vlan) {
        let untagged = false;

        if (vlan.Alias === 'wan') {
            let wanLowerLayer = this.store.peekAll('ppp-interface').find((ppp) => ppp.Alias === 'wan').LowerLayers;

            if (wanLowerLayer.includes('Device.Ethernet.VLANTermination.')) {
                untagged = false;
            } else if (wanLowerLayer.includes('Device.Ethernet.Link.')) {
                untagged = true;
            }

        }

        return untagged;
    }
}
