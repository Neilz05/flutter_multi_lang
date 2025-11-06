import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SubsubmenuStatusSubsubmenuComponent extends Component {
    @tracked subsubmenuTab;

    @action
    setSubsubmenuTab(tab) {
        this.subsubmenuTab = tab;
    }
}