import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PhoneSettingsEtisalatComponent extends Component {
    @tracked sipHasErrors = false;
    @tracked useracctHasErrors = false;

    get hasErrors() {
        return this.sipHasErrors || this.useracctHasErrors;
    }

    @action
    updateSipErrors(hasErrors) {
        this.sipHasErrors = hasErrors;
        this.args.onError?.(this.hasErrors);
    }

    @action
    updateUseracctErrors(hasErrors) {
        this.useracctHasErrors = hasErrors;
        this.args.onError?.(this.hasErrors);
    }
}