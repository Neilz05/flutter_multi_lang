import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SubmenuPhoneComponent extends Component {
    @tracked submenuTab;

    @action
    setSubmenuTab(tab) {
        this.submenuTab = tab;
    }
}