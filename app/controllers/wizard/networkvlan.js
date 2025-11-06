import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NetworkVLANController extends Controller {
    @service wizard
    @service store
    @service session
    @service router

    @tracked sameInternetVLANMessage = "";
    @tracked sameIPTVVLANMessage = "";
    @tracked sameVOIPVLANMessage = "";
    @tracked sameMGMTVLANMessage = "";

    @tracked invalidInternetVLANMessage = "";
    @tracked invalidIPTVVLANMessage = "";
    @tracked invalidVOIPVLANMessage = "";
    @tracked invalidMGMTVLANMessage = "";

    @tracked isInternetVLANChanged = false;
    @tracked isIPTVVLANChanged = false;
    @tracked isVOIPVLANChanged = false;
    @tracked isMGMTVLANChanged = false;

    @action
    async handleSubmit(event) {
        event.preventDefault();
        let hasErrors = false;
        let hasInvalidInput = false;
        /* console.debug('🔍 handleSubmit triggered');

        console.debug('✅ Starting validation for all VLAN Changesets'); */

        hasErrors = this.checkDuplicateVLANIDInputs();

        if (this.invalidInternetVLANMessage || this.invalidIPTVVLANMessage || this.invalidVOIPVLANMessage || this.invalidMGMTVLANMessage) {
            hasInvalidInput = true;
        }

        if (!hasErrors && !hasInvalidInput) {
            this.checkVLANIDs();

            await Promise.all([
                this.wizard.InternetVLANChangeSet.validate(),
                this.wizard.IPTVVLANChangeSet.validate(),
                this.wizard.VOIPVLANChangeSet.validate(),
                this.wizard.MGMTVLANChangeSet.validate(),
            ]);

            if (
                this.wizard.InternetVLANChangeSet.isValid &&
                this.wizard.IPTVVLANChangeSet.isValid &&
                this.wizard.VOIPVLANChangeSet.isValid &&
                this.wizard.MGMTVLANChangeSet.isValid
            ) {
                /* console.debug('✅ All changesets valid, executing changes'); */

                this.wizard.InternetVLANChangeSet.execute();
                this.wizard.IPTVVLANChangeSet.execute();
                this.wizard.VOIPVLANChangeSet.execute();
                this.wizard.MGMTVLANChangeSet.execute();
                this.clearInvalidMessages();

                this.isInternetVLANChanged = false;
                this.isIPTVVLANChanged = false;
                this.isVOIPVLANChanged = false;
                this.isMGMTVLANChanged = false;

                /* console.debug('🚀 Transitioning to wizard.pppoe'); */
                this.router.transitionTo('wizard.pppoe');
            } else {
                /* console.warn('❌ Some changesets are invalid. Staying on current step.'); */
            }
        }
    }

    @action
    handleInputChange(changeset, event){
        if (this.inputIsNumber(event.target.value)) {
            if (event.target.value === '' || Number(event.target.value) === 0) {
                changeset.Enable = 0;
            }
            else{
                changeset.Enable = 1;
            }

            changeset.VLANID = Number(event.target.value);

            this.clearInvalidMessages();
            this.clearInvalidInputMessages(changeset);
            this.setChangeFlag(changeset);
        } else {
            this.showInvalidVLANMessage(changeset);
        }
    }

    @action
    inputIsNumber(input) {
        const regex = /^\d+$/;
        return regex.test(input);
    }

    @action
    showInvalidVLANMessage(changeset) {
        const message = "VLAN ID must only contain numbers. No other characters are permitted.";

        switch(changeset.Alias) {
            case 'wan':
                this.invalidInternetVLANMessage = message;
                break;

            case 'iptv':
                this.invalidIPTVVLANMessage = message;
                break;

            case 'voip':
                this.invalidVOIPVLANMessage = message;
                break;

            case 'mgmt':
                this.invalidMGMTVLANMessage = message;
                break;
        }
    }

    @action
    clearInvalidInputMessages(changeset) {
        switch(changeset.Alias) {
            case 'wan':
                this.invalidInternetVLANMessage = '';
                break;

            case 'iptv':
                this.invalidIPTVVLANMessage = '';
                break;

            case 'voip':
                this.invalidVOIPVLANMessage = '';
                break;

            case 'mgmt':
                this.invalidMGMTVLANMessage = '';
                break;
        }
    }

    @action
    setOperationMode(state) {
        this.wizard.setState(state)
    }

    @action
    setChangeFlag(changeset) {
        switch(changeset.Alias) {
            case 'wan':
                this.isInternetVLANChanged = true;
                break;

            case 'iptv':
                this.isIPTVVLANChanged = true;
                break;

            case 'voip':
                this.isVOIPVLANChanged = true;
                break;

            case 'mgmt':
                this.isMGMTVLANChanged = true;
                break;
        }
    }

    @action
    checkVLANIDs() {
        if (!this.isInternetVLANChanged) {
            let val = document.getElementById('internet_vlan_id').value;

            if (Number(val) === 0) {
                this.wizard.InternetVLANChangeSet.VLANID = 0;
            }
        }

        if (!this.isIPTVVLANChanged) {
            let val = document.getElementById('iptv_vlan_id').value;

            if (Number(val) === 0) {
                this.wizard.IPTVVLANChangeSet.VLANID = 0;
            }
        }

        if (!this.isVOIPVLANChanged) {
            let val = document.getElementById('voip_vlan_id').value;

            if (Number(val) === 0) {
                this.wizard.VOIPVLANChangeSet.VLANID = 0;
            }
        }

        if (!this.isMGMTVLANChanged) {
            let val = document.getElementById('mgmt_vlan_id').value;

            if (Number(val) === 0) {
                this.wizard.MGMTVLANChangeSet.VLANID = 0;
            }
        }
    }

    @action
    checkDuplicateVLANIDInputs() {
        const ids = ['internet_vlan_id', 'iptv_vlan_id', 'voip_vlan_id', 'mgmt_vlan_id'];
        const values = ids.map(id => document.getElementById(id)?.value.trim());
        let vlanIDs = [];
        let sameIDs = [];
        let hasSameVLAN = false;
        const message = "Invalid. Duplicate VLAN ID used in other inputs.";

        vlanIDs = [...vlanIDs, ...values];

        // Detect duplicates in the user input VLAN IDs
        for (let i = 0; i < vlanIDs.length; i++) {
            for (let j = i+1; j < vlanIDs.length; j++) {
                if (vlanIDs[i] === vlanIDs[j]) {
                    if (vlanIDs[i] !== '' && Number(vlanIDs[i]) !== 0) {
                        sameIDs.push(j);
                    }
                }
            }
        }

        // Assign invalid messages to the duplicated user input VLAN IDs
        for (let i = 0; i < vlanIDs.length; i++) {
            if (sameIDs.includes(i)) {
                switch(i) {
                    case 0:
                        this.sameInternetVLANMessage = message;
                        break;

                    case 1:
                        this.sameIPTVVLANMessage = message;
                        break;

                    case 2:
                        this.sameVOIPVLANMessage = message;
                        break;

                    case 3:
                        this.sameMGMTVLANMessage = message;
                        break;
                }
            } else {
                // If previously invalid and now valid, clear the message
                switch(i) {
                    case 0:
                        this.sameInternetVLANMessage = "";
                        break;

                    case 1:
                        this.sameIPTVVLANMessage = "";
                        break;

                    case 2:
                        this.sameVOIPVLANMessage = "";
                        break;

                    case 3:
                        this.sameMGMTVLANMessage = "";
                        break;
                }
            }
        }

        if (this.sameInternetVLANMessage || this.sameIPTVVLANMessage || this.sameVOIPVLANMessage || this.sameMGMTVLANMessage) {
            hasSameVLAN = true;
        }

        return hasSameVLAN;
    }

    @action
    clearInvalidMessages() {
        if (this.sameInternetVLANMessage) {
            this.sameInternetVLANMessage = "";
        }

        if (this.sameIPTVVLANMessage) {
            this.sameIPTVVLANMessage = "";
        }

        if (this.sameVOIPVLANMessage) {
            this.sameVOIPVLANMessage = "";
        }

        if (this.sameMGMTVLANMessage) {
            this.sameMGMTVLANMessage = "";
        }
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

        } else if (vlan.Alias === 'iptv' || vlan.Alias === 'voip' || vlan.Alias === 'mgmt') {
            let ipLowerLayer = this.store.peekAll('ip-interface').find((ip) => ip.Alias === vlan.Alias).LowerLayers;

            if (ipLowerLayer.includes('Device.Ethernet.VLANTermination.')) {
                untagged = false;
            } else if (ipLowerLayer.includes('Device.Ethernet.Link.')) {
                untagged = true;
            }
        }

        return untagged;
    }
}