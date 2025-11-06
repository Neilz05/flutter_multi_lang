import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';

export default class AuthenticatedDnsController extends Controller {
  @service intl;
  @service eaactrl;
  @tracked ipcp = this.store.peekRecord('dhcpv4-server-pool', 'DHCPv4.Server.Pool.1.');
  @tracked errMessages = [];
  @tracked lanIP = '';

  get hasChanges() {
    let isDirty = false;
    this.model.dhcpv4?.Server.get('Pool').forEach((pool) => {
      if(pool.get('hasDirtyAttributes')){
        isDirty = true;
      }
    });
    if(this.model.securedns?.hasDirtyAttributes){
        isDirty = true;
    }
    return isDirty;
  }
  get configAllDevices() {
    return this.model.securedns?.ConfigureAllDevices == 1 ? true : false;
  }
  set configAllDevices(value) {
    this.model.securedns.set('ConfigureAllDevices', value ? 1 : 0);
  }
  get getWanServerIpAddressOne() {
    if (!this.ipcp) return '';
    const servers = this.ipcp.DNSServers?.split(',').map(ws => ws.trim());
    this.serverOne = servers[0] || ''
    return servers[0] || '';
  }
  get getWanServerIpAddressTwo() {
    if (!this.ipcp) return '';
    const servers = this.ipcp.DNSServers?.split(',').map(ws => ws.trim());
    this.serverTwo = servers[1] || ''
    return servers[1] || '';
  }
  get IpAddressFromLogical() {
    let lowerlayers = ''
    this.model.logicalInterface.forEach(iface=>{
      if(iface.Alias == 'lan'){
        lowerlayers = iface.LowerLayers
      }
    });          
      let id = lowerlayers.replace("Device.", "");
      let ipIface = this.store.peekRecord('ip-interface', id);
      let ipv4Addr = ipIface.IPv4Address.find(ipv4 => {
          if (ipv4.Alias === 'lan') {
              return ipv4;
          }
      });
      if (ipv4Addr) {
          this.lanIP = ipv4Addr.IPAddress;
          return ipv4Addr.IPAddress;
      }
      return '';
  }
  get secureDnsEnable() {
    return this.model.securedns?.Enable;
  }
  @action
  updateSecureDnsMode(value) {    
    this.model.securedns.set('Enable', value);
  }
  @action apply() {
    this.checkValidWanServers();
    if (this.errMessages.length > 0) return;
    let errMsg = document.getElementsByClassName('errMsg');
    for (let i = 0; i < errMsg.length; i++) {
        if (errMsg[i].innerHTML != '') return;  // if there is an error message, do not apply the changes
    }

      if(this.model.securedns.hasDirtyAttributes){
        this.model.securedns.save();
      }
      this.model.dhcpv4.Server.get('Pool').forEach((pool) => {
        if(pool.get('hasDirtyAttributes')){
          pool.save();
        }
      });
  }
  @action cancel() {
    this.errMessages = [];
    let errMsg = document.getElementsByClassName('errMsg');
      for (let i = 0; i < errMsg.length; i++) {
          if (errMsg[i].innerHTML != '') {
              // if there is an error message, clear the error message
              errMsg[i].innerHTML = '';
          }
      }
    if(this.model.securedns.hasDirtyAttributes){
      this.model.securedns.rollbackAttributes();
    }
      this.model.dhcpv4.Server.get('Pool').forEach((pool) => {
        if(pool.get('hasDirtyAttributes')){
          pool.rollbackAttributes();
        }
      });
  }
  @action
  checkValidWanServers() {
    this.errMessages = [];
    const validateWanServers = this.validateWanServer();
    if (validateWanServers !== 'valid') {
        this.errMessages.push(validateWanServers);
    }
  }
  validateWanServer() {
      const lowerlayers = this.model.logicalInterface.findBy('Alias', 'lan').get('LowerLayers');
      let id = lowerlayers.replace("Device.", "");
      let ipIface = this.store.peekRecord('ip-interface', id);
      const realLanIp = ipIface.IPv4Address.findBy('Alias', 'lan').IPAddress;

      const dnsservers = this.store.peekRecord('dhcpv4-server-pool', 'DHCPv4.Server.Pool.1.').DNSServers;
      if (dnsservers === realLanIp+','){
        return this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_WAN_SERVER_SAME_AS_ROUTER");
      } 
      return "valid";
  }
  @action
  setWanServer(id, index, event) {   
    this.IpAddressFromLogical;     
    let invalidIp = false;
    let ipAddr = '';
    let isAbleToBlank = (id == 'wanServer-2');
            
    for (let i = 0; i < 4; i++) {
        let input = document.getElementById(`${id}-${i + 1}`);
        if (input && ((parseInt(input.value) > 255) || (parseInt(input.value) < 0) || !this.inputIsNumber(input.value))) {
            invalidIp = true;
            input.classList.add('is-invalid');
            input.style.backgroundImage = 'none';
        }
        if (i < 3) ipAddr += input.value + '.';
        else ipAddr += input.value;
    }
            if (ipAddr == '...') ipAddr = '';

    /* Should NOT match router's IP */
    if (ipAddr === this.lanIP) {
        invalidIp = true;
        for (let i = 0; i < 4; i++) {
            let input = document.getElementById(`${id}-${i + 1}`);
            input.classList.add('is-invalid');
            input.style.backgroundImage = 'none';
        }
    } 
            if (ipAddr === '') {
                if (isAbleToBlank){	
                        invalidIp = false;
                }else{
        invalidIp = true;
        for (let i = 0; i < 4; i++) {
            let input = document.getElementById(`${id}-${i + 1}`);
            input.classList.add('is-invalid');
            input.style.backgroundImage = 'none';
        }
                }
    } 

    /* All octets should be complete */
    if (invalidIp) {
        document.getElementById(`${id}ErrMsg`).innerText = this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_WAN_SERVER_INVALID");
    } else {
        // if there was previous error, remove it
        for (let i = 0; i < 4; i++) {
            let input = document.getElementById(`${id}-${i + 1}`);
            if (input) input.classList.remove('is-invalid');
        }
        document.getElementById(`${id}ErrMsg`).innerText = "";
    }
            
    const ipcp = this.store.peekRecord('dhcpv4-server-pool', 'DHCPv4.Server.Pool.1.');
    const servers = this.ipcp.DNSServers?.split(',').map(ws => ws.trim());
            
            let ipStr = '';

    if (id === 'wanServer-1') {
        this.serverOne = ipAddr;
                    
                    ipStr = (this.serverOne ? this.serverOne : servers[0] ? servers[0] : '') + ',' + (this.serverTwo ? this.serverTwo : servers[1] ? servers[1] : '');
    } else if (id === 'wanServer-2') {
        this.serverTwo = ipAddr;
                    
                    ipStr = servers[0] + ',' + this.serverTwo;
    }
    set(ipcp, 'DNSServers', ipStr);
  }
  @action
  inputIsNumber(input) {
    const regex = /^\d+$/;
    return regex.test(input);
  }    
}