import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedDashboardController extends Controller {
    @service store;
    @service eaactrl;
    @tracked firewallLevel;
    @tracked isFirewallDisabled = false;
    @tracked isFirewallLevelChanged = false;

    /*get firewallLevels() {
        let levels_str = "Low,High,Advanced,Policy";
        let levels = [];
        levels_str.split(',').forEach((level) => {
            levels.push({ key: level, label: level});
        })
        return levels;
    }*/

    get firewallEnabled() {
        return this.getFirewall.get('Enable') == 1 ? true : false;
    }

    set firewallEnabled(enable) {
        this.getFirewall.set('Enable', enable == true ? 1 : 0 );

        if (enable) {
            this.isFirewallDisabled = false;
        } else {
            this.isFirewallDisabled = true;
            this.isFirewallLevelChanged = false;
            this.firewallLevel = "";
        }
    }

    get getFirewall(){
        return this.store.peekRecord('firewall', 'Firewall.');
    }

    get pingEnabled() {
        let ping = this.getAllowPing('wan');
        if (ping === 'allow_both') {
            return true
        } else {
            return false;
        }
    }

    set pingEnabled(enable) {
        this.model.firewall_settings.map((settings) => {
            if (settings.get('Alias') === 'wan') {
                settings.backupParameters(settings.parameters);
                settings.set('AcceptICMPEchoRequest', enable == true ? 'allow_both' : 'disable');
            }
        });
    }

    getAllowPing(alias){
        let value = '';

        this.model.firewall_settings.map((settings) => {
            if (settings.get('Alias') === alias) {
                value = settings.get('AcceptICMPEchoRequest');
            }
        });

        return value;
    }

    @action
    setFirewallLevel(level) {
        this.getFirewall.set('Enable', level);
    }

    @action
    setFirewallConfig(config) {
        this.getFirewall.set('Config', config);
    }

    @action
    updateSelection(event){
        this.store.peekRecord('firewall', 'Firewall.').PolicyLevel = event.target.value;
        this.isFirewallLevelChanged = true;
        this.firewallLevel = event.target.value;
    }

    @action
    updateFirewall() {
        const firewall = this.store.peekRecord('firewall', 'Firewall.');
        if (firewall.hasDirtyAttributes) {
            firewall.save().then(() => {
                
            });
        }

        this.model.firewall_settings.forEach((settings) => {
            if (settings.get('Alias') === 'wan') {
                if (settings.hasDirtyAttributes) {
                   settings.save(settings.id);
                }
            }
        });

        this.resetTrackedValues();
    }

    get hasChanges() {
        let isDirty = false;
        
        const firewall = this.store.peekRecord('firewall', 'Firewall.');
        if (firewall.hasDirtyAttributes) {
            isDirty = true;
        }

        this.model.firewall_settings.forEach(e => {
            if (e.get('Alias') === 'wan') {
                if (e.hasDirtyAttributes) {
                   isDirty = true;
                }
            }
        });

        return isDirty;
    }

    @action
    cancelFirewall() {
        const firewall = this.store.peekRecord('firewall', 'Firewall.');
        if (firewall.hasDirtyAttributes) firewall.rollbackAttributes();

        this.model.firewall_settings.forEach(e => {
            if (e.get('Alias') === 'wan') {
                if (e.hasDirtyAttributes) {
                    e.rollbackAttributes();
                }
            }
        });

        this.resetTrackedValues();
    }

    @action
    resetTrackedValues() {
        this.isFirewallDisabled = false;
        this.isFirewallLevelChanged = false;
        this.firewallLevel = "";
    }
}
