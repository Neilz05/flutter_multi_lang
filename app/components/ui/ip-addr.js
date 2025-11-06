import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class UiIpAddrComponent extends Component {
    get splitIp() {
        if (!this.args.ip || this.args.ip === '') {
            return ["", "", "", ""];
        }
        return this.args.ip.split('.');
    }
}