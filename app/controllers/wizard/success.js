import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SuccessController extends Controller {
    @service session;
    @service wizard;
    @service router;

    @action
    redirectPage() {
        const hasChangedPassword = this.wizard.changedPassword;

        if (hasChangedPassword) {
            this.session.invalidate();
        } else {
            this.router.transitionTo('authenticated.dashboard');
        }
    }
}
