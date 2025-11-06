import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
//import { storageFor } from 'ember-local-storage';

export default class WizardController extends Controller {
    @service router
    @service wizard

    constructor(){
        super(...arguments)
    }

    @action
    abortWizard(){
        // code here to set the Service.Wizard Enable to false
        this.wizard.abort()
        this.router.transitionTo('authenticated.dashboard')
    }

    
}
