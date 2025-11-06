import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class InputpwdComponent extends Component {
  @service eaactrl;
  @tracked showPassword = false;

  componentId = this.eaactrl.getRandomString(16);

  get componentId() {
    return this.componentId;
  }

  @action
  eyeControl(e) {
      e.preventDefault()
      this.showPassword = !this.showPassword;
  }

}
