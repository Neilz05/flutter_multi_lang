import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class pppoeRoute extends Route {
    @service store
    @service wizard
}