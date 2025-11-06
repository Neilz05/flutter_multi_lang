import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WanModeController extends Controller {
    @service store;
    @service wizard;
    @service eaactrl;
    @service api;
    @service router;
    @service intl;

    @tracked mode = "";
    @tracked errorMessage = "";

    get WANOptions() {
        let wanModes = [];
        this.store.peekRecord('x-prpl-com-wanmanager', 'WANManager.').WAN.forEach((wan) => {
            wanModes.push(wan.Alias);
        });

        return wanModes;
    }

    @action
    isSelected(option) {
        const wanmanager = this.store.peekRecord('x-prpl-com-wanmanager', 'WANManager.');
        const wanMode = wanmanager.WANMode;
        let wanModeExists = false;
        let defaultOption = "";
        let selected = false;

        wanmanager.WAN.forEach((wan, index) => {
            if (wanMode === wan.Alias) {
                wanModeExists = true;
            }

            if (index === 0) {
                defaultOption = wan.Alias;
            }
        });

        let selectedAlias = wanModeExists ? wanMode : defaultOption;

        if (option === selectedAlias) {
            selected = true;
            this.mode = selectedAlias;
        }

        return selected;
    }

    @action
    updateWANMode(event){
        this.mode = event.target.value;
    }

    @action
    async handleSubmit(event) {
        event.preventDefault();
        this.errorMessage = "";

        let url = '/commands';
        try {
            let response = await this.api.customFetch(url, {
                method: 'post',
                body: JSON.stringify({
                    command: 'WANManager.setWANMode()',
                    commandKey: "",
                    sendresp: true,
                    inputArgs: {
                        WANMode: this.mode,
                        Autosensing: 2,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Setting WAN Mode HTTP error! status: ${response.status}`);
            }

            let result = await response.json();

            // Ignore the return value of the status for now as the Backend has not yet completed it.
            // May possibly use result[0].outputArgs?.status to get the return value of the function.
            if (result) {
                this.router.transitionTo('wizard.greeting');
            } else {
                console.error("setting wan mode was unsuccessful");
                this.errorMessage = this.intl.t('WIZARD_WANMODE_SELECTION_ERROR');
            }
        } catch (error) {
            console.error('Something went wrong when setting the WAN Mode ' + error);
            this.errorMessage = this.intl.t('WIZARD_WANMODE_SELECTION_ERROR');
        }
    }
}
