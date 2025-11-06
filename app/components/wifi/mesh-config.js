import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class WifiMeshconfigComponent extends Component {
  matched = false;
  @tracked selectedPolicy = 'Normal'; // Default value
  signalStrength = 0;
  macAddress='';
  linktype = '';
  mac='';
  maclist = '';
  deviceMac='';
  linkrate='';  
  channel = '';
  @tracked backhaul='';
  @tracked nextNode=0;
  @action
  storeSignalStrength(sta) {
    this.signalStrength = sta.SignalStrength;
  }
  @action
  storeBackhaul(sta) {
    this.linktype = sta;
  }
  @action
  storeBackhaulid(sta) {
    if (this.nextNode ==0){
      this.backhaul = sta;
      this.nextNode = 1;
    }
  }
  @action 
  resetNode(){
    this.nextNode
  }
  @action
  storeMAC(sta) {
   
    this.macAddress = sta.MACAddress;
  }
  @action
  storeMACAddress(sta) {
   
    this.mac = sta;
  }
 
  @action
  storeMacList(sta) {
    this.maclist = sta;
  }
  @action
  storeDeviceMac(sta) {
    this.deviceMac = sta;
  }
  @action
  storeChannel(sta) {
    this.channel = sta;
  }
  @action
  storeLinkRate(sta) {
    this.linkrate = sta;
  }
  @action
  updatePolicy(event) {
    if (this.maclist == 0 )
    this.selectedPolicy = event.target.value;
  }
  @action
  showModal(node) {
    document.getElementById('modalNodeName').innerText = node.Name;
    document.getElementById('modalNodeStatus').innerText = node.Active;
    if (node.NextHop != null && node.NextHop !== '') {
      document.getElementById('modalNodeNextHop').innerText = node.NextHop;
  } else{
        document.getElementById('modalNodeNextHop').innerText = this.backhaul;
  }
    
    document.getElementById('modalNodeSoftwareVersion').innerText = node.SoftwareVersion;
    document.getElementById('modalNodeMACAddress').innerText = node.MACAddress;
    document.getElementById('modalNodeIPAddress').innerText = node.IPAddress;
    
    if (node.MACAddress == this.macAddress) {
      document.getElementById('modalStaSignalStrength').innerText = (this.signalStrength)/2-110;
    }
    if (node.MACAddress == this.macAddress) {
      document.getElementById('modalLinktype').innerText = this.linktype;
    }
    document.getElementById('nodeModal').style.display = 'block';
  }
  @action
  showDeviceModal(device) {
    document.getElementById('modalDeviceName').innerText = device.Name;
    document.getElementById('modalDeviceStatus').innerText = device.Active;
    document.getElementById('modalDeviceNextHop').innerText = device.Name;
    document.getElementById('modalDeviceIPAddress').innerText = device.IPAddress;
    document.getElementById('modalDeviceMACAddress').innerText = device.MACAddress;
      document.getElementById('modalDeviceSignalStrength').innerText = (this.signalStrength)/2-110;
      document.getElementById('modalDeviceLinkRate').innerText = this.linkrate;
      this.matched= true;
    if (this.matched == true){
      if (this.channel >= 1 && this.channel <= 14){
        document.getElementById('modalDeviceFrequency').innerText = '2.4G';
      } else if (this.channel >= 36 && this.channel <= 165) {
        document.getElementById('modalDeviceFrequency').innerText = '5G';
      }
      this.matched = false;
    }
    
    document.getElementById('deviceModal').style.display = 'block';
  }
  @action
  closeDeviceModal() {
    document.getElementById('deviceModal').style.display = 'none';
  }
  @action
  closeModal() {
    document.getElementById('nodeModal').style.display = 'none';
  }

  @action
  setupModal(element) {
    this.modalElement = element;
  }
}