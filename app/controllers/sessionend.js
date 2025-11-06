import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
//import { storageFor } from 'ember-local-storage';

export default class SessionendController extends Controller {
    @tracked errorMessage
    @service session
    @service router

    @action
    gotologin(e) {
        e.preventDefault();
        //console.log("controllers/sessionend.js: gotologin() authentcate(): call session.authenticate('tr181')");
        this.session.invalidate();

    }
}
