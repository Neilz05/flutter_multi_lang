import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { later, cancel } from '@ember/runloop';
import { set } from '@ember/object';
import config from 'prpl-webui/config/environment';

export default class WifiSettingsComponent extends Component {
  @service eaactrl;
  @service intl;

  @tracked _min = 0;
  @tracked _max = 0;

  @tracked BeaconPeriodMsg = "";
  @tracked DTIMIntervalMsg = "";
  @tracked FragmentationThresholdMsg = "";
  @tracked RtsThresholdMsg = "";
  @tracked AutoChannelRefreshPeriodMsg = "";

  @tracked componentFieldErrors = new Map();

  componentId = this.eaactrl.getRandomString(16);

  constructor() {
    super(...arguments);
    
    this.modelType = config.APP.modelType || 'Neutral';
    this.args.registerComponentFunction?.(this);
  }
  
  get componentId() {
      return this.componentId;
  }

  get wifiModeOptions() {
    return this.get_options('SupportedStandards');
  }

  get bandwidthOptions() {
    return this.get_options('SupportedOperatingChannelBandwidth');
  }

  get operatingStandards() {
    let standard = this.args.radio.get('OperatingStandards');

    if (standard === 'bg' || standard === 'an' || standard === 'gn' || standard === 'bgn') {
      if (standard === 'bg') {
        return 'g';
      } else if (standard === 'an' || standard === 'gn' || standard === 'bgn') {
        return 'n';
      }
    } else {
      return standard;
    }
  }

  get transmitPowerOptions() {
    let int = this.get_options('TransmitPowerSupported','int', '%',);
    int.forEach((item) => {
      if(item.key == -1){
        item.label = 'Auto';
      }
    });
    return int;
  }

  get BeaconPeriod(){
    return this.args.radio.get('BeaconPeriod');
  }

  get DTIMInterval(){
    return this.args.radio.get('DTIMPeriod');
  }

  get FragmentationThreshold() {
    return this.args.radio.DriverConfig.get('FragmentationThreshold');
  }

  get RtsThreshold(){
    return this.args.radio.DriverConfig.get('RtsThreshold');
  }

  get AutoChannelRefreshPeriod(){
    return this.args.radio.get('AutoChannelRefreshPeriod');
  }

  set BeaconPeriod(value){
    this.validateInput(value,'BeaconPeriod');
  }

  set DTIMInterval(value){
    this.validateInput(value,'DTIMPeriod');
  }

  set FragmentationThreshold(value) {
    this.validateInput(value,'FragmentationThreshold');
  }

  set RtsThreshold(value){
    this.validateInput(value,'RtsThreshold');
  }

  set AutoChannelRefreshPeriod(value) {
    this.validateInput(value,'AutoChannelRefreshPeriod');
  }

  @action
  setWifiMode(val) {
    set(this.args.radio, 'OperatingStandards', val);
  }

  @action
  setBandwidth(val) {
    set(this.args.radio, 'OperatingChannelBandwidth', val);
    if(this.args.radio.id == 'WiFi.Radio.1.'){
      set(this.args.radio, 'ObssCoexistenceEnable', 1);
    }
  }

  @action
  setObssCoexistenceEnable(event){
    let newValue = event.target.checked ? 1 : 0;
    set(this.args.radio, 'ObssCoexistenceEnable', newValue);
  }

  @action
  setTransmitPower(val) {
    set(this.args.radio, 'TransmitPower', Number(val));
  }
  
  @action
  handleBlur(event) {
    let value = event.target.value.trim();
    /* if (value == '' || Number(value) < -1) {
      event.target.value = null;
    }*/
  }

  @action
  handleInput(event) {
    this._min = Number(event.target.min);
    this._max = Number(event.target.max);
  }

  validateInput(value,param='') {
    let parsedValue = value == '' ? null : parseInt(value,10); // Handle clearing

    if(param == 'FragmentationThreshold' || param == 'RtsThreshold') {
      this.setDriverConfig(this.args.radio.DriverConfig, param, parsedValue);
    } else {
      if ((parsedValue !== 0) && (parsedValue >= this._min && parsedValue <= this._max)) {
        set(this.args.radio, param, parsedValue);
        this.clearErrorMsg(param);
      }else{
        set(this.args.radio, param, parsedValue);
        this.setErrorMsg(param);
      }
    }
  }
  
  get_options(param,type='str', concat = null){
    if(concat == null){concat = '';}
    let get_param = this.args.radio.get(param);
    let arr = [];

    if(param == 'SupportedStandards'){
      return this.getSupportedStandards_opt();
    }
    if(param == 'SupportedOperatingChannelBandwidth'){
      return this.getBandwidth_opt();
    }

    get_param.split(',').forEach((item) => {
      if(type == 'int'){item = parseInt(item);}
      arr.push({ key: item , label:  item + concat});
    });
    return arr;
  }

getSupportedStandards_opt() {
  let supported = this.args.radio.get('SupportedStandards');
  if (!supported) return [];

  let delItems = ['an', 'bg', 'gn', 'bgn'];
  let standards = supported.split(',').filter(s => !delItems.includes(s));
  let options = [];

  standards.forEach(standard => {
    let label = `IEEE 802.11${standard}`;
    let version = '';

    switch (standard) {
      case 'a':
      case 'b':
      case 'g':
        version = 'Wi-Fi 1/2/3';
        break;
      case 'n':
        version = 'Wi-Fi 4';
        break;
      case 'ac':
        version = 'Wi-Fi 5';
        break;
      case 'ax':
        version = 'Wi-Fi 6';
        break;
      case 'be':
        version = 'Wi-Fi 7';
        break;
      default:
        version = 'Wi-Fi (Unknown)';
    }

    options.push({
      key: standard,
      label: `${version} (IEEE 802.11 ${standard})`
    });
  });

  return options;
}


  getBandwidth_opt(){
    let options = [];
    let channel = this.args.radio.get('SupportedOperatingChannelBandwidth').split(',');
    let channelList_5g = [
      {key:"Auto", label: "Auto"},
      {key: '20MHz', label: '20MHz'},
      {key: '40MHz', label: '20/40MHz'},
      {key: '80MHz', label: '20/40/80MHz'},
      {key: '160MHz', label: '20/40/80/160MHz'},
    ];

    // if(this.args.radio.id.includes('1')){
    //   channelList_5g.forEach((item)=>{
    //     let flag = channel.includes(item.key)
    //     if(flag){
    //       options.push({ key: item.key, label:  item.label});
    //     }
    //   });
    // }else{
      channel.forEach((item)=>{
        options.push({ key: item, label:  item});
      })
    // }
    return options;
  }

  @action
  setDriverConfig(driverConfig, param, parsedValue) {
    if(param == 'FragmentationThreshold'){
      if ((parsedValue !== 0)) {
        if ((parsedValue === -1) || (parsedValue >= 256 && parsedValue <= this._max)) {
          set(driverConfig, param, parsedValue);
          this.clearErrorMsg(param);
        } else {
          set(driverConfig, param, parsedValue);
          this.setErrorMsg(param);
        }
      } else{
        set(driverConfig, param, parsedValue);
        this.setErrorMsg(param);
      }
    } else if(param == 'RtsThreshold'){
      if ((parsedValue !== 0)) {
        if ((parsedValue === -1) || (parsedValue >= 1 && parsedValue <= this._max)) {
          set(driverConfig, param, parsedValue);
          this.clearErrorMsg(param);
        } else {
          set(driverConfig, param, parsedValue);
          this.setErrorMsg(param);
        }
      }else{
        set(driverConfig, param, parsedValue);
        this.setErrorMsg(param);
      }
    }
  }

  @action
  setErrorMsg(param) {
    let hasErrors = false;
    let errorMsg = "";

    switch (param) {
      case 'BeaconPeriod':
        this.BeaconPeriodMsg = this.intl.t('PAGE_SETTINGS_INVALID_BEACON_INTERVAL');
        errorMsg = this.BeaconPeriodMsg.trim() !== '';
        break;

      case 'DTIMPeriod':
        this.DTIMIntervalMsg = this.intl.t('PAGE_SETTINGS_INVALID_DTIM_INTERVAL');
        errorMsg = this.DTIMIntervalMsg.trim() !== '';
        break;

      case 'FragmentationThreshold':
        this.FragmentationThresholdMsg = this.intl.t('PAGE_SETTINGS_INVALID_FRAGMENTATION_TRESHOLD');
        errorMsg = this.FragmentationThresholdMsg.trim() !== '';
        break;

      case 'RtsThreshold':
        this.RtsThresholdMsg = this.intl.t('PAGE_SETTINGS_INVALID_RTS_TRESHOLD');
        errorMsg = this.RtsThresholdMsg.trim() !== '';
        break;

      case 'AutoChannelRefreshPeriod':
        this.AutoChannelRefreshPeriodMsg = this.intl.t('PAGE_SETTINGS_INVALID_AUTO_REFRESH');
        errorMsg = this.AutoChannelRefreshPeriodMsg.trim() !== '';
        break;
    }

    const updatedErrors = new Map(this.componentFieldErrors);
    updatedErrors.set(param, errorMsg);
    this.componentFieldErrors = updatedErrors;

    // check if any of the component input fields returns at least one 'true' boolean value
    hasErrors = Array.from(this.componentFieldErrors.values()).some(Boolean);

    this.args.onError?.(this.args.componentId, hasErrors);
  }

  @action
  clearErrorMsg(param) {
    let hasErrors = false;
    let errorMsg = "";

    switch(param) {
      case 'BeaconPeriod':
        this.BeaconPeriodMsg = '';
        errorMsg = this.BeaconPeriodMsg.trim() !== '';
        break;

      case 'DTIMPeriod':
        this.DTIMIntervalMsg = '';
        errorMsg = this.DTIMIntervalMsg.trim() !== '';
        break;

      case 'FragmentationThreshold':
        this.FragmentationThresholdMsg = '';
        errorMsg = this.FragmentationThresholdMsg.trim() !== '';
        break;

      case 'RtsThreshold':
        this.RtsThresholdMsg = '';
        errorMsg = this.RtsThresholdMsg.trim() !== '';
        break;

      case 'AutoChannelRefreshPeriod':
        this.AutoChannelRefreshPeriodMsg = '';
        errorMsg = this.AutoChannelRefreshPeriodMsg.trim() !== '';
        break;
    }

    const updatedErrors = new Map(this.componentFieldErrors);
    updatedErrors.set(param, errorMsg);
    this.componentFieldErrors = updatedErrors;

    // check if any of the component input fields returns at least one 'true' boolean value
    hasErrors = Array.from(this.componentFieldErrors.values()).some(Boolean);

    this.args.onError?.(this.args.componentId, hasErrors);
  }

  clearAllErrorMsgs(){
    this.BeaconPeriodMsg = '';
    this.DTIMIntervalMsg = '';
    this.FragmentationThresholdMsg = '';
    this.RtsThresholdMsg = '';

    // clear the internal error tracking
    this.componentFieldErrors = new Map();

    this.args.onError?.(this.args.componentId, false);
  }
}
