import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DashboardInternetStatusComponent extends Component {
    @tracked connType;

    @action
    setConnType(connType) {
        this.connType = connType;
    }

    get isEthernet() {
        return this.connType === 'ethernet' ? true : false;
    }
}