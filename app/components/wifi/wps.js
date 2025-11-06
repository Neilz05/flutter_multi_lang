import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { later, cancel } from '@ember/runloop';
import { set } from '@ember/object';

export default class WifiWpsComponent extends Component {
  @service session;
  @service store;
  @service intl;
  @service api;
  @service eaactrl;
  @tracked modalIsOpen = false;
  @tracked errorCode = null;
  @tracked timeRemaining = 120; // 2 minutes in seconds

  @tracked isLoading = false;
  @tracked pairingMsg = null;
  @tracked pairingStatus = null;
  @tracked wpsEnable = false;

  wpsPair5g = null;
  wpsPair2g = null;
  wpsPair5gStatus = "";
  wpsPair2gStatus = "";

  timer = null;

  componentId = this.eaactrl.getRandomString(16);

  get componentId() {
      return this.componentId;
  }

  constructor() {
      super(...arguments);
      this.eaactrl.setEaaTargetController(this);
  }

  @action
  setWpsEnable(event){
    let value = event.target.checked;
    this.wpsEnable = value;
    this.args.accesspoint.forEach((ap) => {
      if (ap.CustomAlias === 'WiFi-5G' || ap.CustomAlias === 'WiFi-2G') {
        ap.WPS.set('Enable', value);
      }
    });
  }
    
  get getWpsEnable(){
    let enabled = false;
    this.args.accesspoint.forEach((ap) => {
      if(ap.CustomAlias === 'WiFi-5G' || ap.CustomAlias === 'WiFi-2G'){
        enabled = enabled || ap.WPS.get('Enable');
      }
    });    
    return enabled;
  }

  @action
  pairDevice() {
    this.modalIsOpen = true;
    this.getModalBodyClasses();
    if(!this.wpsEnable){
      this.errorCode = this.intl.t('PAGE_WPS_MESSAGE_OFF');
    }
    if(!this.errorCode){
      this.initWps();
      this.startTimer();
    }
  }

  @action
  initWps() {
    this.initWps5G();
    this.initWps2G();
  }

  @action
  cancelPairing() {
    this.cancelWps5G();
    this.cancelWps2G();
    this.pairingStatus = this.intl.t('PAGE_POPUP_PAIRING_CANCELLED');
    // this.pairingMsg = this.intl.t('PAGE_WPS_YOUR_STATION_FAILED');
    setTimeout(() => {
      this.closeModal();
    }, 1000); // 1000ms = 1 seconds
  }
  
  async initWps5G() {       // WPS 1
    let url = '/commands';
    try {
      let response = await this.api.customFetch(url, {
        method: "post",
        body: JSON.stringify({
          command: 'Device.WiFi.AccessPoint.[CustomAlias=="WiFi-5G"].WPS.InitiateWPSPBC()',
          commandKey: "",
          sendresp: true,
          inputArgs: {
            // isRelay: false
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`Init 5G cmd HTTP error! status: ${response.status}`);
      }

      let result = await response.json();

      if(result.success == 'ok'){
        this.pairingStatus = this.intl.t('PAGE_WPS_POPUP_YOUR_STATION');
      }else{
        console.error('pairing unsuccessful');
        this.errorCode = "WPS 5G pairing unsuccessful";
      }
    } catch (error) {
      console.error('Error in initWps5G:', error);
      this.errorCode = error.message;
    }
  }

  async initWps2G() {       // WPS 3
    let url = '/commands';
    try {
      let response = await this.api.customFetch(url, {
        method: "post",
        body: JSON.stringify({
          command: 'Device.WiFi.AccessPoint.[CustomAlias=="WiFi-2G"].WPS.InitiateWPSPBC()',
          commandKey: "",
          sendresp: true,
          inputArgs: {
            // isRelay: false
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`Init 2G cmd HTTP error! status: ${response.status}`);
      }

      let result = await response.json();
      if(!result.success){
        console.error('pairing unsuccessful');
      }else{
        this.pairingStatus = this.intl.t('PAGE_WPS_POPUP_YOUR_STATION')
      }
    } catch (error) {
      console.error('Error in initWps2G:', error);
      this.errorCode = error.message;
    } 
  }

  async cancelWps5G() {
    let url = '/commands';
    try {
      let response = await this.api.customFetch(url, {
        method: "post",
        body: JSON.stringify({
          command: 'Device.WiFi.AccessPoint.[CustomAlias=="WiFi-5G"].WPS.cancelWPSPairing()',
          commandKey: "",
          sendresp: true,
          inputArgs: {}
        })
      });

      if (!response.ok) {
        throw new Error(`Cancel 5G cmd HTTP error! status: ${response.status}`);
      }

      let result = await response.json();
      if(!result.success){
        console.warn('WPS 5G pairing canceled');
      }else{
        this.pairingStatus = '';
        this.pairingMsg = '';
      }
    } catch (error) {
      console.error('Error in cancelWps5G:', error);
      this.errorCode = error.message;
    }
  }

  async cancelWps2G() {
    let url = '/commands';
    try {
      let response = await this.api.customFetch(url, {
        method: "post",
        body: JSON.stringify({
          command: 'Device.WiFi.AccessPoint.[CustomAlias=="WiFi-2G"].WPS.cancelWPSPairing()',
          commandKey: "",
          sendresp: true,
          inputArgs: {}
        })
      });

      if (!response.ok) {
        throw new Error(`Cancel 2G cmd HTTP error! status: ${response.status}`);
      }

       let result = await response.json();
        if(!result.success){
          console.warn('WPS 2G pairing canceled');
        }else{
          this.pairingStatus = '';
          this.pairingMsg = '';
        }
    } catch (error) {
      console.error('Error in cancelWps2G:', error);
      this.errorCode = error.message;
    }
  }

  startTimer() {
    this.isLoading = true;
    this.timer = later(this, this.updateTimer, 1000);
  }

  updateTimer() {
    this.isLoading = false;
    if (this.timeRemaining > 0) {
      this.pairingMsg = "Time remaining: "+ this.timeRemaining +" seconds";

      if ((this.timeRemaining < 120) && ((this.timeRemaining % 5) === 0)) { // Check every 5 seconds
        this.store.findRecord('wifi-accesspoint-wps', 'WiFi.AccessPoint.[CustomAlias=="WiFi-5G"].WPS.', { reload: true }).then((record) => {
          if (record) {
            // this.wpsPair5g = record.WPS.get('PairingInProgress');
            this.wpsPair5g = record.PairingInProgress;
            this.wpsPair5gStatus = record.Status;
          }
        });

        this.store.findRecord('wifi-accesspoint-wps', 'WiFi.AccessPoint.[CustomAlias=="WiFi-2G"].WPS.', { reload: true }).then((record) => {
          if (record) {
            this.wpsPair2g = record.PairingInProgress;
            this.wpsPair2gStatus = record.Status;
          }
        });
      }

      if (this.wpsPair5g !== null && this.wpsPair2g !== null) {
        if (this.wpsPair5g == 0 || this.wpsPair2g == 0) { // either WPS 5G or 2G stopped pairing, check status
          if (this.wpsPair5gStatus === 'Success' || this.wpsPair2gStatus === 'Success') { // pairing successful for either band 
            this.pairingStatus = this.intl.t('PAGE_WPS_PAIRING_SUCCESSFUL');
            this.pairingMsg = this.intl.t('PAGE_WPS_YOUR_STATION');
            setTimeout(() => { this.closeModal(); }, 2000); // 1000ms = 1 seconds
          } else {
            if (this.wpsPair5g == 0 && this.wpsPair2g == 0) { // pairing stopped for both bands
              if (this.wpsPair5gStatus === 'Overlap' && this.wpsPair2gStatus === 'Overlap') {
                this.pairingStatus = this.intl.t('PAGE_POPUP_PAIRING_OVERLAP');
              } else {
                this.pairingStatus = this.intl.t('PAGE_WPS_PAIRING_FAILED');
                this.pairingMsg = this.intl.t('PAGE_WPS_YOUR_STATION_FAILED');
              }
              setTimeout(() => { this.closeModal(); }, 2000);
            }
          }
        }
      }

      this.timeRemaining--;
      this.timer = later(this, this.updateTimer, 1000);
    } else {
      this.pairingStatus = this.intl.t('PAGE_POPUP_PAIRING_TIMED_OUT');
      this.pairingMsg = this.intl.t('PAGE_WPS_NO_DEVICES_');
      setTimeout(() => {
        this.closeModal();
      }, 2000); // 1000ms = 1 seconds
    }
  }

  @action
  closeModal() {
    this.errorCode = null;
    this.modalIsOpen = false;
    this.timeRemaining = 120; // Reset timer
    if (this.timer) {
      cancel(this.timer);
      this.reset_modal_stat();
    }
  }

  getModalBodyClasses() {
    const observer = new MutationObserver((mutations, obs) => {
      let modalBodies = document.querySelectorAll('.modal-body');
      modalBodies.forEach(modal => {
        const errorModal = document.querySelector('.modal-body.error');
        const pairingModal = document.querySelector('.modal-body.pairing');
        if (this.errorCode) {
          errorModal.style.display = "block";
          pairingModal.style.display = "none";
        } else {
          pairingModal.style.display  = "block";
          errorModal.style.display = "none";
        }
      });
      obs.disconnect(); // Stop observing once elements are found
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  reset_modal_stat(){
    this.pairingStatus = '';
    this.pairingMsg = '';
    this.wpsPair5g = null;
    this.wpsPair2g = null;
    this.wpsPair5gStatus = "";
    this.wpsPair2gStatus = "";
  }
}
