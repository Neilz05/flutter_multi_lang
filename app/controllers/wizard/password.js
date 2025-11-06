import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PasswordController extends Controller {
    @service wizard
    @service store
    @service session
    @service router
    @service eaactrl;
    @tracked showPassword1 = false;
    @tracked showPassword2 = false;

    @action
    async handleSubmit(event) {
        event.preventDefault()

        await this.wizard.PasswordChangeSet.validate()
        if (this.wizard.PasswordChangeSet.isValid){
            this.wizard.PasswordChangeSet.execute()
            this.wizard.SaveAll()
        }
            
    }

    /* get CurrentUser() {
        return this.store.peekAll('users-user').find((e) => e.Username == this.session.data.authenticated.username)
    } */

    @action
    setOperationMode(state) {
        this.wizard.setState(state)
    }

    @action
    eyeControl1(e) {
        e.preventDefault()
        this.showPassword1 = !this.showPassword1;
    }

    @action
    eyeControl2(e) {
        e.preventDefault()
        this.showPassword2 = !this.showPassword2;
    }
}