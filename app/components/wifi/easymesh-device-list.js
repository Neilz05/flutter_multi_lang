import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { json } from "sjcl";

export default class WifiEasyMeshDeviceListComponent extends Component {
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
   
   
   getStatusShow(dev, _this){

       if (dev.node.Active){
           if (dev.node.Status == 'Normal'){
               if (dev.RSSI == -110){                   
                   return _this.intl.t('PAGE_EASY_MESH_CONNECTING');
               }else{                   
                   return _this.intl.t('PAGE_EASY_MESH_GOOD');
               }               
           }else if (dev.node.Status == 'Weak'){
               return _this.intl.t('PAGE_EASY_MESH_WEAK');
           }else if (dev.node.Status == 'Hold-On'){               
               return _this.intl.t('PAGE_EASY_MESH_HOLDON');
           }else{
               return '';
           }
       }else{
           return _this.intl.t('PAGE_EASY_MESH_DISCONNECTED');
       }
//  
//       "When false, the status display ""Disconnected"" on GUI; 
// When true, check the status.
// When status is ""Noraml"", if rssi = -110, display ""Connecting"" on GUI,else, display ""Good"" on GUI.
//When status is ""Weak"", display ""Weak"" on GUI.
//When status is ""Hold-On"", display ""Hold-On"" on GUI."
   }
 
   getPolicyShow(dev, _this){
		  if (dev.steeringmaclist){
            if (dev.steeringmaclist.Policy == 1 ){
              return _this.intl.t('PAGE_EASY_MESH_POLICY_NOSTEER');
            }else{
              return _this.intl.t('PAGE_EASY_MESH_POLICY_NORMAL');
            }
			}else{
				return _this.intl.t('PAGE_EASY_MESH_POLICY_NORMAL');
			}
   }
  

    @action
    UpdatePolicy(obj, event){
        if (obj.steeringmaclist){
            obj.steeringmaclist.Policy = event.target.value;
        }else{
          obj.steeringmaclist = this.store.createRecord('wifi-x-000e50-multiap-steering-maclist', {
            MACAddress: obj.node.MACAddress,
            Policy: event.target.value,
          })

        }
        
        
    }

    

    
    
    @action
    OpenShowModal(model){
        //console.log(model);
        this.SelectedEntry = model
        this.ShowModal = true

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