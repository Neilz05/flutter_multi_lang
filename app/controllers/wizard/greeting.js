import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GreetingController extends Controller {
    @service wizard
    @action
    setOperationMode(state){
        this.wizard.setState(state)
    }
}
