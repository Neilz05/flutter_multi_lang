import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { get, set } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthenticatedNetworkInternetTimeController extends Controller {
    @service eaactrl;
    
    get syncTimeServer() {
        return this.model.Client.findBy('Alias', 'cpe-client-1').get('Enable') == 1 ? true : false;
        // return this.model.Client.findBy('Alias', 'cpe-client-1').get('Enable');
    }
    set syncTimeServer(value) {
        set(this.model.Client.findBy('Alias', 'cpe-client-1'), 'Enable', value ? 1 : 0);
        // set(this.model.Client.findBy('Alias', 'cpe-client-1'), 'Enable', value);
    }

    @tracked inputModified = false;

    get hasChanges() {
        let isDirty = false;

        if (this.model.Client.findBy('Alias', 'cpe-client-1').hasDirtyAttributes) {
            isDirty = true;
        }
        if (this.inputModified) {
            isDirty = true;
        }

        return isDirty;
    }

    @action cancelInternetTime() {
        /*this.inputModified = false;
        this.model.Client.forEach((client) => {
            if (client.Alias == "cpe-client-1") {
                client.rollbackAttributes();
            }
        });*/
        window.location.reload();
    }

    @action
    handleInput(event) {
        //set(this.model, 'Servers', event.target.value);
        this.inputModified = true;
    }

    getServers() {
        let inputs = document.querySelectorAll('input[type="text"]');
        let values = Array.from(inputs).map(input => input.value);
        return values;
    }
    
    @action
    updateInternetTime() {
        if (this.model.Client.findBy('Alias', 'cpe-client-1').hasDirtyAttributes) {
            this.model.Client.findBy('Alias', 'cpe-client-1').save().then(() => {
                window.location.reload();
            });
        }

        if (this.inputModified) {
            let serverList = "";
            let servers = this.getServers();

            servers.forEach((server) => {
                if (server.length != 0) serverList += server + ",";
            });
            serverList = serverList.slice(0, -1);
            serverList = serverList.replace(/\s/g, '');

            this.model.Client.forEach((client) => {
                if (client.Alias == "cpe-client-1") {
                    set(client, 'Servers', serverList);
                    client.save().then(() => {
                        window.location.reload();
                    });
                }
            });
            this.inputModified = false;
        }
    }
}
