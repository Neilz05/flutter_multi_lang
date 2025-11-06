import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedPhoneController extends Controller {
  @tracked activeTab = 'phonesettings';
  @tracked hasComponentErrors = false;

  get phonesettingsTabActive() {
    // localStorage.setItem('tab', 'authenticated.phone.phone');
    return this.activeTab === 'phonesettings' ? true : false;
  }

  get voicestatusTabActive() {
    return this.activeTab === 'voicestatus' ? true : false;
  }

  get hasChanges() {
    let isDirty = false;

    if (this.model.network && this.model.network.hasDirtyAttributes) {
      isDirty = true;
    }

    if (this.model.network2 && this.model.network2.hasDirtyAttributes) {
      isDirty = true;
    }

    this.model.clients.forEach((client) => {
      if (client.hasDirtyAttributes) {
        isDirty = true;
      }
    });

    return isDirty && !this.hasComponentErrors;
  }

  @action
  updateComponentErrors(hasErrors) {
    this.hasComponentErrors = hasErrors;
  }

  @action
  updateVoice() {
    if (this.model.network && this.model.network.hasDirtyAttributes) {
      this.model.network.save();
    }

    if (this.model.network2 && this.model.network2.hasDirtyAttributes) {
      this.model.network2.save();
    }

    this.model.clients.forEach((client) => {
      if (client.hasDirtyAttributes) {
        client.save();
      }
    });
  }

  @action
  cancelPhone() {
    if (this.model.network) {
      this.model.network.rollbackAttributes();
    }

    if (this.model.network2) {
      this.model.network2.rollbackAttributes();
    }

    this.model.clients.forEach((client) => {
      if (client.hasDirtyAttributes) {
        client.rollbackAttributes();
      }
    });
  }

  @action
  setActiveTab(tab) {
    this.activeTab = tab;
  }
}
