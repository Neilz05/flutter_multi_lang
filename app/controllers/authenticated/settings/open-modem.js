import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedOpenmodemController extends Controller {
  @service intl;
  @service eaactrl;
  @service currentUser;
  @service router;
  @tracked localOpenModem = null; // initialize safely
  //localOpenModem = this.model.openmodem.parameters.OpenModemEnable;
  

   /* get openModemEnable() {
    return this.model.openmodem.parameters.OpenModemEnable;
  } 

  set openModemEnable(value) {
    this.model.openmodem.backupParameters(this.model.openmodem.parameters);
    this.model.openmodem.set('OpenModemEnable', value);
    this.currentUser.openModemEnable = value;
    console.log(this.currentUser.openModemEnable);
  } */

    /* set openModemEnable(value) {
      this.localOpenModem = value;
      console.log(this.localOpenModem);
    } */
    
  /* @action apply() {
    let path = this.model.openmodem.id;
    //this.model.openmodem.save(path);
    this.model.openmodem.save(path).then(() => {
    this.router.refresh('authenticated');
  } */
 @action apply() {

  this.model.openmodem.backupParameters(this.model.openmodem.parameters);
  this.model.openmodem.set('OpenModemEnable', this.localOpenModem);
  this.currentUser.openModemEnable = this.localOpenModem;
  console.log("Apply",this.localOpenModem);

  let path = this.model.openmodem.id;
  this.model.openmodem.save(path).then(() => {
    this.send('refreshAuthenticated'); // 傳到當前 route，會一路 bubble 到 authenticated
  });
}

  get hasChanges() {
    //return this.model.openmodem.hasDirtyAttributes;
    // return this.localOpenModem.hasDirtyAttributes;
    return this.localOpenModem !== this.model?.openmodem?.parameters?.OpenModemEnable;
  }

  @action cancel() {
    this.model.openmodem.rollbackAttributes();
    this.localOpenModem = this.model.openmodem?.parameters?.OpenModemEnable ?? null;
  }

}