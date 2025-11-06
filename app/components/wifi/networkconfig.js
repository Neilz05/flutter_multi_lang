import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';
import sanitize from 'prpl-webui/utils/sanitize';

export default class WifiNetworkconfigComponent extends Component {
  @action
  Toggle(record, attr) {
    record[attr] = record[attr] === 1 ? 0 : 1;

  }
}
