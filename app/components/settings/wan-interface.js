import Component from '@glimmer/component';
import { action, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { sort } from '@ember/object/computed';
import config from 'prpl-webui/config/environment';

export default class LanStaticDhcpComponent extends Component {
    @service modal;
    @service store;
    @service intl;
    @service session;
    @service api;
    @service eaactrl;
    @service currentUser;

    @tracked SelectedEntry;
    @tracked SelectedVlanTermination;
    @tracked SelectedIndex;
    @tracked SelectedEntryPPP;

    @tracked changingDescription = '';
    @tracked changingNATEnable = '';
    @tracked changingPriority = '';
    @tracked changingVLANID = '';
    @tracked changingAuthMethod = '';
    @tracked changingUsername = '';
    @tracked changingPassword = '';
    @tracked changingName = '';
    @tracked changingAuthProtocol = '';
    @tracked changingConnTrigger = '';
    @tracked changingLCPRequest = '';
    @tracked changingLCPRetry = '';
    @tracked changingMTU = '';
    @tracked changingIdleTime = '';
    @tracked changingHostname = '';
    @tracked changingVendorID = '';
    @tracked changing125 = '';
    @tracked macToClone = '';

    @tracked priorityMsg = '';
    @tracked echoMsg = '';
    @tracked vlanIdMsg = '';
    @tracked invalidMacMsg = '';
    @tracked userNameMsg = '';
    @tracked passwordMsg = '';

    @tracked editModalOpen = false;
    @tracked modalMacCloneText = '';
    @tracked modalMacCloneDoneIsOpen = false;
    @tracked currentIPv4Mode = '';
    @tracked currentVlanPriority = 0;
    @tracked currentVlanID = '';
    @tracked onuState = '';
    @tracked dnsServer = this.args.dns_server;
    @tracked dnsServerAutoIsOn = this.dnsServerAuto;

    @tracked option12 = '';
    @tracked option12Model = null;
    @tracked option12Event = null;

    @tracked option60 = '';
    @tracked option60Model = null;
    @tracked option60Event = null;

    @tracked IntfEntriesLength = 0;
    @tracked isSuperAdmin = false;

    @tracked isVLANIDChanged = false;
    @tracked isUsernameChanged = false;
    @tracked isPasswordChanged = false;

    // @tracked rootAlias = "";
    // @tracked adminAlias = "";

    componentId = this.eaactrl.getRandomString(16);

    get componentId() {
        return this.componentId;
    }

    description = ['HSIA', 'UMTS', 'ETH-VOIP', 'ETH-IPTV', 'ETH-MGMT'];
    usedFor = ['VOIP', 'Data', 'IPTV', 'MGMT'];
    authMethods = ['AUTO', 'PAP', 'CHAP', 'MS-CHAP', 'None'];
    connectionTriggers = ['Keep Alive', 'Dial On DeMand', 'Manual', 'AlwaysOn'];
    ipv4Modes = [ 'Static', 'DHCP', 'PPPoE', 'None' ];


    constructor() {
        super(...arguments);
        this.isSuperAdmin = this.currentUser.isSuperAdmin();
    }

    get getUser() {
        return this.session.data.authenticated.username;
    }

    get IntfEntries(){
        let arr = [];
        this.args.wanmanager.WAN.forEach((wan) => {
            if (wan.Alias === this.args.wanmanager.WANMode) {
                wan.Intf.forEach((item) => {
                    if (item.isDeleted === false) arr.push(item)
                })
            }
        })
        this.IntfEntriesLength = arr.length;
        return arr;
    }

    get dnsServerAuto(){
        let dnsWanConfig = this.args.dns_wan_conf;
        let _default = true;
        if( dnsWanConfig.param.IPv6DNSMode.toLowerCase().includes('static') || dnsWanConfig.param.DNSMode.toLowerCase().includes('static') ) {
            _default = false;
        }
        return _default;
    }

   set dnsServerAuto(value) {
        let val = value ?'Dynamic' : 'Static';
        let dnsWanConfig = this.args.dns_wan_conf;
        let model = dnsWanConfig.model;
        let param = dnsWanConfig.param;

        model.backupParameters(param);
        model.set('DNSMode', val);
        model.set('IPv6DNSMode', val);
    }

    get primaryDns() {
        return this.getDnsByAlias('static-1', 0);
    }

    get secondaryDns(){
        return this.getDnsByAlias('static-2', 1);
    }

    @action toggleBtn(event){
        this.dnsServerAutoIsOn = event.target.checked;
    }

    @action updatePrimaryDns(value) {
        this.setDnsByAlias('static-1', value);
    }

    @action updateSecondaryDns (value) {
        this.setDnsByAlias('static-2', value);
    }

    getDnsByAlias(alias, index){
        return this.dnsServer.map((dns) => {
            if (dns.get('Alias') === alias) {
                return dns.get('DNSServer');
            }
        })[index];
    }

    setDnsByAlias(alias, value) {
        this.dnsServer.forEach((dns) => {
            if(dns.get('Alias') === alias) {
                dns.backupParameters(dns.parameters);
                dns.set('DNSServer', value);
            }
        });
    }

    @action
    setOnuState(value) {
        this.onuState = value[0]; // it's an array apparently
    }

    @action
    interfaceEnableFunc(ali, event) {
        ali.Enable = event.target.checked ? 1 : 0;
        this.setIPMode(ali);
    }

    @action
    updateSettings(vlanterm, intf, idx) {
        this.SelectedEntry = intf;
        this.SelectedIndex = idx-1; // VOIP starts at index 1 in the .hbs file
        this.SelectedVlanTermination = vlanterm; // VLANPriority, VLANID
        // this.currentIPv4Mode = intf.IPv4Mode;
        this.currentVlanPriority = parseInt(vlanterm.VLANPriority);
        this.currentVlanID = parseInt(vlanterm.VLANID);

        if (this.SelectedEntry.id == null || this.SelectedEntry.id == undefined){
            this.SelectedEntry._originalData = { ...this.SelectedEntry.toJSON() }
        }
        this.editModalOpen = true;    
    }

    @action
    openEditModal(){

        this.editModalOpen = false;
    
        if (this.SelectedEntry.dirtyType === 'updated') {
            this.SelectedEntry.rollbackAttributes()
        }
        else if (this.SelectedEntry.dirtyType === 'created') {
            Object.assign(this.SelectedEntry, this.SelectedEntry._originalData);
        }

        if (this.SelectedVlanTermination.dirtyType === 'updated') {
            this.SelectedVlanTermination.rollbackAttributes()
        }
        else if (this.SelectedVlanTermination.dirtyType === 'created') {
            Object.assign(this.SelectedVlanTermination, this.SelectedVlanTermination._originalData);
        }

        if (this.SelectedEntryPPP) {
            if (this.SelectedEntryPPP.dirtyType === 'updated') {
                this.SelectedEntryPPP.rollbackAttributes()
            } else if (this.SelectedEntryPPP.dirtyType === 'created') {
                Object.assign(this.SelectedEntryPPP, this.SelectedEntryPPP._originalData);
            }
        }
    }

    @action
    setPPPEntry(ppp) {
        this.SelectedEntryPPP = ppp; 
    }

    @action
    closeEditModal(){
        this.editModalOpen = false;
    
        if (this.SelectedEntry.dirtyType === 'updated') {
            this.SelectedEntry.rollbackAttributes();
        }
        else if (this.SelectedEntry.dirtyType === 'created') {
            Object.assign(this.SelectedEntry, this.SelectedEntry._originalData);
        }

        if (this.SelectedVlanTermination.dirtyType === 'updated') {
            this.SelectedVlanTermination.rollbackAttributes();
        }
        else if (this.SelectedVlanTermination.dirtyType === 'created') {
            Object.assign(this.SelectedVlanTermination, this.SelectedVlanTermination._originalData);
        }

        if (this.SelectedEntryPPP) {
            if (this.SelectedEntryPPP.dirtyType === 'updated') {
                this.SelectedEntryPPP.rollbackAttributes();
            }
            else if (this.SelectedEntryPPP.dirtyType === 'created') {
                Object.assign(this.SelectedEntryPPP, this.SelectedEntryPPP._originalData);
            }
        }

        if (this.option12Model) {
            if (this.option12Model.dirtyType === 'updated') {
                this.option12Model.rollbackAttributes();
            }
        }

        if (this.option60Model) {
            if (this.option60Model.dirtyType === 'updated') {
                this.option60Model.rollbackAttributes();
            }
        }

        if (this.userNameMsg) {
            this.userNameMsg = "";
        }

        if (this.passwordMsg) {
            this.passwordMsg = "";
        }

        if (this.isVLANIDChanged) {
            this.isVLANIDChanged = false;
        }

        if (this.isUsernameChanged) {
            this.isUsernameChanged = false;
        }

        if (this.isPasswordChanged) {
            this.isPasswordChanged = false;
        }
    }

    validatedId() {
        let oneTest = false;
        let existTest = true; // invert this
        let isUntagged = !this.isTagged(this.SelectedVlanTermination, this.args.ppp, this.args.ipinterface);

        if (isUntagged && !this.isVLANIDChanged) {
            this.SelectedVlanTermination.VLANID = "0";
        }

        let idAsInt = parseInt(this.SelectedVlanTermination.VLANID);
        if (idAsInt >= 1 && idAsInt <= 4094){
            this.vlanIdMsg = '';
            oneTest = true;
            this.setLowerLayer(idAsInt);
        } else {
            if (idAsInt === 0) {
                this.vlanIdMsg = '';
                oneTest = true;
                this.setLowerLayer(idAsInt);
            } else {
                this.vlanIdMsg = this.intl.t('PAGE_PAGE_WAN_INVALID_VLAN_ID');
            }
        }

        let arr = this.args.ethernetvlantermination.map(item => item.VLANID).filter(id => id !== this.SelectedVlanTermination?.VLANID);
        arr.forEach(id => {
            if (id === idAsInt) {
                this.vlanIdMsg = this.intl.t('PAGE_PAGE_WAN_VLAN_ID_EXISTS');
                existTest = false;
            }
        })

        return oneTest && existTest;
    }

    validatedPriority() {
        const zeroToSeven = /^[0-7]$/

        if (zeroToSeven.test(this.SelectedVlanTermination.VLANPriority)){
            this.priorityMsg = '';
            return true;
        } else {
            this.priorityMsg = this.intl.t('PAGE_PAGE_WAN_INVALID_VLAN_PRIORITY');
        }

        return false;
    }

    validatedEcho() {
        const positiveInteger = /^\d+$/; // e.g. seconds

        if (positiveInteger.test(this.changingLCPRequest)){
            this.echoMsg = '';
            return true;
        } else {
            this.echoMsg = this.intl.t('PAGE_PAGE_WAN_INVALID_LCP_ECHO');
        }

        return false;
    }

    validatedMac() {
        const macAddressRegex = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;
        const macAddressRegexCombo = /^[0-9A-Fa-f][02468ACEace]:([0-9A-Fa-f]{2}:){4}[0-9A-Fa-f]{2}$/;
        const macAddressRegex2 = /^([0-9A-Fa-f][02468ACEace])$/;
        if (macAddressRegexCombo.test(this.macToCloneComp) || this.macToCloneComp === undefined || this.macToCloneComp === '') {
            this.invalidMacMsg = '';
            return true;
        } else {
            this.invalidMacMsg = this.intl.t('PAGE_PAGE_WAN_INVALID_MAC_CLONE');
            if (macAddressRegex.test(this.macToCloneComp) && !macAddressRegex2.test(this.macToCloneComp)) {
                this.invalidMacMsg = this.intl.t('PAGE_PAGE_WAN_INVALID_HEX_DIGIT_MAC_CLONE');
            }
        }
        return false;
    }

    validatedUsername() {
        const usernameRegex = /^[^\s]+$/;

        if (!this.isUsernameChanged) {
            this.changingUsername = document.getElementById('wan_username').value;
        }

        if (usernameRegex.test(this.changingUsername) || this.changingUsername === undefined || this.changingUsername === '') {
            this.userNameMsg = '';
            return true;
        } else {
            this.userNameMsg = this.intl.t('PAGE_PAGE_WAN_INVALID_USERNAME');
        }
        return false;
    }

    validatedPassword() {
        const passwordRegex = /^[^\s]+$/;

        if (!this.isPasswordChanged) {
            this.changingPassword = document.getElementById('wan_password').value;
        }

        if (passwordRegex.test(this.changingPassword) || this.changingPassword === undefined || this.changingPassword === '') {
            this.passwordMsg = '';
            return true;
        } else {
            this.passwordMsg = this.intl.t('PAGE_PAGE_WAN_INVALID_PASSWORD');
        }
        return false;
    }

    validated() {
        let  priorityTest = this.validatedPriority();
        let echoTest = this.validatedEcho();
        let idTest = this.validatedId();
        let errorMsg = document.getElementsByClassName('error-message');
        let macTest = this.validatedMac();
        let usernameTest = false;
        let passwordTest = false;

        if(this.SelectedEntry.IPv4Mode === 'dhcp4' || this.SelectedEntry.IPv4Mode === 'none') {
            echoTest = true;
        }
        if (errorMsg.length > 0) {
            return false;
        }
        if(this.SelectedEntry.Name === 'wan') {
            usernameTest = this.validatedUsername();
            passwordTest = this.validatedPassword();
        } else {
            usernameTest = true;
            passwordTest = true;
        }
        return priorityTest && echoTest && idTest && macTest && usernameTest && passwordTest;
    }

    @action
    saveEditModal(){
        if(!this.validated()) return;
        this.setWANCredentials();
        this.getMacToClone();
        this.editModalOpen = false;

        if(this.option12Event) {
            this.changeHostname(this.option12Model, this.option12Event);
            this.option12Model = null;
            this.option12Event = null;
        }

        if (this.option60Event) {
            this.changeVendorID(this.option60Model, this.option60Event);
            this.option60Model = null;
            this.option60Event = null;
        }

        if (this.isVLANIDChanged) {
            this.isVLANIDChanged = false;
        }

        if (this.isUsernameChanged) {
            this.isUsernameChanged = false;
        }

        if (this.isPasswordChanged) {
            this.isPasswordChanged = false;
        }
    }

    @action
    apply() {
        this.executeChangesWAN();
    }

    @action
    changeDescription(event) {
        this.changingDescription = event.target.value;
    }

    @action
    changeNATEnable(event) {
        this.changingNATEnable = event.target.value;
    }

    @action
    changePriority(event) {
        this.SelectedVlanTermination.VLANPriority = event.target.value;
    }

    @action
    changeVLANID(event) {
        this.SelectedVlanTermination.VLANID = event.target.value;
        this.isVLANIDChanged = true;
    }

    @action
    changeConnType(event) {
        this.SelectedEntry.IPv4Mode = event.target.value;
    }

    @action
    changeUsername(event) {
        this.changingUsername = event.target.value;
        this.isUsernameChanged = true;
    }

    @action
    changePassword(event) {
        this.changingPassword = event.target.value;
        this.isPasswordChanged = true;
    }

    @action
    changeName(event) {
        this.changingName = event.target.value;
    }

    @action
    changeAuthProtocol(event) {
        this.changingAuthProtocol = event.target.value;
    }

    @action
    changeConnTrigger(event) {
        this.changingConnTrigger = event.target.value;
    }

    @action
    changeLCPRequest(event) {
        this.changingLCPRequest = event.target.value;
    }

    @action
    setLCPRequest(element) {
        this.changingLCPRequest = element.value;
    }

    @action
    changeLCPRetry(event) {
        this.changingLCPRetry = event.target.value;
    }

    @action
    changeMTU(event) {
        this.changingMTU = event.target.value;
    }

    @action
    changeIdleTime(event) {
        this.changingIdleTime = event.target.value;
    }

    @action
    changeHostname(so, event) {
        if (event == this.option12Event) {
            this.option12 = event.target.value;

            if(!this.isHex(this.option12)) {
                this.changingHostname = this.convertASCIItoHex(this.option12, 0);
            } else {
                this.changingHostname = this.option12;
            }

            so.Value = this.changingHostname;
        } else {
            this.changingHostname = event.target.value;
        }

        this.option12Model = so;
        this.option12Event = event;
    }

    @action
    changeVendorID(so, event) {
        if (event == this.option60Event) {
            this.option60 = event.target.value;

            if(!this.isHex(this.option60)) {
                this.changingVendorID = this.convertASCIItoHex(this.option60, 1);
            } else {
                this.changingVendorID = this.option60;
            }

            so.Value = this.changingVendorID;
        } else {
            this.changingVendorID = event.target.value;
        }

        this.option60Model = so;
        this.option60Event = event;
    }

    @action
    change125(so, event) {
        so.Value = event.target.checked ? 1 : 0;
    }

    @action
    changeMacToClone(event) {
        this.macToCloneComp = event.target.value;
    }

    @action
    async cloneMac(event) {
        const mac = await this.getDeviceMACAddress();
        document.getElementById('mac-clone-textbox').value = mac ? mac : '';
        this.macToCloneComp = mac ? mac : '';
    }

    async getLastSession() {
        const lastSession = await this.store.queryRecord('userinterface-httpaccess-session', { path: this.session.sessionPath });
        return (lastSession?.Status === "Active" ? lastSession : '');
    }

    async getDeviceMACAddress() {
        const session = await this.getLastSession();
        const ipaddr = session.IPAddress;
        const hosts = await this.store.findAll('hosts-host');
        let mac;
        hosts.forEach(host => {
            if (ipaddr === host.IPAddress) {
                mac = host.PhysAddress
            }
        })
        return mac ? mac : '';
    }

    @action
    getMacToClone() {
        if (typeof this.args.onMacToCloneUpdate === 'function') {
            this.args.onMacToCloneUpdate(this.macToCloneComp);
        } else {
            console.error('onMacToCloneUpdate is not a function!');
        }
    }

    matchConnectionType(type) {
        if (type === 'dhcp4') {
            return 'DHCP';
        } else if (type === 'ppp4') {
            return 'PPPoE';
        } else if (type === 'static') {
            return 'Static';
        } else {
            return 'None'
        };
    }

    @action
    getOption12Value(element) {
        this.option12 = element.value;

        if(this.isHex(this.option12)) {
            element.value = this.convertHextoASCII(this.option12);
        }
    }

    @action
    getOption60Value(element) {
        this.option60 = element.value;

        if(this.isHex(this.option60)) {
            element.value = this.convertHextoASCII(this.option60);
        }
    }

    isHex(value) {
        return /^[0-9a-fA-F]+$/.test(value) && value.length % 2 === 0;
    }

    convertHextoASCII(hex) {
        const hexValue = hex.trim();
        let ascii = '';

        for (let i = 0; i < hexValue.length; i+=2) {
            const hexPair = hexValue.substr(i, 2);
            const charCode = parseInt(hexPair, 16);
            if (!isNaN(charCode)) {
                ascii += String.fromCharCode(charCode);
            }
        }

        return ascii;

    }

    convertASCIItoHex(str, num) {
        let hex = '';

        for (let i = 0; i < str.length; i++) {
            if(num) {
                hex += str.charCodeAt(i).toString(16).padStart(2, '0').toUpperCase();
            } else {
                hex += str.charCodeAt(i).toString(16).padStart(2, '0');
            }
        }

        return hex;
    }

    @action
    showCurrentRow(intfName, ipinterface) {
        let isEnabled = 0;

        if (intfName === 'iptv' || intfName === 'voip') {
            isEnabled = ipinterface.find((entry) => entry.Alias === intfName).Enable;
        }

        if (isEnabled) {
            return true;
        } else {
            if (this.isSuperAdmin || intfName === 'wan' || intfName === 'mgmt') {
                return true;
            } else {
                return false;
            }
        }
    }

    disableWAN(intfName, ipinterface) {
        let isEnabled = 0;

        if (intfName === 'iptv' || intfName === 'voip' || intfName === 'mgmt') {
            isEnabled = ipinterface.find((entry) => entry.Alias === intfName).Enable;
        }

        if (isEnabled) {
            return false;
        } else {
            if (intfName !== 'wan') {
                return true;
            } else {
                return false;
            }
        }
    }

    setLowerLayer(vlanID) {
        const ethernetLink = this.args.ethernet_link.find(e => e.Alias === 'ethernet_wan');
        const ethernetXpon = this.args.ethernet_link.find(e => e.Alias === 'eth_xpon');
        let alias = this.SelectedVlanTermination.Alias;
        let wanMode = this.args.wanmanager.WANMode;

        if (vlanID !== 0) {
            this.SelectedVlanTermination.Enable = 1;

            if (wanMode.includes("DHCP")) {
                if (alias === 'wan' || alias === 'iptv' || alias === 'voip' || alias === 'mgmt') {
                    let iface = this.args.ipinterface.find((entry) => entry.Alias === alias);
                    iface.LowerLayers = `Device.${this.SelectedVlanTermination.id}`;
                    this.setWANType(vlanID, alias);
                }
            } else {
                if (alias === 'wan') {
                    let wan = this.args.ppp.find((entry) => entry.Alias === 'wan');
                    wan.LowerLayers = `Device.${this.SelectedVlanTermination.id}`;
                    this.setWANType(vlanID, alias);
                } else if (alias === 'iptv' || alias === 'voip' || alias === 'mgmt') {
                    let iface = this.args.ipinterface.find((entry) => entry.Alias === alias);
                    iface.LowerLayers = `Device.${this.SelectedVlanTermination.id}`;
                    this.setWANType(vlanID, alias);
                }
            }

        } else if (vlanID === 0) {
            this.SelectedVlanTermination.Enable = 0;

            if (wanMode.includes("DHCP")) {
                if (alias === 'wan' || alias === 'iptv' || alias === 'voip' || alias === 'mgmt') {
                    let iface = this.args.ipinterface.find((entry) => entry.Alias === alias);

                    if (wanMode.includes("Ethernet")) {
                        iface.LowerLayers = `Device.${ethernetLink.id}`;
                    } else if (wanMode.includes("GPON")) {
                        iface.LowerLayers = `Device.${ethernetXpon.id}`;
                    }

                    this.setWANType(vlanID, alias);
                }
            } else {
                if (alias === 'wan') {
                    let wan = this.args.ppp.find((entry) => entry.Alias === 'wan');
                    wan.LowerLayers = this.SelectedVlanTermination.LowerLayers;
                    this.setWANType(vlanID, alias);
                } else if (alias === 'iptv' || alias === 'voip' || alias === 'mgmt') {
                    let iface = this.args.ipinterface.find((entry) => entry.Alias === alias);
                    iface.LowerLayers = this.SelectedVlanTermination.LowerLayers;
                    this.setWANType(vlanID, alias);
                }
            }
        }
    }

    setWANType(vlanID, alias) {
        const wanmanager = this.args.wanmanager;

        if (vlanID !== '' && vlanID !== 0) {
            wanmanager.WAN.forEach((entry) => {
                if (entry.Alias === 'Ethernet' || entry.Alias === 'GPON') {
                    entry.Intf.forEach((item) => {
                        if (item.Name === alias) {
                            item.Type = "vlan";
                        }
                    })
                }
            });
        } else if (vlanID === '' || vlanID === 0) {
            wanmanager.WAN.forEach((entry) => {
                if (entry.Alias === 'Ethernet' || entry.Alias === 'GPON') {
                    entry.Intf.forEach((item) => {
                        if (item.Name === alias) {
                            item.Type = "untagged";
                        }
                    })
                }
            });
        }
    }

    setIPMode(intf) {
        if (intf.Enable) {
            this.args.wanmanager.WAN.forEach((entry) => {
                if (entry.Alias === 'Ethernet' || entry.Alias === 'GPON') {
                    entry.Intf.forEach((item) => {
                        if (item.Name === intf.Alias) {
                            if (item.Name === 'wan') {
                                item.IPv4Mode = "ppp4";
                                item.IPv6Mode = "ppp6";
                            } else if (item.Name === 'iptv' || item.Name === 'voip' || item.Name === 'mgmt') {
                                item.IPv4Mode = "dhcp4";
                                item.IPv6Mode = "none";
                            }
                        }
                    })
                }
            });
        } else {
            this.args.wanmanager.WAN.forEach((entry) => {
                if (entry.Alias === 'Ethernet' || entry.Alias === 'GPON') {
                    entry.Intf.forEach((item) => {
                        if (item.Name === intf.Alias) {
                            item.IPv4Mode = "none";
                            item.IPv6Mode = "none";
                        }
                    })
                }
            });
        }
    }

    @action
    isTagged(vlan, ppp, ipinterface) {
        let tagged = false;
        let wanMode = this.args.wanmanager.WANMode;

        if (config.APP.modelType === 'FG4278Bv3') {
            if (vlan.Alias === 'wan') {
                let wanLowerLayer = ppp.find((ppp) => ppp.Alias === 'wan').LowerLayers;

                if (wanLowerLayer.includes('Device.Ethernet.VLANTermination.')) {
                    tagged = true;
                } else if (wanLowerLayer.includes('Device.Ethernet.Link.')) {
                    tagged = false;
                }

            } else if (vlan.Alias === 'iptv' || vlan.Alias === 'voip' || vlan.Alias === 'mgmt') {
                let ipLowerLayer = ipinterface.find((ip) => ip.Alias === vlan.Alias).LowerLayers;

                if (ipLowerLayer.includes('Device.Ethernet.VLANTermination.')) {
                    tagged = true;
                } else if (ipLowerLayer.includes('Device.Ethernet.Link.')) {
                    tagged = false;
                }
            }
        } else {
            if (wanMode.includes("DHCP")) {
                if (vlan.Alias === 'wan' || vlan.Alias === 'iptv' || vlan.Alias === 'voip' || vlan.Alias === 'mgmt') {
                    let ipLowerLayer = ipinterface.find((ip) => ip.Alias === vlan.Alias).LowerLayers;

                    if (ipLowerLayer.includes('Device.Ethernet.VLANTermination.')) {
                        tagged = true;
                    } else if (ipLowerLayer.includes('Device.Ethernet.Link.')) {
                        tagged = false;
                    }
                }
            } else {
                if (vlan.Alias === 'wan') {
                    let wanLowerLayer = ppp.find((ppp) => ppp.Alias === 'wan').LowerLayers;

                    if (wanLowerLayer.includes('Device.Ethernet.VLANTermination.')) {
                        tagged = true;
                    } else if (wanLowerLayer.includes('Device.Ethernet.Link.')) {
                        tagged = false;
                    }

                } else if (vlan.Alias === 'iptv' || vlan.Alias === 'voip' || vlan.Alias === 'mgmt') {
                    let ipLowerLayer = ipinterface.find((ip) => ip.Alias === vlan.Alias).LowerLayers;

                    if (ipLowerLayer.includes('Device.Ethernet.VLANTermination.')) {
                        tagged = true;
                    } else if (ipLowerLayer.includes('Device.Ethernet.Link.')) {
                        tagged = false;
                    }
                }
            }
        }

        return tagged;
    }

    @action
    setWANCredentials() {
        const wanmanager = this.store.peekRecord('x-prpl-com-wanmanager', 'WANManager.');
 
        wanmanager.WAN.forEach((wan) => {
            if (wan.Alias === 'Ethernet' || wan.Alias === 'GPON') {
                    wan.Intf.forEach((intf) => {
                    if (intf.Name === 'wan') {
                        intf.UserName = this.changingUsername;
                        intf.Password = this.changingPassword;
                    }
                });
            }
        });
    } 
}