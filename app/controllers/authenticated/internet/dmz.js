import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { log } from 'qunit';

export default class AuthenticatedDMZController extends Controller {
    @service store;
    @service intl;
    @service session;
    @service eaactrl;

    @tracked dmzLocalIp = this.model.dmz.DestIP;
    @tracked noMatchingIp = false;
    @tracked noSpecifDevice = false;
    ipAddrId = "";

    @action 
    checkMatchingIp() {
        // Check if the current dmzLocalIp matches any host's IPAddress
        this.noMatchingIp = !this.model.hosts.Host.find((host) => host.IPAddress === this.dmzLocalIp);
        if (this.noMatchingIp) {
            this.noSpecifDevice = true;
        } else {
            this.noSpecifDevice = false;
        }   
    }

    @action
    updateDmzDevice(event) {
        if (event.target.value === '') {
            this.noSpecifDevice = true;
            //this.dmzLocalIp = "";
        } else {
            this.noSpecifDevice = false;
            // value cannot be edited so we just set the model's DestIP
            this.dmzLocalIp = event.target.value;
            this.model.dmz.DestIP = event.target.value;
        }
    }

    @action
    updateDmzLocalIp(id, ind, event) {
        let newValue = event.target.value;
        this.ipAddrId = id;

        let parts = this.dmzLocalIp?.split('.') || ["", "", "", ""];
        parts[(ind - 1)] = newValue;

        let invalidIp = parts.some(p => {
            let num = parseInt(p);
            return isNaN(num) || num < 0 || num > 255;
        });

        let ipAddr = parts.join('.');

        if (invalidIp) {
            let input = document.getElementById(`${id}-${ind}`);
            if (input) {
                input.classList.add('is-invalid');
                input.style.backgroundImage = 'none';
            }
            document.getElementById(`${id}ErrMsg`).innerText = this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_IP_ADDRESS_INVALID");
            document.getElementById(`${id}ErrMsg`).setAttribute('tabindex', '0');
            document.getElementById(`${id}ErrMsg`).setAttribute('aria-label', this.intl.t("PAGE_SETTINGS_LAN_POPUP_ERROR_IP_ADDRESS_INVALID"));
        } else {
            // if there was previous error, remove it
            for (let i = 0; i < 4; i++) {
                let input = document.getElementById(`${id}-${i + 1}`);
                if (input) input.classList.remove('is-invalid');
            }
            document.getElementById(`${id}ErrMsg`).innerText = "";
            document.getElementById(`${id}ErrMsg`).setAttribute('tabindex', '-1');
            document.getElementById(`${id}ErrMsg`).setAttribute('aria-label', "");
        }

        this.dmzLocalIp = ipAddr;
        this.model.dmz.DestIP = this.dmzLocalIp;
    }

    @action
    toggleValue(dmz){
        dmz.Enable = dmz.Enable === 1 ? 0 : 1
    }

    @action
    UpdateDMZ(dmz){
        let errMsg = document.getElementsByClassName('errMsg');
        for (let i = 0; i < errMsg.length; i++) {
            if (errMsg[i].innerHTML != '') {
                // if there is an error message, do not apply the changes
                return;
            }
        }
        
        dmz.save().then(() => {
            
        }).catch(() => {
            
        })
        /* window.location.reload() */
    }

    @action
    cancelDmz() {
        let errMsg = document.getElementsByClassName('errMsg');
        for (let i = 0; i < errMsg.length; i++) {
            if (errMsg[i].innerHTML != '') {
                // if there is an error message, clear the error message
                errMsg[i].innerHTML = '';
            }
        }

        for (let i = 0; i < 4; i++) {
            let input = document.getElementById(`${this.ipAddrId}-${i + 1}`);
            if (input) input.classList.remove('is-invalid');
        }

        if (this.model.dmz.hasDirtyAttributes) {
            this.model.dmz.rollbackAttributes();
            this.dmzLocalIp = this.model.dmz.DestIP;
            this.checkMatchingIp();
        }
    }
}
