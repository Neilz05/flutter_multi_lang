import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'prpl-webui/config/environment';

export default class WANController extends Controller {
  @service store;
  @service intl;
  @service session;
  @service eaactrl;
  @service currentUser;

  @tracked macToClone = '';

  @tracked isSuperAdmin = false;

  constructor() {
    super(...arguments);
    this.isSuperAdmin = this.currentUser.isSuperAdmin();
  }

  get getUser() {
    return this.session.data.authenticated.username;
  }

  get hasChanges() {
    let a, b, c, d, e, f, g, h, i;
    const tmp_arr = [];

    this.model.wanmanager.WAN.forEach(wan => {
      wan.Intf.forEach(item => {
        tmp_arr.push(item.hasDirtyAttributes);
      });
    });

    a = tmp_arr.some(Boolean);
    b = this.store
      .peekAll('dhcpv4-client-sentoption')
      .any(entry => entry.isNew || entry.isDeleted || entry.hasDirtyAttributes);
    c = this.store
      .peekAll('nat-interfacesetting')
      .any(entry => entry.isNew || entry.isDeleted || entry.hasDirtyAttributes);
    d = this.store
      .peekAll('ppp-interface')
      .any(entry => entry.isNew || entry.isDeleted || entry.hasDirtyAttributes);
    e = this.store
      .peekAll('ip-interface')
      .any(entry => entry.isNew || entry.isDeleted || entry.hasDirtyAttributes);
    f = this.store
      .peekAll('ethernet-vlantermination')
      .any(entry => entry.isNew || entry.isDeleted || entry.hasDirtyAttributes);
    g = this.model.dns_server.map((entry) => {
      return entry.isNew || entry.isDeleted || entry.hasDirtyAttributes;
    }).some(Boolean);
    // isDeleted can be undefined, just check all
    h = this.model.x_prpl_com_config.model.hasDirtyAttributes?true:false || this.model.x_prpl_com_config.model.isNew?true:false || this.model.x_prpl_com_config.isDeleted?true:false;
    i = this.macToClone !== '' && this.macToClone !== undefined;

    console.log(a, b,c,d,e,f,g,h,i);
    return a||b||c||d||e||f||g||h||i;
  }

  async executeChangesWAN() {
    const promises = [];

    this.model.wanmanager.WAN.forEach(wan => {
      wan.Intf.forEach(intf => {
        if (intf.hasDirtyAttributes) {
          promises.push(intf.save());
        }
      });
      return Promise.resolve();
    });

    return Promise.allSettled(promises);
  }

  async executeChangesNAT() {
    const promises = this.model.nat.InterfaceSetting.map(entry => {
      if (entry.isNew || entry.hasDirtyAttributes) {
        return entry.save();
      }
      if (entry.isDeleted) {
        return entry.destroyRecord().then(() => this.store.unloadRecord(entry));
      }
      return Promise.resolve();
    });

    this.model.nat.InterfaceSetting.reload();
    return Promise.allSettled(promises);
  }

  async executeChangesPPP() {
    const promises = this.model.ppp.map(entry => {
      if (entry.isNew || entry.hasDirtyAttributes) {
        return entry.save().then(() => entry.reload()).catch(() => entry.reload());
      } 
      if (entry.isDeleted) {
        return entry.destroyRecord().then(() => this.store.unloadRecord(entry));
      }
      return Promise.resolve();
    });

    return Promise.allSettled(promises);
  }

  async executeChangesDHCP() {
    const promises = this.model.dhcpv4.Client.map(entry => {
      if (entry.isNew || entry.hasDirtyAttributes) {
        return entry.save();
      } 
      if (entry.isDeleted) {
        return entry.destroyRecord().then(() => this.store.unloadRecord(entry));
      }
      return Promise.resolve();
        });
      this.model.dhcpv4.Client.reload();
      return Promise.allSettled(promises);
  }

  async executeChangesDHCPSentOption() {
      const promises = [];

      this.model.dhcpv4.Client.forEach(entry => {
        entry.SentOption.forEach(e => {
          if (e.isNew || e.hasDirtyAttributes) {
            promises.push(e.save());
          }
          if (e.isDeleted) {
            promises.push(e.destroyRecord().then(() => this.store.unloadRecord(e)));
          }
        });
        return Promise.resolve();
      });

      return Promise.allSettled(promises);
  }

  async executeChangesVlanTermination() {
    const promises = this.model.ethernetvlantermination.map(entry => {
      if (entry.isNew || entry.hasDirtyAttributes) {
        if (entry.hasDirtyAttributes) {
          let changes = entry.changedAttributes()

          if (changes.VLANID) {
            if (Number(entry.VLANID) === 0 || entry.VLANID === '') {
              entry.set('VLANID', changes.VLANID[0]);
            }
          }
        }
        return entry.save().then(() => entry.reload()).catch(() => entry.reload());
      }
      if (entry.isDeleted) {
        return entry.destroyRecord().then(() => this.store.unloadRecord(entry));
      }
      return Promise.resolve();
      });

    return Promise.allSettled(promises);
  }

  async executeChangesIPInterface() {
    const promises = this.model.ipinterface.map(entry => {
      if (entry.isNew || entry.hasDirtyAttributes) {
        return entry.save().then(() => entry.reload()).catch(() => entry.reload());
      } 
      if (entry.isDeleted) {
        return entry.destroyRecord().then(() => this.store.unloadRecord(entry));
      }
      return Promise.resolve();
    });

    return Promise.allSettled(promises);
  }

  async executeChangesDNS() {
    const promises = this.model.dns_server.map(entry => {
      if (entry.isNew || entry.hasDirtyAttributes) {
         return entry.save(entry.id)
      }
      if (entry.isDeleted) {
        return entry.destroyRecord().then(() => this.store.unloadRecord(entry));
      }
      return Promise.resolve();
    });
    return Promise.allSettled(promises);
  }

  async executeChangesDNSAuto() {
    const dnsWanConfig = this.model.x_prpl_com_config;
    const path = dnsWanConfig.model.id;
    const promises = [];

    if (dnsWanConfig.model.hasDirtyAttributes || dnsWanConfig.model.isNew ) {
      promises.push(dnsWanConfig.model.save(path));
    }
    if (dnsWanConfig.isDeleted) {
      promises.push(dnsWanConfig.destroyRecord().then(() => this.store.unloadRecord(dnsWanConfig)));
    }
    return Promise.allSettled(promises);
  }

  async executeChangesMacToClone() {
    if (this.macToClone !== undefined && this.macToClone !== '') {
      let url = '/commands';
      try {
        let options = {
            method: 'post',
            headers: {
                Authorization: 'bearer ' + this.session.data.authenticated.sessionID,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: 'Device.DeviceInfo.X_PRPLWARE-COM_CloneMACAddress()',
                commandKey: ',',
                sendresp: true,
                inputArgs: {
                    MACAddress: this.macToClone,
                }
            })
        };
        if (sessionStorage.getItem('csrf_token')) {
            options.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf_token');
        }
        let response = await fetch(url, options);
        this.macToClone = '';
      } catch (error) {
        console.error('Something went wrong when cloning MAC');
      }
    }
    return Promise.resolve('mac clone finished');
  }

  async checkWanEnableStatus() {
    let eth = this.model.wanmanager.WAN.find((e) => e.Alias === 'Ethernet');
    let gpon = this.model.wanmanager.WAN.find((e) => e.Alias === 'GPON');

    let modified = [];

    this.model.ipinterface.forEach((iface) => {
      if (["wan", "iptv", "voip", "mgmt"].includes(iface.Alias) && iface.Enable === 0) {
        let ethIntf = eth.Intf.find((intf) => intf.Name === iface.Alias);
        let gponIntf = gpon.Intf.find((intf) => intf.Name === iface.Alias);

        if (ethIntf) {
          ethIntf.X_SC_VlanList = "";
          modified.push(ethIntf);
        }
        if (gponIntf) {
          gponIntf.X_SC_VlanList = "";
          modified.push(gponIntf);
        }
      }
    });

    // only save modified records
    await Promise.all(modified.map(intf => intf.save()));

    return 'Vlan list modified';
  }

  @action
  async Apply() {
    try {
      await this.executeChangesWAN();
      await this.executeChangesNAT();
      await this.executeChangesPPP();
      await this.executeChangesDHCP();
      await this.executeChangesDHCPSentOption();
      await this.executeChangesVlanTermination();
      await this.executeChangesIPInterface();
      await this.executeChangesDNS();
      await this.executeChangesDNSAuto();
      await this.executeChangesMacToClone();
      await this.checkWanEnableStatus();
      this.Cancel(); // Clear dirty after apply
    } catch (error) {
      console.error('Error in apply', error);
    }
  }

  @action
  Cancel(){
    this.model.wanmanager.WAN.forEach(e => {
        e.Intf.forEach((intf) => {
            intf.rollbackAttributes()
        })
        e.rollbackAttributes()
    });
    this.model.ethernetvlantermination.forEach(e => {
        e.rollbackAttributes()
    });
    this.model.dhcpv4.Client.forEach(e => {
        e.rollbackAttributes()
    });
    this.model.dhcpv4.Client.forEach(entry => {
        entry.SentOption.forEach((e) => {
          e.rollbackAttributes()
        })
    });
    this.model.ppp.forEach(e => {
        e.rollbackAttributes()
    });
    this.model.nat.InterfaceSetting.forEach(e => {
        e.rollbackAttributes()
    });
    this.model.ipinterface.forEach(e => {
        e.rollbackAttributes()
    });
    this.model.deviceinfo.rollbackAttributes();
  }

}