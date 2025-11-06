import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DashboardHostsComponent extends Component {
    @tracked isHidden = true;
    @tracked isRotated = false;

    @action
    showInfo() {
        this.isHidden = !this.isHidden;
        this.isRotated = !this.isRotated;
    }
}