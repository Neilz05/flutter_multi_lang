import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SessionendRoute extends Route {
  @service session;

  beforeModel(transition) {
    //console.log('routes/sessionend.js')
    //this.session.prohibitAuthentication('index');
  }
}
