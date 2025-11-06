import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GreetingRoute extends Route {
    @service wizard
    beforeModel() {
        this.wizard.setState('greeting')
    }
}