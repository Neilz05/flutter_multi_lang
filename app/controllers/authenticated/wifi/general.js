import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import ssidValidations from '../../../validations/wifi-general-ssid';
import securityValidations from '../../../validations/wifi-accesspoint-security';

export default class AuthenticatedWifiController extends Controller {
  @service store
  @service intl

  @tracked ssidChangesets = []
  @tracked securityChangesets = []

  @tracked wifiArray = []
  @tracked splitwifiArray = []
  @tracked SSIDSplitOn = this.model.X_SC_SSIDSplit === 1 ? true : false;
  @tracked enable6g = false;

  setupWifiArray() {
   const ssid6g = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-6G');
  let combinedConfig, splitConfig;
  if (ssid6g) {
    this.enable6g = true;
    splitConfig = [
      ['WiFi-2G', 'Wl1', 'PAGE_GENERAL_MAIN_WIFI_SSID_ON'],
      ['WiFi-5G', 'Wl0', 'PAGE_GENERAL_MAIN_WIFI_5_GHZ'],
      ['WiFi-6G', 'Wl2', 'PAGE_GENERAL_MAIN_WIFI_6_GHZ'],
      ['WiFi-2G-Guest', 'Wl1', 'PAGE_GENERAL_GUEST_WIFI_2_4_GHZ'],
      ['WiFi-5G-Guest', 'Wl0', 'PAGE_GENERAL_GUEST_WIFI_5_GHZ'],
      ['WiFi-6G-Guest', 'Wl2', 'PAGE_GENERAL_GUEST_WIFI_6_GHZ']
    ];
    combinedConfig = [
      ['WiFi-2G', 'Wl1', 'PAGE_GENERAL_MAIN_WIFI_WITH_6_GHZ'],
      ['WiFi-2G-Guest', 'Wl1', 'PAGE_GUEST_MAIN_WIFI_WITH_6_GHZ']
    ];
  } else {
    this.enable6g = false;
    splitConfig = [
      ['WiFi-2G', 'Wl1', 'PAGE_GENERAL_MAIN_WIFI_SSID_ON'],
      ['WiFi-5G', 'Wl0', 'PAGE_GENERAL_MAIN_WIFI_5_GHZ'],
      ['WiFi-2G-Guest', 'Wl1', 'PAGE_GENERAL_GUEST_WIFI_2_4_GHZ'],
      ['WiFi-5G-Guest', 'Wl0', 'PAGE_GENERAL_GUEST_WIFI_5_GHZ'],
    ];
    combinedConfig = [
      ['WiFi-2G', 'Wl1', 'PAGE_GENERAL_MAIN_WIFI'],
      ['WiFi-2G-Guest', 'Wl1', 'PAGE_GUEST_MAIN_WIFI']
    ];
  }

    this.splitwifiArray = splitConfig.map(([ssidAlias, radioAlias, header]) =>
      this.createBandConfig(ssidAlias, radioAlias, header)
    );

    this.wifiArray = combinedConfig.map(([ssidAlias, radioAlias, header]) =>
      this.createBandConfig(ssidAlias, radioAlias, header)
    );
  }

  createBandConfig(ssidAlias, radioAlias, headertext) {
    let ssidValidator = ssidValidations(this.store, this.model.X_SC_SSIDSplit);
    let ssid = this.store.peekAll('wifi-ssid').find(e => e.Alias === ssidAlias);
    let ssidChangeSet = new Changeset(ssid, lookupValidator(ssidValidator), ssidValidator);
    
    /*  this.ssidChangesets.push(ssidChangeSet); */
    this.ssidChangesets = [...this.ssidChangesets, ssidChangeSet]

    let radio = null;
    let accesspoint = null;
    let security = null;
    let securityChangeSet = null

    // Derive numeric index from SSID ID (e.g., 'Device.WiFi.SSID.3' → '3')
    let ssidIndex = ssid?.id?.split('.').filter(Boolean).pop();
    // Always attempt to get accesspoint and security using SSID index
    if (ssidIndex) {
      // Only assign radio if it's not a Guest SSID
      if (!ssidAlias.includes('-Guest')) {
        radio = this.store.peekAll('wifi-radio').find(e => e.Alias === radioAlias)
      }

      accesspoint = this.store.peekAll('wifi-accesspoint').find(ap => ap.id.endsWith(`.${ssidIndex}.`));

      if (accesspoint) {
        const expectedSecurityId = `${accesspoint.id}Security.`; // Ensure trailing period
        security = this.store.peekAll('wifi-accesspoint-security').find(sec => sec.id === expectedSecurityId);
        securityChangeSet = new Changeset(security, lookupValidator(securityValidations), securityValidations);
        this.securityChangesets = [...this.securityChangesets, securityChangeSet]

        if (!security) {
          console.warn(`Security with id '${expectedSecurityId}' not found.`);
        }
      } else {
        console.warn(`AccessPoint for SSID index '${ssidIndex}' not found.`);
      }
    }

    return {
      header: this.intl.t(headertext),
      ssid,
      ssidChangeSet,
      radio,
      accesspoint,
      security,
      securityChangeSet
    };
  }

  get BandSteering(){
    return this.store.peekRecord('wifi-x-000e50-multiap-steering', 'WiFi.X_000E50_MultiAP.Steering.')
  }

  /* get wifiArray() {


    let arr = []
    // this.createBandConfig(SSID, RADIO, HEADER TEXT)

    if (this.model.X_SC_SSIDSplit === 1) {
      arr.push(this.createBandConfig('WiFi-2G', 'Wl1', 'PAGE_GENERAL_MAIN_WIFI_SSID_ON'))
      arr.push(this.createBandConfig('WiFi-5G', 'Wl0', 'PAGE_GENERAL_MAIN_WIFI_5_GHZ'))
      arr.push(this.createBandConfig('WiFi-2G-Guest', 'Wl1', 'PAGE_GENERAL_GUEST_WIFI_2_4_GHZ'))
      arr.push(this.createBandConfig('WiFi-5G-Guest', 'Wl0', 'PAGE_GENERAL_GUEST_WIFI_5_GHZ'))
    }
    else {
      arr.push(this.createBandConfig('WiFi-2G', 'Wl1', 'PAGE_GENERAL_MAIN_WIFI'))
      arr.push(this.createBandConfig('WiFi-2G-Guest', 'Wl1', 'PAGE_GUEST_MAIN_WIFI'))
    }


    return arr
  } */

  get wifiRadioArray() {
    return this.store.peekAll('wifi-radio')
  }

  get accesspoint5gMain() {
    const ssid = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-5G');
    const ssidIndex = ssid?.id?.split('.').filter(Boolean).pop(); // Get '1' from 'Device.WiFi.SSID.1.'

    if (!ssidIndex) return null;

    return this.store.peekAll('wifi-accesspoint').find(ap =>
      ap.id.endsWith(`.${ssidIndex}.`)
    );
  }

  get accesspoint5gGuest() {
    const ssid = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-5G-Guest');
    const ssidIndex = ssid?.id?.split('.').filter(Boolean).pop();

    if (!ssidIndex) return null;

    return this.store.peekAll('wifi-accesspoint').find(ap =>
      ap.id.endsWith(`.${ssidIndex}.`)
    );
  }

  get accesspoint6gMain() {
    const ssid = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-6G');
    const ssidIndex = ssid?.id?.split('.').filter(Boolean).pop(); // Get '1' from 'Device.WiFi.SSID.1.'

    if (!ssidIndex) return null;

    return this.store.peekAll('wifi-accesspoint').find(ap =>
      ap.id.endsWith(`.${ssidIndex}.`)
    );
  }

  get accesspoint6gGuest() {
    const ssid = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-6G-Guest');
    const ssidIndex = ssid?.id?.split('.').filter(Boolean).pop();

    if (!ssidIndex) return null;

    console.log('ACCESS POINT 6GGUEST:', this.store.peekAll('wifi-accesspoint').find(ap =>
      ap.id.endsWith(`.${ssidIndex}.`)));
    return this.store.peekAll('wifi-accesspoint').find(ap =>
      ap.id.endsWith(`.${ssidIndex}.`)
    );
  }

  get radio5gMain() {
    return this.store.peekAll('wifi-radio').find(
      ap => ap.Alias === 'Wl0'
    )
  }

  get radio6gMain() {
    return this.store.peekAll('wifi-radio').find(
      ap => ap.Alias === 'Wl2'
    )
  }

  @action
  Toggle(record, attr) {
    record[attr] = record[attr] === 1 ? 0 : 1;

    if (attr === 'X_SC_SSIDSplit') {
      const isEnabled = record[attr] === 1;
      this.SSIDSplitOn = isEnabled;

      if (isEnabled) {
        this.BandSteering.BandSteeringEnable = 0;
        this.subfixSSID('add')
      } else {
        this.subfixSSID('remove')
      }
    }
  }

  subfixSSID(action) {
    const frequencyMap = {
      '2G': '-2.4G',
      '5G': '-5G',
      '6G': '-6G'
    };

    this.splitwifiArray.forEach(wifi => {
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
      this.store.peekAll('wifi').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-x-000e50-multiap-steering').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-ssid').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-radio').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-accesspoint').find(m => m.hasDirtyAttributes) ||
      this.store.peekAll('wifi-accesspoint-security').find(m => m.hasDirtyAttributes);

    let hasDuplicates = !this.checkDuplicateSSIDs();

    console.log('Value of HasChanges:', allSsidsValid && allSecurityValid && hasDirtyChanges && hasDuplicates);
    return allSsidsValid && allSecurityValid && hasDirtyChanges && hasDuplicates;
  }

  @action
  checkDuplicateSSIDs() {
    let result = false;
    let ssidObj = {};
    const ids = ["SSID_WiFi-2G", "SSID_WiFi-5G", "SSID_WiFi-6G", "SSID_WiFi-2G-Guest", "SSID_WiFi-5G-Guest", "SSID_WiFi-6G-Guest"];

    // Find each of the input fields with the corresponding element IDs and
    // get the current value in the input field.
    ids.forEach((id) => {
      let input = document.getElementById(id);

      if (input) {
        ssidObj[id] = input.value;
      }
    })

    // Create a mapping of the SSID input fields using the value as the key and
    // the element's ID as the value.
    let ssidMap = {};

    for (const [key, value] of Object.entries(ssidObj)) {
      if (!ssidMap[value]) {
        ssidMap[value] = [];
      }

      ssidMap[value].push(key);
    }

    // Create another mapping which contains which input fields have duplicate SSIDs.
    let duplicateSSIDs = {};

    for (const [value, keys] of Object.entries(ssidMap)) {
      if (keys.length > 1) {
        keys.forEach((key) => {
          duplicateSSIDs[key] = value;
        });
      }
    }

    // Always clear first the error messages
    this.clearDuplicateSSIDErrorMessages();

    // If the mapping with duplicate SSIDs have entries, show the error message
    if(Object.keys(duplicateSSIDs).length > 0) {
      this.showDuplicateSSIDError(duplicateSSIDs);
      result = true;
    } else {
      result = false;
    }

    return result;
  }

  @action
  showDuplicateSSIDError(duplicateSSIDs) {
    Object.entries(duplicateSSIDs).forEach(([key, value]) => {

      // replace the prefix 'SSID_' in the element's ID and replace it with 'duplicate_'
      let wifi = key.replace("SSID_", "");
      let errorDivID = "duplicate_" + wifi;
      let errorElement = document.getElementById(errorDivID);

      // As a guard, check first if the element exists. If it does, then show the error message
      if (errorElement) {
        errorElement.textContent = this.intl.t('PAGE_GENERAL_WIFI_NAME_DUPLICATE_ERROR');
      }
    });
  }

  @action
  clearDuplicateSSIDErrorMessages() {
    const ids = ["SSID_WiFi-2G", "SSID_WiFi-5G", "SSID_WiFi-6G", "SSID_WiFi-2G-Guest", "SSID_WiFi-5G-Guest", "SSID_WiFi-6G-Guest"];

    ids.forEach((id) => {
      let wifi = id.replace("SSID_", "");
      let errorDivID = "duplicate_" + wifi;
      let errorElement = document.getElementById(errorDivID);

      // Again, check first if the element exists and if its current content is not empty.
      // If both conditions are fulfilled, set the text content of the div to empty.
      if (errorElement && errorElement.textContent.trim() !== "") {
        errorElement.textContent = "";
      }
    });
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

    if (this.model?.X_SC_SSIDSplit == null || this.model.X_SC_SSIDSplit === 0) {

      // === SSID section ===
      let ssid2g = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-2G');
      let ssid5g = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-5G');
      let ssid6g = undefined;
      if (this.enable6g) {
        ssid6g = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-6G');
      }

      ssid5g.SSID = ssid2g.SSID;
      ssid5g.Enable = ssid2g.Enable;
      if (this.enable6g) {
        ssid6g.SSID = ssid2g.SSID;
        ssid6g.Enable = ssid2g.Enable;
      }

      let ssid2g_guest = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-2G-Guest');
      let ssid5g_guest = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-5G-Guest');
      let ssid6g_guest = undefined;
      if (this.enable6g) {
        ssid6g_guest = this.store.peekAll('wifi-ssid').find(e => e.Alias === 'WiFi-6G-Guest');
      }

      ssid5g_guest.SSID = ssid2g_guest.SSID;
      ssid5g_guest.Enable = ssid2g_guest.Enable;
      if (this.enable6g) {
        ssid6g_guest.SSID = ssid2g_guest.SSID;
        ssid6g_guest.Enable = ssid2g_guest.Enable;
      }

      // === Security section ===

      const getIndex = id => id?.split('.').filter(Boolean).pop();

      // Regular SSID security
      let ssid2gIndex = getIndex(ssid2g?.id);
      let ssid5gIndex = getIndex(ssid5g?.id);
      let ssid6gIndex = undefined;
      if (this.enable6g) {
        ssid6gIndex = getIndex(ssid6g?.id);
      }
      

      let sec2g = this.store.peekAll('wifi-accesspoint-security').find(
        sec => sec.id === `WiFi.AccessPoint.${ssid2gIndex}.Security.`
      );
      let sec5g = this.store.peekAll('wifi-accesspoint-security').find(
        sec => sec.id === `WiFi.AccessPoint.${ssid5gIndex}.Security.`
      );
      let sec6g = undefined;
      if (this.enable6g) {
        sec6g = this.store.peekAll('wifi-accesspoint-security').find(
          sec => sec.id === `WiFi.AccessPoint.${ssid6gIndex}.Security.`
        );
      }

      if (sec2g && sec5g) {
        sec5g.KeyPassPhrase = sec2g.KeyPassPhrase;
        sec5g.ModeEnabled = sec2g.ModeEnabled;
        if (sec6g) {
          sec6g.KeyPassPhrase = sec2g.KeyPassPhrase;
          sec6g.ModeEnabled = sec2g.ModeEnabled;
        }
      }

      // Guest SSID security
      let ssid2gGuestIndex = getIndex(ssid2g_guest?.id);
      let ssid5gGuestIndex = getIndex(ssid5g_guest?.id);
      let ssid6gGuestIndex = undefined;
      if (this.enable6g) {
        ssid6gGuestIndex = getIndex(ssid6g_guest?.id);
      }

      let sec2gGuest = this.store.peekAll('wifi-accesspoint-security').find(
        sec => sec.id === `WiFi.AccessPoint.${ssid2gGuestIndex}.Security.`
      );
      let sec5gGuest = this.store.peekAll('wifi-accesspoint-security').find(
        sec => sec.id === `WiFi.AccessPoint.${ssid5gGuestIndex}.Security.`
      );
      let sec6gGuest;
      if (this.enable6g) {
        sec6gGuest = this.store.peekAll('wifi-accesspoint-security').find(
          sec => sec.id === `WiFi.AccessPoint.${ssid6gGuestIndex}.Security.`
        );
      }

      if (sec2gGuest && sec5gGuest) {
        sec5gGuest.KeyPassPhrase = sec2gGuest.KeyPassPhrase;
        sec5gGuest.ModeEnabled = sec2gGuest.ModeEnabled;
        if (sec6gGuest) {
          sec6gGuest.KeyPassPhrase = sec2gGuest.KeyPassPhrase;
          sec6gGuest.ModeEnabled = sec2gGuest.ModeEnabled;
        }
      }
    }

    
    
    

    // Step 2: Collect dirty models
    const wifi = this.store.peekAll('wifi').filter(m => m.hasDirtyAttributes)
    const bandsteering = this.store.peekAll('wifi-x-000e50-multiap-steering').filter(m => m.hasDirtyAttributes)
    const ssids = this.store.peekAll('wifi-ssid').filter(m => m.hasDirtyAttributes);
    const radios = this.store.peekAll('wifi-radio').filter(m => m.hasDirtyAttributes);
    const accesspoints = this.store.peekAll('wifi-accesspoint').filter(m => m.hasDirtyAttributes);
    const securities = this.store.peekAll('wifi-accesspoint-security').filter(m => m.hasDirtyAttributes);

    const allDirtyModels = [...wifi, ...ssids, ...radios, ...accesspoints, ...securities, ...bandsteering];

    // Step 3: Save each and capture success/failure
    //may have compiler bug
    Promise.all(
      allDirtyModels.map(model => model.save())
    ).finally(() => {
      console.log('All save operations settled. Clearing changes.');

      this.ssidChangesets.forEach(cs => {
        if (cs.isDirty) {
          console.log("SSID Changeset is dirty, rolling back");
          cs.rollback();
        }
      });

      this.securityChangesets.forEach(cs => {
        if (cs.isDirty) {
          console.log("Security Changeset is dirty, rolling back");
          cs.rollback();
        }
      });

      const modelTypes = [
        'wifi',
        'wifi-x-000e50-multiap-steering',
        'wifi-ssid',
        'wifi-radio',
        'wifi-accesspoint',
        'wifi-accesspoint-security'
      ];

      modelTypes.forEach(type => {
        this.store.peekAll(type).forEach(model => {
          if (model.hasDirtyAttributes) {
            model.rollbackAttributes();
          }
        });
      });
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

    // Rollback all dirty wifi-ssid models
    this.store.peekAll('wifi-ssid').forEach(model => {
      if (model.hasDirtyAttributes) {
        model.rollbackAttributes();
      }
    });

    // Rollback all dirty wifi-radio models
    this.store.peekAll('wifi-radio').forEach(model => {
      if (model.hasDirtyAttributes) {
        model.rollbackAttributes();
      }
    });

    // Rollback all dirty wifi-accesspoint models
    this.store.peekAll('wifi-accesspoint').forEach(model => {
      if (model.hasDirtyAttributes) {
        model.rollbackAttributes();
      }
    });

    // Rollback all dirty wifi-accesspoint-security models
    this.store.peekAll('wifi-accesspoint-security').forEach(model => {
      if (model.hasDirtyAttributes) {
        model.rollbackAttributes();
      }
    });

    this.store.peekAll('wifi-x-sc-bandsteering').forEach(model => {
      if (model.hasDirtyAttributes) {
        model.rollbackAttributes();
      }
    });

  }
  /* @service store
  models = ['wifi-ssid', 'wifi-radio', 'wifi-accesspoint', 'wifi-accesspoint-security', 'wifi']

  @tracked ssidChangesets = [];

  get WiFi() {
    return this.store.peekRecord('wifi', 'WiFi.')
  }

  get BandSteering() {
    return this.store.peekRecord('wifi-x-sc-bandsteering', 'WiFi.X_SC_BandSteering.')
  }

  get Radios() {
    return this.store.peekAll('wifi-radio')
  }
  get Wl0WiFi() {
    return this.WiFiArray.find(wifi => wifi.radio?.Alias === 'Wl0');
  }

  get Wl1WiFi() {
    return this.WiFiArray.find(wifi => wifi.radio?.Alias === 'Wl1');
  }
  get ap2() {
    return this.store.peekAll('wifi-accesspoint').findBy('Alias', 'wl1');
  }

  get ap5() {
    return this.store.peekAll('wifi-accesspoint').findBy('Alias', 'wl0');
  }

  get ap2Guest() {
    return this.store.peekAll('wifi-accesspoint').findBy('Alias', 'wl1.2');
  }

  get ap5Guest() {
    return this.store.peekAll('wifi-accesspoint').findBy('Alias', 'wl0.2');
  }

  

  get WiFiArray() {
    let arr = [];

    let ssids = this.store.peekAll('wifi-ssid');
    let accesspoints = this.store.peekAll('wifi-accesspoint');
    let securities = this.store.peekAll('wifi-accesspoint-security');

    let priorityOrder = ['WiFi-2G', 'WiFi-5G', 'WiFi-6G', 'WiFi-2G-Guest', 'WiFi-5G-Guest', 'WiFi-6G-Guest'];

    // First, push 2.4G, 5G, 6G in that order
    for (let alias of priorityOrder) {
      for (let i = 0; i < ssids.length; i++) {
        let current = ssids.objectAt(i);
        if (current.Alias !== alias) continue;

        let ssidChangeset = new Changeset(current, lookupValidator(ssidValidations), ssidValidations);

        arr.push({
          ssid: current,
          ssidChangeset,
          radio: this.store.peekRecord(
            'wifi-radio',
            `WiFi.Radio.${alias === 'WiFi-5G' ? 1 : alias === 'WiFi-2G' ? 2 : 3}.`
          ),
          accesspoint: accesspoints.objectAt(i),
          security: securities.objectAt(i),
        });
      }
    }

    // Then, push all others that are not backhaul or unidentified
    for (let i = 0; i < ssids.length; i++) {
      let current = ssids.objectAt(i);
      let alias = current.Alias;

      if (
        alias.startsWith('Backhaul') ||
        alias === 'unidentified' ||
        priorityOrder.includes(alias)
      )
        continue;

      arr.push({
        ssid: current,
        accesspoint: accesspoints.objectAt(i),
        security: securities.objectAt(i),
      });
    }

    this.ssidChangesets = arr.map(w => w.ssidChangeset);

    return arr;
  }

  get visibleWiFiArray() {
    if (!this.WiFi.X_SC_SSIDSplit) {

      return this.WiFiArray.filter((wifi) => {
        const alias = wifi.ssid.Alias;
        return alias === 'WiFi-2G' || alias === 'WiFi-2G-Guest';
      });
    }

    // SSID split is OFF – show merged (5G and 6G) SSIDs only
    return this.WiFiArray.filter((wifi) => {
      const alias = wifi.ssid.Alias;
      return (
        alias === 'WiFi-2G' || alias === 'WiFi-2G-Guest' ||
        alias === 'WiFi-5G' ||
        alias === 'WiFi-5G-Guest' ||
        alias === 'WiFi-6G' ||
        alias === 'WiFi-6G-Guest'
      );
    });
  }

  get HasChanges() {
    const dirtySSID = this.ssidChangesets.some(changeset => changeset?.isDirty);

    const dirtyModels = this.models
      .some(model =>
        this.store.peekAll(model).any(entry => entry.hasDirtyAttributes)
      );

    return dirtySSID || dirtyModels;

  }

  @action
  Toggle(record, attr) {
    record[attr] = record[attr] == 1 ? 0 : 1
  }

  @action
  Cancel() {
    this.models.forEach(model => {
      this.store.peekAll(model)
        .filter(record => record.hasDirtyAttributes)
        .forEach(record => record.rollbackAttributes())
    })
  }

  @action
  async Apply() {
    let ssids = this.store.peekAll('wifi-ssid');
    let accesspoints = this.store.peekAll('wifi-accesspoint');
    let validationResults = await Promise.all(
      this.ssidChangesets.map(wifi => wifi.validate())
    );

    let allErrors = validationResults.flatMap(r => r).filter(item =>
      typeof item === 'object' && item?.validation?.length
    );

    if (allErrors.length > 0) {
      console.warn('SSID validation failed. Not saving.', allErrors);
      return;
    }

    this.ssidChangesets
      .filter(c => c.isDirty)
      .map(c => {
        c.execute(); // <-- flush changes to model
      });

    // Check if any SSID changeset is invalid

    if (!this.WiFi.X_SC_SSIDSplit) {
      const aliasPairs = {
        'WiFi-2G': 'WiFi-5G',
        'WiFi-2G-Guest': 'WiFi-5G-Guest'
      };

      // Sync SSIDs
      Object.entries(aliasPairs).forEach(([alias2G, alias5G]) => {
        const ssid2G = ssids.find(ssid => ssid.Alias === alias2G);
        const ssid5G = ssids.find(ssid => ssid.Alias === alias5G);

        if (ssid2G && ssid5G) {
          ssid5G.set('SSID', ssid2G.SSID);
        }
      });

      const ap2 = this.store.peekAll('wifi-accesspoint').findBy('Alias', "wl1");
      const ap5 = this.store.peekAll('wifi-accesspoint').findBy('Alias', "wl0");

      if (ap2 && ap5) {
        const sec2 = ap2.get('Security');
        const sec5 = ap5.get('Security');

        if (sec2 && sec5) {
          sec5.set('ModeEnabled', sec2.get('ModeEnabled'));
          sec5.set('KeyPassPhrase', sec2.get('KeyPassPhrase'));

        }
      }


      //  // Build a map from alias to access point
      // const apMap = new Map(accesspoints.map(ap => [ap.get('Alias'), ap]));


      // Object.entries(aliasPairs).forEach(([alias2G, alias5G]) => {
      //   const ap2G = apMap.get(alias2G);
      //   if (!ap2G) {
      //     console.warn(`2G access point not found for alias: ${alias2G}`);
      //     return;
      //   }

      //   const sec2G = ap2G.get('Security');
      //   if (!sec2G) {
      //     console.warn(`Security section missing for 2G alias: ${alias2G}`);
      //     return;
      //   }

      //   const ap5G = apMap.get(alias5G);
      //   if (!ap5G) {
      //     console.warn(`5G access point not found for alias: ${alias5G}`);
      //     return;
      //   }

      //   const sec5G = ap5G.get('Security');
      //   if (!sec5G) {
      //     console.warn(`Security section missing for 5G alias: ${alias5G}`);
      //     return;
      //   }

      //   const mode = sec2G.get('ModeEnabled');
      //   const pass = sec2G.get('KeyPassPhrase');
      //   sec5G.set('ModeEnabled', mode);
      //   sec5G.set('KeyPassPhrase', pass);
      //   //console.log(`Copied ModeEnabled from ${alias2G} to ${alias5G}:`, mode);
      // });


    }
    const operations = this.models
      .flatMap(model =>
        this.store.peekAll(model)
          .filter(record => record.hasDirtyAttributes)
          .map(record => {
            // Properly iterate over each model attribute
            record.eachAttribute((key, meta) => {
              let value = record.get(key);
              if (typeof value === 'string') {
                const sanitized = sanitize(value);
                record.set(key, sanitized);
              }
            });
            return record.save();
          })

      );

    Promise.allSettled(operations).then(() => {
      window.location.reload();
    });
  }

  @action
  toggleValue() {
    this.model.Enable = this.model.Enable === 1 ? 0 : 1
  } */
}
