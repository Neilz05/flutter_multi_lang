import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

import { action } from '@ember/object';

export default class AuthenticatedInternetOpenmodemRoute extends Route {
@service session;
  @service router;

  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    controller.localOpenModem = model.openmodem?.parameters?.OpenModemEnable ?? null;
   // controller.updateMenu();
  }

  /* @action
  refreshAuthenticated() {
    this.refresh(); // 重新執行 authenticated 的 model 與 setupController
  } */
  
  async model() {
    return RSVP.hash({
      openmodem: this.store.queryRecord('data', { path: 'Device.X_Management.'}).catch((err) => {
        console.error('Error fetching X_Management:', err);
        return {};
      }),
    });
  }
}
