import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { json } from "sjcl";

export default class WifiEasymeshNodeListComponent extends Component {
  @service store;
  @service intl;
  @service eaactrl;
  
  @tracked AddModal = false;
  @tracked ShowModal = false;
  @tracked macaddress_onAdd = "";
  @tracked SelectedEntry = null;
  
   constructor() {
    super(...arguments);
    // initialize from argument, fallback if not provided
  }

    validate_EasymeshNodeMacAddress_part_onAdd(name) {
        var errorMsg_EasymeshName;
        if(name === "") {
            errorMsg_EasymeshName = this.intl.t('PAGE_EASY_MESH_MACADDRESS_INVALID');
        } else {
            var regex = /^[0-9A-Fa-f]{2}$/;

            if(regex.test(name)) {
                errorMsg_EasymeshName = "";
            } else {
                errorMsg_EasymeshName = this.intl.t('PAGE_EASY_MESH_MACADDRESS_INVALID');
            }
        }

        return errorMsg_EasymeshName;
    }
    
    @action
    updateMacaddress_onAdd(id, index, errorId, obj, event) {
        
        let newValue = event.target.value;
        let id_item = `${id}-${index}`;

        var err = this.validate_EasymeshNodeMacAddress_part_onAdd(newValue);

        if (err) {
            let input = document.getElementById(id_item);
            if (input) {
                input.classList.add('is-invalid');
                input.style.backgroundImage = 'none';
            }
            document.getElementById(`${errorId}`).innerText = err;
            if (obj) obj.error = err;
        } else {
            // if there was previous error, remove it
            let input = document.getElementById(id_item);
            if (input) {
                input.classList.remove('is-invalid');
                input.style.backgroundImage = 'none';
            }
            document.getElementById(`${errorId}`).innerText = "";
            if (obj) obj.error = "";

        }

        //this.macaddress_onAdd = newValue;


    }
    
    @action
    OpenShowModal(dev){
        this.ShowModal = true
        this.SelectedEntry = dev

    }
    @action
    CloseShowModal(){
        this.ShowModal = false
    

    }
    
  @action
    CloseAddModal(){
        this.AddModal = false
    }

    @action
    SaveAddModal(){
        this.AddModal = false
    }

    @action
    OpenAddModal(){
        this.AddModal = true

    }



}