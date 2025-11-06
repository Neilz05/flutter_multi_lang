import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class UiInputMacWithErrormsgComponent extends Component {
    get splitMacAddress() {
        if (!this.args.value || this.args.value === '') {
            return ["", "", "", "", "",""];
        }
        return this.args.value.split(':');
    }
}