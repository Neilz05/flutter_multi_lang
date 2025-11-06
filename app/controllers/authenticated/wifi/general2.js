import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import ssidValidations from '../../../validations/wifi-general-ssid2';
import securityValidations from '../../../validations/wifi-accesspoint-security-ascii32to126';

export default class AuthenticatedWifiController extends Controller {
  @service store
  @service intl
    @service currentUser;   
  
    get isSuperAdminUser(){
        return this.currentUser.isSuperAdmin();
    }
    get isEndUser(){
        return this.currentUser.isEndUser();
    }
    get uiMode(){
        return this.currentUser.uiMode;
    }
    get isEndUserAndBasicMode(){
        return this.isEndUser && ((this.uiMode == "Basic") || (this.uiMode == ""));
    }
    
  @tracked ssidChangesets = []
  @tracked securityChangesets = []

  @tracked combinedwifiArray_main = []
  @tracked combinedwifiArray_main_enduserBasic = []
  @tracked splitwifiArray_main = []

  @tracked combinedwifiArray_custom = []
  @tracked splitwifiArray_custom = []

  @tracked combinedwifiArray_compat_enduserBasic = []
  
  @tracked combinedwifiArray_guest = []
  @tracked combinedwifiArray_guest_enduserBasic = []
  
  setupActiveWifi(){
      this.setActiveWifi(this.radio5gMain.Enable == 1 || this.radio2gMain.Enable == 1);
  }

  setupWifiArray() {

    const splitConfigMain = [
      ['WiFi-5G', 'Wl0', 'PAGE_GENERAL_MAINWIFI_5_GHZ', 'PAGE_GENERAL_MAINWIFI_5_GHZ_ENABLE_WPS', {wps:true, accesspoint: true}],
      ['WiFi-2G', 'Wl1', 'PAGE_GENERAL_MAINWIFI_2_4_GHZ', 'PAGE_GENERAL_MAINWIFI_2_4_GHZ_ENABLE_WPS', {wps:true, accesspoint: true}],
    ];
    const combindConfigMain = [
      ['WiFi-2G', 'Wl1', 'PAGE_GENERAL_MAINWIFI_UNIFY', 'PAGE_GENERAL_MAINWIFI_2_4_GHZ_ENABLE_WPS', {wps:true, accesspoint: true}],
    ];
    this.splitwifiArray_main = this.createNetworkConfig(splitConfigMain);
    this.combinedwifiArray_main = this.createNetworkConfig(combindConfigMain);

    const combindConfigMain_enduserBasic = [
      ['WiFi-2G', 'Wl1', 'PAGE_GENERAL_MAINWIFI_UNIFY', 'PAGE_GENERAL_MAINWIFI_2_4_GHZ_ENABLE_WPS', {wps:true, accesspoint: false}],
    ];
    this.combinedwifiArray_main_enduserBasic = this.createNetworkConfig(combindConfigMain_enduserBasic);

    const splitConfigCustom = [
      ['WiFi-5G-Custom', 'Wl0', 'PAGE_GENERAL_CUSTOMWIFI_5_GHZ', 'PAGE_GENERAL_CUSTOMWIFI_5_GHZ_ENABLE_WPS', {wps:true, accesspoint: true}],
      ['WiFi-2G-Custom', 'Wl1', 'PAGE_GENERAL_CUSTOMWIFI_2_4_GHZ', 'PAGE_GENERAL_CUSTOMWIFI_2_4_GHZ_ENABLE_WPS', {wps:true, accesspoint: true}],
    ];
    const combindConfigCustom = [
      ['WiFi-2G-Custom', 'Wl1', 'PAGE_GENERAL_CUSTOMWIFI_UNIFY', 'PAGE_GENERAL_CUSTOMWIFI_2_4_GHZ_ENABLE_WPS', {wps:true, accesspoint: true}],
    ];
    this.splitwifiArray_custom = this.createNetworkConfig(splitConfigCustom);
    this.combinedwifiArray_custom = this.createNetworkConfig(combindConfigCustom);

    const combindConfigCompat = [
      ['WiFi-2G-Compat', 'Wl1', 'PAGE_GENERAL_COMPATWIFI_UNIFY', 'PAGE_GENERAL_COMPATWIFI_2_4_GHZ_ENABLE_WPS', {wps:true, accesspoint: false, protection_mode: false}],
    ];

    this.combinedwifiArray_compat_enduserBasic = this.createNetworkConfig(combindConfigCompat);
 
    const combindConfigGuest = [
      ['WiFi-2G-Guest', 'Wl1', 'PAGE_GENERAL_GUESTWIFI_UNIFY', null, {wps:false, accesspoint: false, limitedtime: true, allow: true}],
    ];
    this.combinedwifiArray_guest = this.createNetworkConfig(combindConfigGuest);
    
    const combindConfigGuest_enduserBasic = [
      ['WiFi-2G-Guest', 'Wl1', 'PAGE_GENERAL_GUESTWIFI_UNIFY', null, {wps:false, accesspoint: false, limitedtime: false, allow: false, protection_mode: false}],
    ];
    this.combinedwifiArray_guest_enduserBasic = this.createNetworkConfig(combindConfigGuest_enduserBasic);

  }

  createNetworkConfig(configParam){
      return configParam.map(([ssidAlias, radioAlias, header, enableWpsLabel, show]) =>
        this.createBandConfig(ssidAlias, radioAlias, header, enableWpsLabel, show)
        );      
  }
  
  createBandConfig(ssidAlias, radioAlias, headertext, enableWpsLabel, show) {
    let ssid = this.store.peekAll('wifi-ssid').find(e => e.Alias === ssidAlias);
    
    //console.log(ssidAlias, ssid);
    let ssidChangeSet = new Changeset(ssid, lookupValidator(ssidValidations), ssidValidations);
    
    /*  this.ssidChangesets.push(ssidChangeSet); */
    this.ssidChangesets = [...this.ssidChangesets, ssidChangeSet]

    let radio = null;
    let accesspoint = null;
    let security = null;
    let securityChangeSet = null
    let wps = null;

    // Derive numeric index from SSID ID (e.g., 'Device.WiFi.SSID.3' → '3')
    let ssidIndex = ssid?.id?.split('.').filter(Boolean).pop();
    
    //console.log('ssidIndex', ssidIndex);
    // Always attempt to get accesspoint and security using SSID index
    if (ssidIndex) {
      // Only assign radio if it's not a Guest SSID
      /*if (!ssidAlias.includes('-Guest')) {
        radio = this.store.peekAll('wifi-radio').find(e => e.Alias === radioAlias)
      }*/

      accesspoint = this.store.peekAll('wifi-accesspoint').find(ap => ap.id.endsWith(`.${ssidIndex}.`));

      if (accesspoint) {
          // security obj
        const expectedSecurityId = `${accesspoint.id}Security.`; // Ensure trailing period
        security = this.store.peekAll('wifi-accesspoint-security').find(sec => sec.id === expectedSecurityId);
        securityChangeSet = new Changeset(security, lookupValidator(securityValidations), securityValidations);
        this.securityChangesets = [...this.securityChangesets, securityChangeSet]

        if (!security) {
          console.warn(`Security with id '${expectedSecurityId}' not found.`);
        }

        // WPS
        const expectedWpsId = `${accesspoint.id}WPS.`; // Ensure trailing period
        wps = this.store.peekAll('wifi-accesspoint-wps').find(c => c.id === expectedWpsId);


      } else {
        console.warn(`AccessPoint for SSID index '${ssidIndex}' not found.`);
      }
    }
    
    if (show){
        if (show.protection_mode == undefined){
            show['protection_mode'] = true;
        }
    }

    return {
      header: this.intl.t(headertext),
      enableWpsLabel: enableWpsLabel ? this.intl.t(enableWpsLabel) : '',
      ssid,
      ssidChangeSet,
      //radio,
      accesspoint,
      wps,
      security,
      securityChangeSet,
      show
    };
  }

  @tracked activeWifiValue = true;
  @action
  setActiveWifi(value){
    this.activeWifiValue = value;
    if (value){
        this.radio5gMain.Enable = 1;
        this.radio2gMain.Enable = 1;
    }else{
        this.radio5gMain.Enable = 0;
        this.radio2gMain.Enable = 0;
    }
  }
  get radio5gMain() {
    return this.store.peekAll('wifi-radio').find(
      ap => ap.Alias === 'Wl0'
    )
  }
  get radio2gMain() {
    return this.store.peekAll('wifi-radio').find(
      ap => ap.Alias === 'Wl1'
    )
  }

  @action
  ToggleUnifyNetwork_main(record, attr) {
    record[attr] = record[attr] === 1 ? 0 : 1;

      const isEnabled = record[attr] === 1;

      if (isEnabled) {
        this.subfixSSID('remove', this.splitwifiArray_main)
      } else {
        this.subfixSSID('add', this.splitwifiArray_main)
      }

  }
  @action
  ToggleUnifyNetwork_custom(record, attr) {
    record[attr] = record[attr] === 1 ? 0 : 1;

      const isEnabled = record[attr] === 1;

      if (isEnabled) {
        this.subfixSSID('remove', this.splitwifiArray_custom)
      } else {
        this.subfixSSID('add', this.splitwifiArray_custom)
      }
  }
  
  @action
  Toggle(record, attr) {
    record[attr] = record[attr] === 1 ? 0 : 1;

    if (attr === 'X_SC_SSIDSplit') {
      const isEnabled = record[attr] === 1;

      if (isEnabled) {
        this.subfixSSID('add', this.splitwifiArray_main)
      } else {
        this.subfixSSID('remove', this.splitwifiArray_main)
      }
    }else if (attr === 'X_SC_CustomSSIDSplit') {
      const isEnabled = record[attr] === 1;

      if (isEnabled) {
        this.subfixSSID('add', this.splitwifiArray_custom)
      } else {
        this.subfixSSID('remove', this.splitwifiArray_custom)
      }
    }else if (attr === 'X_SC_CompatSSIDSplit') {

    } 
  }
  subfixSSID(action, networkArray) {
    const frequencyMap = {
      '2G': '',
      '5G': '-5G'
    };

    networkArray.forEach(wifi => {
      const { ssid: { SSID, Alias } } = wifi;
      const matchedFrequency = Object.keys(frequencyMap).find(freq => 
        Alias.toUpperCase().includes(freq)
      );

      if (!matchedFrequency) return;

      const suffix = frequencyMap[matchedFrequency];
      const newSSID = action === 'add' 
        ? `${SSID}${suffix}`
        : SSID.replace(new RegExp(`${suffix}$`), '');

      wifi.ssid.set('SSID', newSSID);
    });
  }

  get HasChanges() {

    let allSsidsValid = this.ssidChangesets.every(cs => cs?.isValid);
    let allSecurityValid = this.securityChangesets.every(cs => cs?.isValid);

    let hasDirtyChanges =
      this.ssidChangesets.find(cs => cs?.isDirty) ||
      this.securityChangesets.find(cs => cs?.isDirty) ||
      this.store.peekAll('x-fastweb-wifi-splitssiddisable').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-x-000e50-multiap-steering').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-ssid').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-radio').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-accesspoint').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-accesspoint-wps').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-accesspoint-security').find(m => m.hasDirtyAttributes);

    return allSsidsValid && allSecurityValid && hasDirtyChanges;
  }
  
  unifyNetwork(current){

          // === SSID section ===
          let ssid2g = this.store.peekAll('wifi-ssid').find(e => e.Alias === current.alias_2g);
          let ssid5g = this.store.peekAll('wifi-ssid').find(e => e.Alias === current.alias_5g);

          ssid5g.SSID = ssid2g.SSID;
          ssid5g.Enable = ssid2g.Enable;

          // === Security section ===

          const getIndex = id => id?.split('.').filter(Boolean).pop();

          // SSID security
          let ssid2gIndex = getIndex(ssid2g?.id);
          let ssid5gIndex = getIndex(ssid5g?.id);
          
          let sec2g = this.store.peekAll('wifi-accesspoint-security').find(
            sec => sec.id === `WiFi.AccessPoint.${ssid2gIndex}.Security.`
          );
          let sec5g = this.store.peekAll('wifi-accesspoint-security').find(
            sec => sec.id === `WiFi.AccessPoint.${ssid5gIndex}.Security.`
          );

          if (sec2g && sec5g) {
            sec5g.KeyPassPhrase = sec2g.KeyPassPhrase;
            sec5g.ModeEnabled = sec2g.ModeEnabled;

            // limited time
            if (current.limitedtime && (sec2g.X_FASTWEB_MaximumTime != undefined)){
                sec5g.X_FASTWEB_MaximumTime = sec2g.X_FASTWEB_MaximumTime;
            }
            // allow
            if (current.allow && (sec2g.X_FASTWEB_Allow != undefined)){
                sec5g.X_FASTWEB_Allow = sec2g.X_FASTWEB_Allow;
            }

          }
          

          if (current.wps){
              //  WPS Enable  
              console.log("apply handle wps on unify network");
              let wps2g = this.store.peekAll('wifi-accesspoint-wps').find(
                c => c.id === `WiFi.AccessPoint.${ssid2gIndex}.WPS.`
              );
              let wps5g = this.store.peekAll('wifi-accesspoint-wps').find(
                c => c.id === `WiFi.AccessPoint.${ssid5gIndex}.WPS.`
              );              

              if (wps2g && wps5g) {
                wps5g.Enable = wps2g.Enable;
              }
          }
  }

  @action
  async Apply() {
    this.ssidChangesets
      .filter(c => c.isDirty)
      .map(c => {
        console.log('Applying SSID changeset:', c.SSID);
        c.execute(); // <-- flush changes to model
      })

    this.securityChangesets
      .filter(c => c.isDirty)
      .map(c => {
        c.execute(); // <-- flush changes to model
      });


    if (this.model.SplitSSIDDisable_main.Enable === 1) {        
        [
            { alias_2g: 'WiFi-2G', alias_5g: 'WiFi-5G', wps: true},
            //{ alias_2g: 'WiFi-2G-Guest', alias_5g: 'WiFi-5G-Guest', wps: false}       
        ].forEach(c => { this.unifyNetwork(c); });
    }   
    
    if (this.model.SplitSSIDDisable_custom.Enable === 1) {        
        [
            { alias_2g: 'WiFi-2G-Custom', alias_5g: 'WiFi-5G-Custom', wps: true},        
        ].forEach(c => { this.unifyNetwork(c); });
    }   

    if (this.model.SplitSSIDDisable_compat.Enable === 1) {        
        [
            { alias_2g: 'WiFi-2G-Compat', alias_5g: 'WiFi-5G-Compat', wps: true},        
        ].forEach(c => { this.unifyNetwork(c); });
    }       
    // Guest Wifi always unify 
        [
            { alias_2g: 'WiFi-2G-Guest', alias_5g: 'WiFi-5G-Guest', wps: false, limitedtime: true, allow: true },        
        ].forEach(c => { this.unifyNetwork(c); });


    // Step 2: Collect dirty models
    const SplitSSIDDisable = this.store.peekAll('x-fastweb-wifi-splitssiddisable').filter(m => m.hasDirtyAttributes)
    const wifi = this.store.peekAll('wifi').filter(m => m.hasDirtyAttributes)
    const bandsteering = this.store.peekAll('wifi-x-000e50-multiap-steering').filter(m => m.hasDirtyAttributes)
    const ssids = this.store.peekAll('wifi-ssid').filter(m => m.hasDirtyAttributes);
    const radios = this.store.peekAll('wifi-radio').filter(m => m.hasDirtyAttributes);
    const accesspoints = this.store.peekAll('wifi-accesspoint').filter(m => m.hasDirtyAttributes);
    const securities = this.store.peekAll('wifi-accesspoint-security').filter(m => m.hasDirtyAttributes);
    const wpses = this.store.peekAll('wifi-accesspoint-wps').filter(m => m.hasDirtyAttributes);

    const allDirtyModels = [...SplitSSIDDisable, ...wifi, ...ssids, ...radios, ...accesspoints, ...securities, ...wpses, ...bandsteering];

    // Step 3: Save each and capture success/failure
    //may have compiler bug
    Promise.all(
      allDirtyModels.map(c => c.save())
    ).finally(() => {
      //window.location.reload() // only runs after all saves complete
    })
  }


  @action
  Cancel() {
    this.ssidChangesets.forEach(cs => {
      if (cs.isDirty) {
        cs.rollback();
      }
    });

    this.securityChangesets.forEach(cs => {
      if (cs.isDirty) {
        cs.rollback();
      }
    });

    this.store.peekAll('x-fastweb-wifi-splitssiddisable').forEach(c => {
      if (c.hasDirtyAttributes) {
        c.rollbackAttributes();
      }
    });

    // Rollback all dirty wifi-ssid models
    this.store.peekAll('wifi-ssid').forEach(c => {
      if (c.hasDirtyAttributes) {
        c.rollbackAttributes();
      }
    });

    // Rollback all dirty wifi-radio models
    this.store.peekAll('wifi-radio').forEach(c => {
      if (c.hasDirtyAttributes) {
        c.rollbackAttributes();
      }
    });

    // Rollback all dirty wifi-accesspoint models
    this.store.peekAll('wifi-accesspoint').forEach(c => {
      if (c.hasDirtyAttributes) {
        c.rollbackAttributes();
      }
    });

    // Rollback all dirty wifi-accesspoint-security models
    this.store.peekAll('wifi-accesspoint-security').forEach(c => {
      if (c.hasDirtyAttributes) {
        c.rollbackAttributes();
      }
    });
    // Rollback all dirty wifi-accesspoint-wps models
    this.store.peekAll('wifi-accesspoint-wps').forEach(c => {
      if (c.hasDirtyAttributes) {
        c.rollbackAttributes();
      }
    });

    this.store.peekAll('wifi-x-sc-bandsteering').forEach(c => {
      if (c.hasDirtyAttributes) {
        c.rollbackAttributes();
      }
    });

  }

}
