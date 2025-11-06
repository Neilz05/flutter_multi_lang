import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class SIPController extends Controller {
    @service wizard
    @service store
    @service router
    @service eaactrl;


    /* @tracked enablesip1 = true
    @tracked enablesip2 = false */

    @action
    Toggle(record, attr) {
        record[attr] = record[attr] == 1 ? 0 : 1
    }

    @action
    async handleSubmit(event) {
        event.preventDefault()

        await Promise.all([
            this.wizard.PrimarySIPChangeSet.validate(),
            this.wizard.ClientSIPChangeSet1.validate(),
            this.wizard.ClientSIPChangeSet2.validate()
        ]);

        /* console.log('After validation, isValid?', this.wizard.PrimarySIPChangeSet.isValid);
        console.log('Errors:', this.wizard.PrimarySIPChangeSet.error);

        console.log('After validation, isValid?', this.wizard.ClientSIPChangeSet1.isValid);
        console.log('Errors:', this.wizard.ClientSIPChangeSet1.error);

        console.log('After validation, isValid?', this.wizard.ClientSIPChangeSet2.isValid);
        console.log('Errors:', this.wizard.ClientSIPChangeSet2.error); */

        const primaryValid = this.wizard.PrimarySIPChangeSet.isValid;
        const client1Valid = this.wizard.ClientSIPChangeSet1.isValid || !this.wizard.ClientSIPChangeSet1.Enable;
        const client2Valid = this.wizard.ClientSIPChangeSet2.isValid || !this.wizard.ClientSIPChangeSet2.Enable;


        if (primaryValid && client1Valid && client2Valid) {
            this.wizard.PrimarySIPChangeSet.execute();
            this.wizard.ClientSIPChangeSet1.execute();
            this.wizard.ClientSIPChangeSet2.execute();
            /* if (this.wizard.ClientSIPChangeSet1.Enable) {
                this.wizard.ClientSIPChangeSet1.execute();
            }

            if (this.wizard.ClientSIPChangeSet2.Enable) {
                this.wizard.ClientSIPChangeSet2.execute();
            } */

            this.router.transitionTo('wizard.password')
            // proceed with submission logic
        }

    }

    @action
    setOperationMode(state) {
        this.wizard.setState(state)
    }
}
