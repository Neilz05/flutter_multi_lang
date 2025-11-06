import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TopNavigationComponent extends Component {
  @tracked refreshKey = 0;
  @tracked routeItem = '';

  constructor() {
    super(...arguments);
  }

  @action
  checkIsInMenu(menuobj) {
    let segment = window.location.pathname.split('/')[1];
    if(this.routeItem === ''){
      if (menuobj.route.indexOf(segment) === -1) {
        return "";
      }else{
        return "active";
      }
    }else{
      if (menuobj.route.indexOf(this.routeItem) === -1) {
        return "";
      }else{
        return "active";
      }
    }
  }

  @action
  refreshNavigation() {
    this.routeItem = this.args.activeTopMenuRoute.split('.')[1];
    this.refreshKey++;
  }

}
