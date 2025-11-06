import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';
import sanitize from 'prpl-webui/utils/sanitize';

export default class WifiAccesspointComponent extends Component {
  get enabled() {
    return this.args.accesspoint.Enable == 1 ? true : false;
  }

  set enabled(value) {
    set(this.args.accesspoint, 'Enable', value ? 1 : 0);
  }

  get inputValue(){
    return this.args.accesspoint.get('MaxAssociatedDevices');
  }
  set inputValue(value) {
    let sanitizedValue = value ? value.replace(/[^0-9]/g, '') : ''; //Ensure the value is an integer
    set(this.args.accesspoint, 'MaxAssociatedDevices', sanitizedValue);
  }

  @action
  Toggle(record, attr) {
    record[attr] = record[attr] == 1 ? 0 : 1
  }
}
