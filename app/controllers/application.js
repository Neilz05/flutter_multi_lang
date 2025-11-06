import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
    @service eaactrl;

    @tracked globalEAAPolite = "";
    @tracked globalEAAAssertive = "";

    constructor() {
        super(...arguments);
        this.eaactrl.setEaaWarningController(this);
    }

    @action
    setEaaWarningPolite(message) {
        this.globalEAAPolite = message;
    }

    @action
    setEaaWarningAssertive(message) {
        this.globalEAAAssertive = message;
    }

}
