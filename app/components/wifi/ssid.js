import Component from '@glimmer/component';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import sanitize from 'prpl-webui/utils/sanitize';

export default class WifiSsidComponent extends Component {
  @tracked multi;
  @tracked ssid;
  @tracked inputValue;

  constructor() {
    super(...arguments);
    this.multi = this.args.multi;
    this.ssid = this.args.ssid;
    this.inputValue = sanitize(this.args.ssid?.SSID || '');
  }

  get enabled() {
    return this.args.ssid && this.args.ssid.get('Enable') == 1 ? true : false;
  }

  set enabled(value) {
    if (this.args.ssid) {
      set(this.args.ssid, 'Enable', value ? 1 : 0);
    }
  }

  @action
  updateChangesetField(changeset, key, event) {
    changeset.set(key, event.target.value);
  }

  @action
  handleInput(event) {
    let rawValue = event.target.value;
    if (this.args.ssid) {
      this.args.ssid.set('SSID', rawValue);
    }
  }
}
