import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedWifiMacfilterController extends Controller {
    @service store;
    @service eaactrl;
    @service api;

    @tracked interface = 'wl0';
    @tracked modalopen = false;
    @tracked errorMessages = [];
    @tracked hosts = null;

    get HasChanges() {
        return this.store.peekAll('wifi-accesspoint-macfiltering-entry').find((item) => item.hasDirtyAttributes || item.isDeleted) ||
            this.store.peekAll('wifi-accesspoint-macfiltering').find((item) => item.hasDirtyAttributes) ||
            this.store.peekAll('wifi-accesspoint').find((item) => item.hasDirtyAttributes)
    }

    get entries() {
        const ret = this.interface === 'wl0' ? this.model.wl0.MACFiltering.Entry : this.model.wl1.MACFiltering.Entry;
        return ret.filter(entry => !entry.isDeleted);
    }

    get filter() {
        return this.interface === 'wl0' ? this.model.wl0.MACFiltering : this.model.wl1.MACFiltering;
    }

    get accesspoint() {
        return this.interface === 'wl0' ? this.model.wl0 : this.model.wl1;
    }

    @action
    SelectAll() {
        this.hosts = this.hosts.map((host) => {
            return {
                ...host,
                selected: true
            };
        });
    }

    @action
    toggleSelectedHost(targetHost) {
        this.hosts = this.hosts.map((host) => {
            if (host === targetHost) {
                return {
                    ...host,
                    selected: !host.selected
                };
            }
            return host;
        });
    }

    @action
    AddKnownDevices() {
        this.store.findAll('hosts-host').then((records) => {
            this.hosts = records
                .filter(host => host.InterfaceType === "Wi-Fi" && host.Layer1Interface.includes("Device.WiFi.SSID") && host.IPAddress !== "")
                .map(host => ({
                    selected: false,
                    data: host
                }))
            this.modalopen = true
        })
    }

    @action
    AddSelectedKnownDevices() {
        this.hosts
            .filter(host => host.selected)
            .forEach((host) => {

                let record = this.store.createRecord('wifi-accesspoint-macfiltering-entry', {
                    Alias: host.data.HostName,
                    MACAddress: host.data.PhysAddress
                })

                record.index = this.interface === 'wl0' ? this.model.wl0_index : this.model.wl1_index;

                this.entries.pushObject(record)
            })

        this.modalopen = false
    }

    Validate() {
        let macset = new Set()

        let validEntry = true;
        this.errorMessages = [];
        const regex = /^\d/; // Check if the first character is a digit

        this.entries.forEach((element) => {
            if (!element.Alias) {
                this.errorMessages.push('No name provided');
                validEntry = false;
            }
            if (regex.test(element.Alias)) {
                this.errorMessages.push('Name cannot start with a number');
                validEntry = false;
            }
            if (!element.MACAddress) {
                this.errorMessages.push('No MAC Address provided');
                validEntry = false;
            }
            if (!this.isValidMacAddress(element.MACAddress)) {
                this.errorMessages.push('Invalid MAC Address');
                validEntry = false;
            }


            if (macset.has(element.MACAddress)) {
                this.errorMessages.push('Duplicate entry in MAC Filter table');
                validEntry = false;
            }
            else {
                macset.add(element.MACAddress);
            }
            /* if (element.id.split('.')[2] === this.index5g) {    // Entry in 5G MAC Filter table
                if (macSet5G.has(element.MACAddress)) {
                    this.errorMessages.push('Duplicate entry in 5G MAC Filter table');
                    validEntry = false;
                } else {
                    macSet5G.add(element.MACAddress);
                }
            }
            if (element.id.split('.')[2] === this.index2g) {    // Entry in 2G MAC Filter table
                if (macSet2G.has(element.MACAddress)) {
                    this.errorMessages.push('Duplicate entry in 2G MAC Filter table');
                    validEntry = false;
                } else {
                    macSet2G.add(element.MACAddress);
                }
            } */
        });

        return validEntry;
    }

    deleteCommand(record) {
        this.api.customFetch('/commands', {
            method: "POST",
            body: JSON.stringify({
                command: `Device.${record.id.split('Entry')[0]}delEntry()`,
                commandKey: "",
                sendresp: true,
                inputArgs: {
                    mac: record.MACAddress
                }
            })
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`Error deleting MAC Filter entry! status: ${response.status}`);
            }
            return response.json();
        }).then((result) => {
            record.unloadRecord();
        }).catch((error) => {
            console.error('Error deleting MAC Filter entry:', error);
        });
    }

    @action
    async Apply() {
        if (this.Validate() === false) return
        this.model.wl0.MACFiltering.Entry
            .filter((record) => !record.isSaving && (record.isDeleted || record.hasDirtyAttributes || record.isNew))
            .forEach(record => {
                if (record.isDeleted) {
                    this.deleteCommand(record);
                }
                else if (record.isNew || record.hasDirtyAttributes) record.save();
            })

        this.model.wl1.MACFiltering.Entry
            .filter((record) => !record.isSaving && (record.isDeleted || record.hasDirtyAttributes || record.isNew))
            .forEach(record => {
                if (record.isDeleted) {
                    this.deleteCommand(record);
                }
                else if (record.isNew || record.hasDirtyAttributes) record.save();
            })

        this.store.peekAll('wifi-accesspoint-macfiltering')
            .filter(record => !record.isSaving && record.hasDirtyAttributes)
            .forEach(record => record.save());

        this.store.peekAll('wifi-accesspoint')
            .filter(record => !record.isSaving && record.hasDirtyAttributes)
            .forEach(record => record.save());
    }

    @action
    AddMacFilterEntry() {
        let curr_entries = this.interface === 'wl0' ? this.model.wl0.MACFiltering.Entry : this.model.wl1.MACFiltering.Entry;

        let record = this.store.createRecord('wifi-accesspoint-macfiltering-entry', {
            MACAddress: '',
            Alias: ''
        })

        record.index = this.interface === 'wl0' ? this.model.wl0_index : this.model.wl1_index;

        curr_entries.pushObject(record)

        console.log(record)
    }

    @action
    DeleteMacFilterEntry(entry) {
        /* this.entries.removeObject(entry); */
        if (entry.isNew) {
            entry.unloadRecord();
        } else {
            entry.deleteRecord();
        }
    }

    @action
    setInterface(i) {
        this.interface = i;
    }

    @action
    toggleMACAccessControl(ap) {
        ap.MACAddressControlEnabled = ap.MACAddressControlEnabled == 1 ? 0 : 1;
    }

    @action
    selectMACFilteringMode(filter, event) {
        filter.Mode = event.target.value;
    }

    @action
    MacInputChange(entry, entryidx, index, event) {
        let split_address = entry.MACAddress.split(':')
        split_address[index] = event.target.value
        entry.MACAddress = split_address.join(":")

        if (event.target.value.length === 2 && index < 5) {
            const nextInput = document.querySelector(`#mac-input-${this.interface}-${entryidx}-${index + 1}`);

            if (nextInput) {
                nextInput.focus();
                nextInput.select(); // Optional: select text for quick overwrite
            }
        }

        if (event.inputType === 'deleteContentBackward' && split_address[index].length === 0 && index > 0) {
            const prevInput = document.querySelector(`#mac-input-${this.interface}-${entryidx}-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
                // Move cursor to end (just in case there's a value)
                prevInput.setSelectionRange(prevInput.value.length, prevInput.value.length);
            }
        }

    }

    isValidMacAddress(mac) {
        return /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(mac);
    }
}