import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Changeset, { changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { sha512 } from 'sha512-crypt-ts';

import pppValidation from '../validations/wizard-pppoe';
import VLANValidation from '../validations/wizard-vlan';
import PasswordValidation from '../validations/wizard-password';
import PrimarySIPValidation from '../validations/wizard-primarysip';
import ClientSIPValidation from '../validations/wizard-clientsip';


export default class WizardService extends Service {
    @service store
    @service session
    @service router

    @tracked state
    @tracked changedPassword = false;
    @tracked mode

    abort() {

        const captitveportal = this.store.peekRecord('captiveportal', 'CaptivePortal.')
        if (captitveportal) {
            captitveportal.Enable = 0
            captitveportal.save()
        }
    }

    async initWizard() {
        this.state = localStorage.getItem('wizard-state') || 'wanMode';
        const [captiveportal, user, ppp, vlanterminations, sipnetwork, sipclient1, sipclient2, ip] = await Promise.all([
            this.store.findRecord('captiveportal', 'CaptivePortal.'),
            this.store.queryRecord('users-user', { path: `Users.User.[Username=="admin"].` }),
            this.store.findRecord('ppp-interface', 'PPP.Interface.1.'),
            this.store.findAll('ethernet-vlantermination'),
            this.store.findRecord('services-voiceservice-sip-network', 'Services.VoiceService.1.SIP.Network.1.'),
            this.store.findRecord('services-voiceservice-sip-client', 'Services.VoiceService.1.SIP.Client.1.'),
            this.store.findRecord('services-voiceservice-sip-client', 'Services.VoiceService.1.SIP.Client.2.'),
            this.store.findAll('ip-interface'),
            this.store.findAll('ethernet-link'),
            this.store.findRecord('x-prpl-com-wanmanager', 'WANManager.'),
            this.store.findRecord('managementserver', 'ManagementServer.')
        ]);



        /* vlanterminations.forEach((vlan) => {
            if (vlan.Alias === 'wan' || vlan.Alias === 'iptv' || vlan.Alias === 'voip' || vlan.Alias === 'mgmt') {
                vlan.VLANID = "" // Reset VLANID to empty string
            }
        }); */

        const VLANIDvalidator = VLANValidation(this.store);

        const buildChangeset = (alias) => {
            const record = vlanterminations.find(r => r.Alias == alias);
            if (!record) {
                console.warn(`No record found for alias: ${alias}`);
            }

            return new Changeset(record, lookupValidator(VLANIDvalidator), VLANIDvalidator, { skipValidate: true });
        };

        this.InternetVLANChangeSet = buildChangeset('wan');
        this.IPTVVLANChangeSet = buildChangeset('iptv');
        this.VOIPVLANChangeSet = buildChangeset('voip');
        this.MGMTVLANChangeSet = buildChangeset('mgmt');

        /* this.store.findAll('ethernet-vlantermination').then((vlans) => {
            const existingVlanIds = vlans.map(vlan => vlan.VLANID);
            const buildChangeset = (alias) => {
                const record = vlans.find(r => r.Alias == alias);
                const otherVlanIds = existingVlanIds.filter(id => id !== record?.VLANID);
                const validation = VLANValidation(otherVlanIds);

                //console.log(record)

                if (!record) {
                    //console.log(`No record found for alias: ${alias}`);

                }

                return new Changeset(record, lookupValidator(validation), validation);
            };

            this.InternetVLANChangeSet = buildChangeset('wan');
            this.IPTVVLANChangeSet = buildChangeset('iptv');
            this.VOIPVLANChangeSet = buildChangeset('voip');
            this.MGMTVLANChangeSet = buildChangeset('mgmt');
        }); */

        this.pppChangeSet = new Changeset(
            ppp, lookupValidator(pppValidation), pppValidation
        )

        this.PasswordChangeSet = new Changeset(
            user, lookupValidator(PasswordValidation), PasswordValidation, { skipValidate: true }
        )
        this.PasswordChangeSet.set('ConfirmPassword', '');

        this.PrimarySIPChangeSet = new Changeset(
            sipnetwork, lookupValidator(PrimarySIPValidation), PrimarySIPValidation
        )

        this.ClientSIPChangeSet1 = new Changeset(
            sipclient1, lookupValidator(ClientSIPValidation), ClientSIPValidation
        )

        this.ClientSIPChangeSet2 = new Changeset(
            sipclient2, lookupValidator(ClientSIPValidation), ClientSIPValidation
        )

        this.mode = this.store.peekRecord('x-prpl-com-wanmanager', 'WANManager.').WANMode;
    }

    async SaveAll() {

        const captitveportal = this.store.peekRecord('captiveportal', 'CaptivePortal.')

        if (captitveportal) {
            captitveportal.Enable = 0
            captitveportal.save()
        }

        // execute vlantermination changesets if they have not yet been saved
        this.InternetVLANChangeSet.execute();
        this.IPTVVLANChangeSet.execute();
        this.VOIPVLANChangeSet.execute();
        this.MGMTVLANChangeSet.execute();

        const ethernet_link = this.store.peekAll('ethernet-link').find(e => e.Alias === 'ethernet_wan');
        const ethernet_xpon = this.store.peekAll('ethernet-link').find(e => e.Alias === 'eth_xpon');
        const wanmanager = this.store.peekRecord('x-prpl-com-wanmanager', 'WANManager.');


        /* this.store.peekAll('ethernet-vlantermination').forEach((e) => {
            const vlanid_number = Number(e.VLANID);

            if (e.Alias === 'wan') {
                let wan = this.store.peekAll('ppp-interface').find((ppp) => ppp.Alias === 'wan');

                if (e.Enable === 1){
                    wan.LowerLayers = `Device.${e.id}`
                }
                else {
                    wan.LowerLayers = `Device.${ethernet_link.id}`
                }
            }


            if (e.Alias === 'iptv' || e.Alias === 'voip' || e.Alias === 'mgmt') {
                let iface = this.store.peekAll('ip-interface').find((ip) => ip.Alias === e.Alias);

                if (e.Enable === 1){
                    iface.LowerLayers = `Device.${e.id}`
                }
                else {
                    iface.LowerLayers = `Device.${ethernet_link.id}`
                }
                /* if (e.VLANID === '' || vlanid_number === 0) {
                    e.Enable = 0
                    
                }
                else {
                    e.Enable = 1
                    iface.LowerLayers = `Device.${e.id}`
                } */
            /*}
        })

        if (this.state === 'stand-alone' || this.state === 'pnp-router') {
            this.store.peekAll('ip-interface').forEach((e) => {
                if (e.Alias === 'voip' || e.Alias === 'iptv') {
                    e.Enable = 0; // Disable
                }
            })
        }

        if (this.state === 'stand-alone') {
            this.store.peekAll('ip-interface').forEach((e) => {
                if (e.Alias === 'mgmt') {
                    e.Enable = 0; // Disable
                }
            })
        } */

        if (this.state === 'stand-alone') {

            this.store.peekAll('ip-interface').forEach((e) => {
                if (e.Alias === 'wan') {
                    e.Enable = 1; // Enable
                }

                if (e.Alias === 'iptv' || e.Alias === 'voip' || e.Alias === 'mgmt') {
                    e.Enable = 0; // Disable
                }
            });

            this.store.peekAll('ethernet-vlantermination').forEach((e) => {
                const vlanid_number = Number(e.VLANID);

                if (e.Alias === 'iptv' || e.Alias === 'voip' || e.Alias === 'mgmt') {
                    e.Enable = 0;
                }

                if (e.Alias === 'wan') {
                    let wan = this.store.peekAll('ppp-interface').find((ppp) => ppp.Alias === 'wan');
                    wan.LowerLayers = e.LowerLayers;

                    e.Enable = 0;
                }
            });

            wanmanager.WAN.forEach((entry) => {
                if (entry.Alias === 'Ethernet' || entry.Alias === 'GPON') {
                    entry.Intf.forEach((item) => {
                        if (item.Name === 'wan') {
                            item.IPv4Mode = "ppp4";
                            item.IPv6Mode = "ppp6";
                            item.X_SC_VlanList = " ";
                        } else if (item.Name === 'iptv' || item.Name === 'voip' || item.Name === 'mgmt') {
                            item.IPv4Mode = "none";
                            item.IPv6Mode = "none";
                            if (item.Name === 'mgmt') {
                                item.X_SC_VlanList = " ";
                            }
                        }
                    })
                }
            });

            this.store.peekRecord('managementserver', 'ManagementServer.').URL = 'http://86.96.241.17:7547/ACS-server/ACS' ;
        }

        if (this.state === 'pnp-router') {

            this.store.peekAll('ip-interface').forEach((e) => {
                if (e.Alias === 'wan' || e.Alias === 'mgmt') {
                    e.Enable = 1; // Enable
                }

                if (e.Alias === 'iptv' || e.Alias === 'voip') {
                    e.Enable = 0; // Disable
                }
            });

            this.store.peekAll('ethernet-vlantermination').forEach((e) => {
                const vlanid_number = Number(e.VLANID);

                if (e.Alias === 'iptv' || e.Alias === 'voip') {
                    e.Enable = 0;
                }

                if (vlanid_number !== '' && vlanid_number !== 0) {
                    if (e.Alias === 'wan') {
                        let wan = this.store.peekAll('ppp-interface').find((ppp) => ppp.Alias === 'wan');
                        wan.LowerLayers = `Device.${e.id}`;

                        e.Enable = 1;
                        e.VLANID = vlanid_number;
                        this.setWANType(vlanid_number, e.Alias);
                    }

                } else if (vlanid_number === '' || vlanid_number === 0) {

                    if (e.Alias === 'wan') {
                        let wan = this.store.peekAll('ppp-interface').find((ppp) => ppp.Alias === 'wan');
                        wan.LowerLayers = e.LowerLayers;

                        e.Enable = 0;
                        this.setWANType(vlanid_number, e.Alias);
                    }
                }
            });

            wanmanager.WAN.forEach((entry) => {
                if (entry.Alias === 'Ethernet' || entry.Alias === 'GPON') {
                    entry.Intf.forEach((item) => {
                        if (item.Name === 'wan') {
                            item.IPv4Mode = "ppp4";
                            item.IPv6Mode = "ppp6";
                            item.X_SC_VlanList = " ";
                        } else if(item.Name === 'mgmt') {
                            item.IPv4Mode = "dhcp4";
                            item.IPv6Mode = "none";
                        } else if (item.Name === 'iptv' || item.Name === 'voip') {
                            item.IPv4Mode = "none";
                            item.IPv6Mode = "none";
                        }
                    })
                }
            });
        }

        if (this.state === 'triple-play') {

            this.store.peekAll('ip-interface').forEach((e) => {
                if (e.Alias === 'wan' || e.Alias === 'iptv' || e.Alias === 'voip' || e.Alias === 'mgmt') {
                    e.Enable = 1; // Enable
                }
            });

            this.store.peekAll('ethernet-vlantermination').forEach((e) => {
                const vlanid_number = Number(e.VLANID);

                if (vlanid_number !== '' && vlanid_number !== 0) {
                    if (e.Alias === 'wan') {
                        let wan = this.store.peekAll('ppp-interface').find((ppp) => ppp.Alias === 'wan');
                        wan.LowerLayers = `Device.${e.id}`;

                        e.Enable = 1;
                        e.VLANID = vlanid_number;
                        this.setWANType(vlanid_number, e.Alias);
                    }

                    if (e.Alias === 'iptv' || e.Alias === 'voip' || e.Alias === 'mgmt') {
                        let iface = this.store.peekAll('ip-interface').find((ip) => ip.Alias === e.Alias);
                        iface.LowerLayers = `Device.${e.id}`

                        e.Enable = 1;
                        e.VLANID = vlanid_number;
                        this.setWANType(vlanid_number, e.Alias);
                    }
                } else if (vlanid_number === '' || vlanid_number === 0) {

                    if (e.Alias === 'wan') {
                        let wan = this.store.peekAll('ppp-interface').find((ppp) => ppp.Alias === 'wan');
                        wan.LowerLayers = e.LowerLayers;

                        e.Enable = 0;
                        this.setWANType(vlanid_number, e.Alias);
                    }

                    if (e.Alias === 'iptv' || e.Alias === 'voip' || e.Alias === 'mgmt') {
                        let iface = this.store.peekAll('ip-interface').find((ip) => ip.Alias === e.Alias);
                        iface.LowerLayers = e.LowerLayers;

                        e.Enable = 0;
                        this.setWANType(vlanid_number, e.Alias);
                    }
                }
            });

            wanmanager.WAN.forEach((entry) => {
                if (entry.Alias === 'Ethernet' || entry.Alias === 'GPON') {
                    entry.Intf.forEach((item) => {
                        if (item.Name === 'wan') {
                            item.IPv4Mode = "ppp4";
                            item.IPv6Mode = "ppp6";
                            item.X_SC_VlanList = " ";
                        } else if(item.Name === 'iptv' || item.Name === 'voip' || item.Name === 'mgmt') {
                            item.IPv4Mode = "dhcp4";
                            item.IPv6Mode = "none";
                            item.X_SC_VlanList = " ";
                        }
                    })
                }
            });
        }

        const ppp = this.store.peekRecord('ppp-interface', 'PPP.Interface.1.');
        if (ppp.hasDirtyAttributes) ppp.save()

        const user = this.store.peekAll('users-user').find((e) => e.Username == 'admin')
        if (user.hasDirtyAttributes) {
            let currentHashed = user.get('X_PRPL-COM_HashedPassword');
            let newCandidate = user.Password;

            this.changedPassword = this.ComparePassword(currentHashed, newCandidate);
            user.save();
        }

        const sipnetwork = this.store.peekRecord('services-voiceservice-sip-network', 'Services.VoiceService.1.SIP.Network.1.')
        if (sipnetwork.hasDirtyAttributes) sipnetwork.save()

        this.store.peekAll('ethernet-vlantermination').forEach((e) => {

            if (e.hasDirtyAttributes) {
                let changes = e.changedAttributes()
                console.log(e)

                if (changes.VLANID) {
                    if (Number(e.VLANID) === 0 || e.VLANID === '') {
                        e.set('VLANID', changes.VLANID[0]);
                    }
                }
                e.save()
            }
        })

        this.store.peekAll('services-voiceservice-sip-client').forEach((e) => {
            if (e.hasDirtyAttributes) e.save()
        })

        this.store.peekAll('ip-interface').forEach((e) => {
            if (e.hasDirtyAttributes) e.save()
        })

        this.store.peekRecord('x-prpl-com-wanmanager', 'WANManager.').WAN.forEach((entry) => {
            if (entry.Alias === 'Ethernet' || entry.Alias === 'GPON') {
                entry.Intf.forEach((item) => {
                    if (item.hasDirtyAttributes) {
                        item.save();
                    }
                })
            }
        });

        if (this.state === 'stand-alone') {
            const managementServer = this.store.peekRecord('managementserver', 'ManagementServer.');

            if (managementServer) {
                managementServer.save();
            }
        }

        this.router.transitionTo('wizard.success');
    }

    setState(state) {
        this.state = state
        localStorage.setItem('wizard-state', state);
    }

    getState() {
        return this.state
    }

    ComparePassword(currentHashed, newCandidate) {
        const salt = currentHashed.split('$').slice(0,3).join('$');
        const result = sha512.crypt(newCandidate, salt);

        if (result !== currentHashed) {
            return true;
        }

        return false;
    }

    getWANMode() {
        return this.mode
    }

    setWANType(vlanID, alias) {
        const wanmanager = this.store.peekRecord('x-prpl-com-wanmanager', 'WANManager.');

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
}