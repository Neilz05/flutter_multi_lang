import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusAndSupportAboutController extends Controller {
    @service store;
    @service intl;
    @tracked selected = 'about';
    
    constructor() {
        super(...arguments);
    }

    licenses = [
        { id: "about", title: this.intl.t('PAGE_ABOUT_OPEN_SOURCE') },
        { id: "gnu", title: 'GNU Code Requests' },
        { id: "licenses", title: 'Texts of Open Source Licenses' }
    ];

    @action
    accordionChange(index) {
        this.selected = (this.selected === index) ? null : index;
    }

    HTMLReadyLoaded() {
        let bodys = document.getElementsByClassName('accordion-body');
        //console.log(bodys);
        for (let i = 0; i < bodys.length; i++) {
            let body = bodys[i];
            let pElements = body.getElementsByTagName('p');
            //console.log(pElements);
            for (let j = 0; j < pElements.length; j++) {
                let p = pElements[j];
                if(p.innerHTML !== '' && p.innerHTML !== '&nbsp;') {
                    //console.log(p.innerText);
                    p.setAttribute('tabindex', '0');
                    p.setAttribute('aria-label', p.innerText);
                }
            }
            let liElements = body.getElementsByTagName('li');
            for (let k = 0; k < liElements.length; k++) {
                let li = liElements[k];
                if(li.innerHTML !== '' && li.innerHTML !== '&nbsp;') {
                    //console.log(li.innerText);
                    li.setAttribute('tabindex', '0');
                    li.setAttribute('aria-label', li.innerText);
                }
            }
        }
    }
}
