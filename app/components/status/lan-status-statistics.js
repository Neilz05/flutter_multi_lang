import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StatusLanStatusStatisticsComponent extends Component {
    @tracked lans = [];

   constructor() {
      super(...arguments);
      this.setLans();
   }

   setLans() {
      this.lans = [];
      this.args.eth.Interface.forEach((element) => {
         if (element.Upstream == 0) {
            this.lans.push(element);
         }
      });
   }

   get isEtisalat() {
        return this.args.modName.includes("ETISALAT");
   }
}