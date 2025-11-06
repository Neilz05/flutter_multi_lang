import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import config from 'prpl-webui/config/environment';

export default class CurrentUserService extends Service {
    @service store;
    @service session;

    @tracked userLevel = 1; //0: superadmin-user/root-user, 1: admin-user
    @tracked WUIMode = ""; //Basic or Expert
    @tracked openModemEnable = true;
    
    constructor() {
        super(...arguments);
        this.modelType = config.APP.modelType || 'Neutral';
    }

    async queryUserLevel(user){
      if ((this.modelType ==  'Neutral') || (this.modelType ==  'FG4278Av2') || (this.modelType == 'FG4278Av2_VD')){
        this.userLevel = user['Alias'] == "superadmin-user" ? 0 : 1;
      }else{
        this.userLevel = user['Alias'] == "root-user" ? 0 : 1;
      }
    }
	
    get uiMode(){ 
        if ((this.modelType ==  'FG4278Av2') || (this.modelType == 'FG4278Av2_VD') || this.modelType === 'Neutral'){
            return this.WUIMode; 
        }else{
            return "Expert";
        }
    }
    set uiMode(value) { this.WUIMode = value; }


   /* get openModemEnable(){ 
        return this.openModemEnable;
    }

    set openModemEnable(value) { this.openModemEnable = value; } */

    isSuperAdmin(){ return this.userLevel ==  0; }
    isEndUser(){ return this.userLevel ==  1; }
}
