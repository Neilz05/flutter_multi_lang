import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class UiInputWithErrormsgComponent extends Component {

    get errorClass() {
        return ((this.args.errorMessage.length > 0) ? 'is-invalid' : '')
    }

}