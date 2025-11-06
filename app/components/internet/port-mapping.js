import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { json } from "sjcl";
import config from 'prpl-webui/config/environment';

export default class InternetPortMappingComponent extends Component {
  @service store;
  @service intl;
  @service eaactrl;

  @tracked AddModal = false;
  @tracked EditModal = false;
  @tracked PortRange = false;

  @tracked SelectedEntry;
  @tracked NewEntry;

  @tracked InternalClientMsg = "";
  @tracked InternalPortMsg = "";
  @tracked ExternalPortMsg = "";
  @tracked AliasMsg = "";

  constructor() {
    super(...arguments);
    this.modelType = config.APP.modelType || 'Neutral';
  }

  get PortMappingEntries() {
    let res =  this.store.peekAll('nat-portmapping').filter((item) => !item.isDeleted);
    if (this.args.upnp) {
      res = res.filter((item) => item.Description === 'libminiupnpc');
    } else {
      res = res.filter((item) => item.Description !== 'libminiupnpc');
    }
    return res;
  }

  @action
  TableInternalPortEndRangeValue(extportend, extport, internal) {
    const a = parseInt(extportend);
    const b = parseInt(extport);
    const c = parseInt(internal);
    if (isNaN(a) || isNaN(b) || isNaN(c)) return 0;
    return a - b + c;
  }

  @action
    CloseAddModal(){
        this.AddModal = false
        this.store.unloadRecord(this.NewEntry)
    }

    @action
    SaveAddModal(){
        if (!this.Validate()) return
        this.AddModal = false
    }

    @action
    OpenAddModal(){
        this.AddModal = true
        this.PortRange = false
        this.InternalClientMsg = ''
        this.InternalPortMsg = ''
        this.ExternalPortMsg = ''

        this.NewEntry = this.store.createRecord('nat-portmapping', {
            Alias: '',
            Protocol: "TCP",
            Enable: 1
        })
    }

    @action
    OpenEditModal(model){
        this.EditModal = true
        this.InternalClientMsg = ''
        this.InternalPortMsg = ''
        this.ExternalPortMsg = ''
        this.SelectedEntry = model

        if (model.ExternalPortEndRange != model.ExternalPort && model.ExternalPortEndRange != 0 && model.ExternalPortEndRange != undefined)
            this.PortRange = true
        else
            this.PortRange = false

        if (this.SelectedEntry.id == null || this.SelectedEntry.id == undefined){
            this.SelectedEntry._originalData = { ...this.SelectedEntry.toJSON() }
        }
    }

    @action
    CloseEditModal(){
        this.EditModal = false
    
        if (this.SelectedEntry.dirtyType === 'updated') {
            this.SelectedEntry.rollbackAttributes()
        }
        else if (this.SelectedEntry.dirtyType === 'created') {
            Object.assign(this.SelectedEntry, this.SelectedEntry._originalData);
        }
    }

    @action
    SaveEditModal(){
        if (!this.Validate()) return
        this.EditModal = false
    }

    @action
    UpdatePortRange(model){
        this.PortRange = !this.PortRange
        model.ExternalPortEndRange = model.ExternalPort
    }

    @action
    UpdateProtocol(model, event){
        model.Protocol = event.target.value
    }

    

    @action
    UpdateIPFromHost(model, event){
        model.InternalClient = event.target.value
    }


    @action
    Delete(record){
        if (record.isNew){
            record.unloadRecord()
            return 
        }
        // saved record, mark for deletion.
        record.deleteRecord()
    }

    ValidAlias(alias) {
        // Disallow spaces and forbidden characters in Alias
        const aliasRegex = /^[^\s\\~@#$%^&*+=`\[\]{};:\\|€˜"<>,?]*$/
        const aliasLetterStartRegex = /^\D.*$/

        if (alias === '') {
            return 'Name Cannot be empty.'
        } else if (!aliasRegex.test(alias)) {
            return 'Name contains forbidden characters.'
        } else if (!aliasLetterStartRegex.test(alias)) {
            return 'Name must not start with a number.'
        }

        let aliasCnt = 0;
        const portmaps = this.store.peekAll('nat-portmapping');
        portmaps.forEach(elem => {
            if (alias === elem.Alias) ++aliasCnt;
        })

        if (aliasCnt > 1) return 'Rule name already in use.';

        return ''
    }

    ValidIPv4(ip) {
        // Regular expression to match IPv4 addresses
        const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(ip) && ip !== '0.0.0.0';
    }

    ValidIPv4Range(ip) {
        console.log('Running Valid IPv4 Range!');

        // Link-Local IP Address
        const isLinkLocal = ip.startsWith('169.254.') ? 1 : 0;

        const ipToInteger = (ipStr) => {
            return ipStr.split('.')
                .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
        };

        const ipInt = ipToInteger(ip);

        // can't use queryRecord for some reason
        const lanLogicalInterface = this.store.peekAll('logical-interface', 'Logical.Interface.' ).findBy('Alias', 'lan');
        const lanIpInterface = this.store.peekRecord('ip-interface', lanLogicalInterface.LowerLayers.replace('Device.', ''));

        // Should BE lan IP
        const lanIpInt = ipToInteger(lanIpInterface.IPv4Address.findBy('Alias', 'lan').IPAddress);
        const lanMaskInt = ipToInteger(lanIpInterface.IPv4Address.findBy('Alias', 'lan').SubnetMask);
        const isLanIp = (ipInt & lanMaskInt) === (lanIpInt & lanMaskInt);

        return !isLinkLocal && isLanIp;
    }

    ValidPortRange(prt, prt2) {
        let test = true;
        const port = parseInt(prt);
        const port2 = parseInt(prt2);

        if (isNaN(port) || isNaN(port2)) return this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_PORT_RANGE_INVALID');
        if (port < 1 || port > 65535) return this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_PORT_RANGE_INVALID');
        if (port2 < 1 || port2 > 65535) return this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_PORT_RANGE_INVALID');

        const sshServers = this.store.peekAll('ssh-server');
        sshServers.forEach(elem => {
            if (elem.Port >= port && elem.Port <= port2) test = false;
        });
        if (!test) return this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_PORT_RANGE_INVALID');

        const httpAccess = this.store.peekAll('userinterface-httpaccess');
        httpAccess.forEach(elem => {
            if (elem.Port >= port && elem.Port <= port2) test = false;
        });
        if (!test) return this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_PORT_RANGE_INVALID');

        if (22 >= port && 22 <= port2
            || 1000 >= port && 1000 <= port2
            || 5060 >= port && 5060 <= port2
            || 5061 >= port && 5061 <= port2
            || 7547 >= port && 7547 <= port2
            || 2222 >= port && 2222 <= port2
            || 8080 >= port && 8080 <= port2
            || 8090 >= port && 8090 <= port2
            || 8443 >= port && 8443 <= port2
        ) {
            return this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_PORT_RANGE_INVALID');
        }
        return '';
    }

    ValidPortRangeSize(internal, internal2, external, external2) {
        if ((internal - internal2) === (external - external2)) {
            return '';
        } else {
            return this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_PORT_RANGE_SIZE_MISMATCHED');
        }
    }

    ChangeInternalPortEndRange(model, event) {
        model.InternalPortEndRange = event.target.value;
    }

    SetupInternalPortEndRange(model) {
        model.InternalPortEndRange = model.InternalPortEndRange !== undefined ? model.InternalPortEndRange : parseInt(model.ExternalPortEndRange) - parseInt(model.ExternalPort) + parseInt(model.InternalPort);
        if (isNaN(model.InternalPortEndRange)) delete model.InternalPortEndRange;
    }

    ValidPort(prt) {
        if (prt === '') return false;

        let test = true;
        const port = parseInt(prt);

        if (isNaN(port)) return false;

        if (port < 1 || port > 65535) return false;

        const sshServers = this.store.peekAll('ssh-server');
        sshServers.forEach(elem => {
            if (port === elem.Port) test = false;
        });
        if (!test) return false;

        const httpAccess = this.store.peekAll('userinterface-httpaccess');
        httpAccess.forEach(elem => {
            if (port === elem.Port) test = false;
        });
        if (!test) return false;

        if(this.modelType === 'FG4278Av2' || this.modelType === 'FG4278Av2_VD') {
            if (port === 22 || port === 1000 || port === 5060 || port === 5061 || port === 2222 || port === 8080 || port === 8081 || port === 8090 || port === 8443) return false;
        }else{
            if (port === 22 || port === 1000 || port === 5060 || port === 5061 || port === 7547 || port === 2222 || port === 8080 || port === 8090 || port === 8443) return false;
        }

        return true;
    }

    Validate(){
        let model
        if (this.EditModal) model = this.SelectedEntry
        if (this.AddModal) model = this.NewEntry

        this.AliasMsg = this.ValidAlias(model.Alias);

        this.InternalClientMsg = this.ValidIPv4(model.InternalClient) && model.InternalClient != "" ? '' : this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_INTERNAL_CLIENT')
        this.InternalPortMsg = this.ValidPort(model.InternalPort) ? '' : this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_INTERNAL_PORT')
        this.ExternalPortMsg = this.ValidPort(model.ExternalPort) ? '' : this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_EXTERNAL_PORT')

        this.InternalClientMsg = this.InternalClientMsg || (this.ValidIPv4Range(model.InternalClient) ? '' : this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_INTERNAL_CLIENT'));

        // additional check if this.PortRange is trueg
        if (this.PortRange){
            this.ExternalPortMsg = this.ExternalPortMsg !== '' ? this.ExternalPortMsg : this.ValidPortRange(model.ExternalPort, model.ExternalPortEndRange);
            model.InternalPortEndRange = model.InternalPortEndRange !== undefined ? model.InternalPortEndRange : model.ExternalPortEndRange - model.ExternalPort + model.InternalPort;
            this.ExternalPortMsg = this.ExternalPortMsg !== '' ? this.ExternalPortMsg : this.ValidPortRangeSize(model.InternalPort, model.InternalPortEndRange, model.ExternalPort, model.ExternalPortEndRange);
        }

        this.checkPortAvailability(model);

        if (this.InternalClientMsg || this.ExternalPortMsg || this.InternalPortMsg || this.AliasMsg) {
            return false;
        } else {
            delete model.InternalPortEndRange;
            return true;
        }
    }

    checkPortAvailability(model) {
        let port_mapping_entries =  this.store.peekAll('nat-portmapping').filter((item) => !item.isDeleted);
        port_mapping_entries.forEach(item => {
            if (item.id === model.id) return;
            // Check external port conflict (must match BOTH port AND protocol)
            if (item.ExternalPort === parseInt(model.ExternalPort)  && 
                item.Protocol === model.Protocol) {
                this.ExternalPortMsg = this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_PORT_IN_USE');
            }
            // Check internal port conflict on same device
            if (item.InternalClient === model.InternalClient &&
                item.InternalPort === parseInt(model.InternalPort) && 
                item.Protocol === model.Protocol) {
                this.InternalPortMsg = this.intl.t('PAGE_PORT_MAPPING_POPUP_ERROR_PORT_IN_USE');
            }
        });
        
        return !this.InternalPortMsg && !this.ExternalPortMsg;
    }

    get HostsListing(){
        // const oneday = 24 * 60 * 60 * 1000

        return this.store.peekAll('hosts-host').filter(item => {
            // const current = new Date(this.store.peekRecord('time', 'Time.').CurrentLocalTime)
            // const item_date = new Date(item.ActiveLastChange)
            // console.log('current ', current, 'item date ', item_date);

            //console.log(`${current} - ${item_date} = ${current - item_date} : ${current - item_date <= oneday}`)
            
            // return (current - item_date <= oneday) && item.IPAddress != ""

            // just check which ones have IP addresses
            return item.Active === 1
                && this.ValidIPv4Range(item.IPAddress)
                && item.IPAddress !== ''
                && item.IPAddress !== undefined
                && item.IPAddress !== null;
        })
    }     
}