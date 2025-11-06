import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SubmenuSecurityComponent extends Component {
    @tracked submenuTab = "firewall";

    @action
    setSubmenuTab(tab) {
        this.submenuTab = tab;
    }
}