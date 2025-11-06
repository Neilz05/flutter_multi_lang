import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { action } from '@ember/object';

export default class UserAccountComponent extends Component {
    @service eaactrl;

    componentId = this.eaactrl.getRandomString(16);

    get componentId() {
        return this.componentId;
    }

    get enabled() {
        return this.args.telClient.get('Enable') == 1 ? true : false;
    }

    set enabled(value) {
        set(this.args.telClient, 'Enable', value ? 1 : 0);
    }
}