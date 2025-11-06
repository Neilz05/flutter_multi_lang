import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class UiRowComponent extends Component {
    @tracked isVisible = false;
    @tracked accessPoint = this.model.AccessPoint;

    @action 
    toggleVisibility(){
        this.isVisible = !this.isVisible;    
    }
}