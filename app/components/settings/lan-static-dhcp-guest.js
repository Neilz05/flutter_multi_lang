import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LanStaticDhcpGuestComponent extends Component {
    @service modal;
    @service store;
    @service intl;
    @service session;
    @service api;
    @service eaactrl;

    @tracked addModalOpen = false;
    @tracked editModalOpen = false;

    @tracked selectedEntry;
    @tracked deviceName;
    @tracked macAddr;
    @tracked ipAddr;
    @tracked noDeviceSelected = false;
    @tracked deviceNameMsg = "";
    @tracked macAddrMsg = "";
    @tracked ipAddrMsg = "";
    @tracked IDToBeDeleted = [];
    @tracked deletedChanges = false;
    @tracked unsavedStaticAddresses = [];

    @tracked staticDhcp;

    componentId = this.eaactrl.getRandomString(16);

    get componentId() {
        return this.componentId;
    }
    
    @action
    register(element) {
        this.args.registerComponent?.(this);
    }

    get StaticEntries(){
        const pool = this.args.server.get('Pool').findBy('Alias', 'guest');
        const savedRecords = pool?.StaticAddress || [];
        return [
            ...savedRecords.filter(item => !this.IDToBeDeleted.includes(item.id)),
            ...this.unsavedStaticAddresses
        ];
    }

    get hasChanges() {
        let value = false;
        let arrOfNul = this.store.peekAll('dhcpv4-server-pool').findBy('Alias', 'guest').StaticAddress.filter(item => item.id == null);
        value = value ? true : arrOfNul.length > 0;
        value = value ? true : this.deletedChanges;
        return value;
    }

    get filterHosts() {
        let hostArr = [];
        this.args.hosts.get('Host').forEach((host) => {
            if (host.IPAddress !== "") {
                this.args.server.get('Pool').findBy('Alias', 'lan').Client.forEach((client) => {
                    if (host.PhysAddress.toLowerCase() === client.Chaddr.toLowerCase()) {
                        if (!hostArr.includes(host)) {  // make sure to not push the same host more than once
                            hostArr.push(host);
                        }
                    }
                });
            }
        });
        return hostArr;
    } 

    @action
    openEditModal(staticAddr) {
        this.deviceNameMsg = "";
        this.macAddrMsg = "";
        this.ipAddrMsg = "";
        this.editModalOpen = true;
        this.selectedEntry = staticAddr;
    }

    @action
    openAddModal() {
        this.deviceNameMsg = "";
        this.macAddrMsg = "";
        this.ipAddrMsg = "";
        this.deviceName = "";
        this.macAddr = "";
        this.ipAddr = "";
        this.addModalOpen = true;
    }

    @action
    Cancel() {
        this.args.server.get('Pool').findBy('Alias', 'guest').StaticAddress.forEach(e => {
            e.rollbackAttributes();
        });
        this.IDToBeDeleted = [];
        this.unsavedStaticAddresses = [];
        this.deletedChanges = false;
    }

    @action
    updateSelection(event) {
        if (this.addModalOpen) {
            this.deviceName = event.target.value;
            this.args.hosts.get('Host').forEach((host) => {
                if (host.HostName == event.target.value) {
                    this.macAddr = host.PhysAddress;
                    this.ipAddr = host.IPAddress;
                } else if (event.target.value == "") {
                    this.macAddr = "";
                    this.ipAddr = "";
                } 
            });
        }
        if (this.editModalOpen) {
            this.selectedEntry.Alias = event.target.value;
            this.args.hosts.get('Host').forEach((host) => {
                if (host.HostName == event.target.value) {
                    this.selectedEntry.Chaddr = host.PhysAddress;
                    this.selectedEntry.Yiaddr = host.IPAddress;
                } 
            });
        }
    }

    @action
    validateDeviceName(deviceName) {
        const regex = /^[a-zA-Z0-9 _-]+$/;
        const startsWithLetter = /^[a-zA-Z]/;

        if(deviceName === "") {
            return 1;
        }

        if (!startsWithLetter.test(deviceName)) {
            return 2;
        }

        if (!regex.test(deviceName)) {
            return 3;
        }

        return true;
    }

    @action
    validateIPv4(ip) {
        // Regular expression to match IPv4 addresses
        const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(ip);
    }

    @action
    validateMac(mac) {
        const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        return regex.test(mac);
    }

    @action
    validateStaticAddr() {
        let deviceNameIsValid = true;
        let ipv4IsValid = true;
        let macIsValid = true;

        if (this.editModalOpen) {
            deviceNameIsValid = this.validateDeviceName(this.selectedEntry.Alias);
            macIsValid = this.validateMac(this.selectedEntry.Chaddr);
            ipv4IsValid = this.validateIPv4(this.selectedEntry.Yiaddr);
        }
        if (this.addModalOpen) {
            deviceNameIsValid = this.validateDeviceName(this.deviceName);
            macIsValid = this.validateMac(this.macAddr);
            ipv4IsValid = this.validateIPv4(this.ipAddr);
        }

        if (deviceNameIsValid !== true) {
            switch(deviceNameIsValid) {
                case 1:
                    this.deviceNameMsg = this.intl.t('PAGE_SETTINGS_LAN_POPUP_ERROR_DEVICE_NAME_EMPTY');
                    break;
                case 2:
                    this.deviceNameMsg = this.intl.t('PAGE_SETTINGS_LAN_POPUP_ERROR_DEVICE_NAME_FORMAT');
                    break;
                case 3:
                    this.deviceNameMsg = this.intl.t('PAGE_SETTINGS_LAN_POPUP_ERROR_DEVICE_NAME_INVALID');
                    break;
            }
            deviceNameIsValid = false;
        }
        if (!macIsValid) this.macAddrMsg = this.intl.t('PAGE_SETTINGS_LAN_POPUP_ERROR_MAC_ADDRESS_INVALID');
        if (!ipv4IsValid) this.ipAddrMsg = this.intl.t('PAGE_SETTINGS_LAN_POPUP_ERROR_IP_ADDRESS_INVALID');
        return deviceNameIsValid && macIsValid && ipv4IsValid;
    }

    @action
    saveStaticAddr() {
        if (!this.validateStaticAddr()) return;
        this.editModalOpen = false;
        // not delete related but piggybacking flag for changes
        this.deletedChanges = true;
    }

    @action
    async deleteStaticAddr(staticAddr) {
        if (staticAddr.id == null || staticAddr.id == undefined) {
            this.unsavedStaticAddresses = this.unsavedStaticAddresses.filter(addr => addr !== staticAddr);
            this.store.unloadRecord(staticAddr);
        } else {
            this.deletedChanges = true;
            if (!this.IDToBeDeleted.includes(staticAddr.id));
                this.IDToBeDeleted = [...this.IDToBeDeleted, staticAddr.id];
        }
    }

    @action
    async addStaticAddr() {
        if (!this.validateStaticAddr()) return;

        let newStaticAddr = this.store.createRecord('dhcpv4-server-pool-staticaddress', {
            _type: "guest",
            Alias: this.deviceName,
            Chaddr: this.macAddr,
            Yiaddr: this.ipAddr,
            Enable: 1
        });
        this.unsavedStaticAddresses = [...this.unsavedStaticAddresses, newStaticAddr];
        this.deletedChanges = true; // piggybacking

        this.addModalOpen = false;
    }

    async executeChanges() {
        const changePromises = 
                this.args.server.get('Pool').findBy('Alias', 'guest').StaticAddress
                .map(async e => {
                    if (e.isNew || e.hasDirtyAttributes) {
                        try {
                            return await e.save();
                        } catch (error) {
                            console.error(`Error saving Static DHCP entry: ${error}`);
                            throw error; // Re-throw to handle it in the Promise.all
                        }
                    }
                    if (this.IDToBeDeleted.includes(e.id)) {
                        return e.destroyRecord()
                    }
                })
                .filter(p => p !== undefined);

        await Promise.all(
            this.unsavedStaticAddresses.map(record => record.save())
        )

        this.unsavedStaticAddresses = [];

        return Promise.all(changePromises).then(async () => {
            // no need for reload here since lan.js reload will execute
            // window.location.reload()
            await Promise.all(this.IDToBeDeleted.map(async id => {
                let url = '/commands';
                try {
                    let response = await this.api.customFetch(url, {
                        method: "post",
                        body: JSON.stringify({
                            command: 'Device.' + id + '_del()',
                            commandKey: "",
                            sendresp: true,
                            inputArgs: {
                                // isRelay: false
                            }
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`Error deleting Static DHCP entry! status: ${response.status}`);
                    }

                    let result = await response.json();
                    let dhcpv4Path = 'Device.' + id;
                    let deletedEntry = result[0].outputArgs?._del[0];
                    if (dhcpv4Path != deletedEntry) {
                        console.error('Static DHCP entry deletion failed');
                        // this.errorCode = result[0].failure.errcode;
                    } else {
                        //console.log('Static DHCP entry deleted successfully');
                    }
                } catch (error) {
                    console.error('Error deleting Static DHCP entry:', error);
                    // this.errorCode = error.message;
                }
            }));
        })
        .catch((err) => console.error(`Failed: ${err}`));
    }

    @action
    async Apply(){
        let hey = await this.executeChanges();
        return Promise.resolve('ok')
    }

    @action
    handleClose(closeModal) {
        this.selectedEntry.rollbackAttributes();
        closeModal();
    }
}