import Component from '@glimmer/component';
import config from 'prpl-webui/config/environment';

export default class PhoneSettingsEtisalatComponent extends Component {

    get modelType() {
        return config.APP.modelType;
    }

}