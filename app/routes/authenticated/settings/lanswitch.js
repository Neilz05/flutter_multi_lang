import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedNetworkPasswordRoute extends Route {
    @service store;
  
    beforeModel() {
       localStorage.setItem('tab', 'authenticated.settings.lanswitch');
    }

    async model() {
        try{
            await this.store.query('ethernet-interface', {path: 'Ethernet.Interface.'})

            return this.store.peekAll('ethernet-interface')
        }catch (error){
            console.log(error)
            return []
        }        
    }
}
