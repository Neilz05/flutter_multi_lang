import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class UiToggleButtonComponent extends Component {
    @service eaactrl;

    componentId = this.eaactrl.getRandomString(16);

    get componentId() {
        return this.componentId;
    }

}