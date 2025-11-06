import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TopNavigationComponent extends Component {
  constructor() {
    super(...arguments);
  }

  @action
  CloseMobileMenuClick(e) {
    //console.log('CloseMobileMenuClick clicked');
    //console.log(e);
    let hasclass = document.getElementsByClassName('navbar-toggler')[0].classList.contains('collapsed');
    if (!hasclass) {
      document.getElementsByClassName('navbar-toggler')[0].click();
    }
  }
}
