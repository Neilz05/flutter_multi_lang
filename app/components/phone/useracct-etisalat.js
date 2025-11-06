import UserAccountComponent from './useracct';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UserAccountEtisalatComponent extends UserAccountComponent {
    @service intl;

    @tracked PhoneNumMsg = "";

    @action
    validatePhoneNum(event) {
        let phone = event.target.value;
        const phoneRegex = /^\d{0,32}$/;

        if(phone === "") {
            this.PhoneNumMsg = "";
        } else {
            if (!phoneRegex.test(phone)) {
                this.PhoneNumMsg = this.intl.t('PAGE_PHONE_SETTINGS_USER_ACCOUNT_INVALID_PHONE_NUMBER');
            } else {
                this.PhoneNumMsg = "";
            }
        }

        const hasErrors = this.PhoneNumMsg.trim() != '';
        this.args.onError?.(hasErrors);

        return this.PhoneNumMsg;
    }
}