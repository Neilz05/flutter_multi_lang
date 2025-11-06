import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SubmenuNetworkComponent extends Component {
    @tracked submenuTab = "password";

    @action
    setSubmenuTab(tab) {
        this.submenuTab = tab;
    }
}