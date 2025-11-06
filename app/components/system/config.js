import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ConfigComponent extends Component {
  @tracked isSaveModalVisible = false;

  @action
  showSaveModal() {
    this.isSaveModalVisible = true;
  }

  @action
  closeModal() {
    this.isSaveModalVisible = false;
  }

  @action
  saveConfiguration() {
    this.closeModal(); 
  }
}
