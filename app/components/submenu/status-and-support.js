import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SubmenuStatusAndSupportComponent extends Component {
    @tracked submenuTab = 'status';

    @action
    setSubmenuTab(tab) {
        this.submenuTab = tab;
    }
}