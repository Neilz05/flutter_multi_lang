import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedRoute extends Route {
  @service session;
  @service router;
  @service store;

  @action
  refreshAuthenticated() {
    this.refresh(); // 重新執行 authenticated 的 model 與 setupController（其中會呼叫 updateMenu）
  }
  
  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.currentUser.openModemEnable =
    model.openmodem?.parameters?.OpenModemEnable ?? null;
    console.log("init openModemEnable",controller.currentUser.openModemEnable);
    controller.updateMenu();
  }

  async model() {
    return RSVP.hash({
        voip: this.store.findRecord('ip-interface', 'IP.Interface.voip.').then(
          (voip) => resolve(voip),
          (err) => resolve({})
        ),
        managementserver: this.store.findRecord('managementserver', 'ManagementServer.').then(
          (man) => resolve(man),
          (err) => resolve({})
        ),
        wanmanager: this.store.findRecord('x-prpl-com-wanmanager', 'WANManager.').then(
          (man) => resolve(man),
          (err) => resolve({})
        ),
        xpon: this.store.findRecord('xpon', 'XPON.').then(
        (xpon) => resolve(xpon),
        (err) => {
          resolve({});
        }
      ),
      openmodem: this.store.queryRecord('data', { path: 'Device.X_Management.'}).catch((err) => {
        console.error('Error fetching X_Management:', err);
        return null;
      })
      /* openmodem: this.store.findRecord('data', 'Device.X_Management.').then(
        (openmodem) => resolve(openmodem),
        (err) => resolve({})
      ) */
    })
  }
}
