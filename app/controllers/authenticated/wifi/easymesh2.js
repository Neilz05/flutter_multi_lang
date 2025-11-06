import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking'; 

class EasymeshNode{
 
  @tracked node = null; 
  @tracked nextHop = "";
  @tracked backhaulLink = "";
  @tracked RSSI = "";
  @tracked error = "";

  constructor(from) {
    this.node = from.node;
    this.nextHop = from.nextHop;
    this.backhaulLink = from.backhaulLink;
    this.RSSI = from.RSSI;
    this.error = from.error;
  }
}
class EasymeshDevice{
 
  @tracked MACAddress = "";
  @tracked node = null;
  @tracked devicename = "";
  @tracked steeringmaclist = "";
  //@tracked deviceRadio = "";
  @tracked SignalStrength = "";
  @tracked LastDataUplinkRate = "";
  @tracked RSSI = "";
  @tracked frequency_str = "";
  @tracked error = "";

  constructor(from) {

                    this.MACAddress = from.MACAddress; 
                    this.node = from.node; 
                    this.devicename = from.devicename; 
                    this.steeringmaclist = from.steeringmaclist; 
                    //this.deviceRadio = from.deviceRadio; 
                    this.SignalStrength = from.SignalStrength; 
                    this.LastDataUplinkRate = from.LastDataUplinkRate; 
                    this.RSSI = from.RSSI; 
                    this.frequency_str = from.frequency_str; 
                    this.error = from.error; 

    }
}
 
export default class AuthenticatedEasyMesh2Controller extends Controller {
    @service store;
    @service intl;
    @service eaactrl;
    componentId = this.eaactrl.getRandomString(16);
    get componentId() {
        return this.componentId;
    }
        
    @tracked errorMsg_EasymeshName = "";
    @tracked arNodes = [];
    @tracked arDevices = [];
		
		signalStrengthToRSSI(SignalStrength){
			return (SignalStrength / 2) - 110;
		}
    
    setupData(){
        
        var _this = this;

        this.arNodes = [];
        this.model.nodelist.forEach(function(curnode){
            //console.log("easymesh node: ", curnode);
            var macaddress =  curnode.MACAddress;
            var nexthop = '';
            var backhaullink = '';
            var RSSI = '-';
            var BackhaulSta_MACAddress = '';
            //console.log("wanted: ", macaddress);
						
            var found_device = _this.model.denetworkdevicelist.find(function(cur_networkdevice, cur_networkdevice_index){
              //console.log(cur_networkdevice_index+" has: ", cur_networkdevice.ID);
              if (cur_networkdevice.ID == macaddress){
                var backhaulobj = cur_networkdevice.MultiAPDevice.get('Backhaul');
                nexthop = backhaulobj.get('BackhaulDeviceID');
                backhaullink = backhaulobj.get('LinkType');                       
                if (backhaullink == 'Wi-Fi'){
									var statsobj = backhaulobj.get('Stats');
									var SignalStrength = statsobj.get('SignalStrength');
                  RSSI = _this.signalStrengthToRSSI(SignalStrength); 
                  //console.log("NodeList SignalStrength: ", SignalStrength);									
                }
                return true;
              }else{
                return false;
              }               
                
            });
            
            _this.arNodes.push(new EasymeshNode({
                node: curnode, 
                nextHop: nexthop,
                backhaulLink: backhaullink,
                RSSI: RSSI,
                error: ""
            }))
        });

        this.arDevices = [];
        
        this.model.devicelist.forEach(function(easymeshdevice){ 
          var role = easymeshdevice.get('Role');
          if (role == "WiFi_Client"){
            var macaddress = easymeshdevice.MACAddress;
            //console.log("devicelist macaddress", macaddress);
						var devicename = easymeshdevice.Name;
            //console.log("devicelist Name", devicename);

            var maclist = _this.model.easymesh.Steering.get('MacList');
            //console.log("maclist", maclist);
            var found_steeringmaclist = maclist.find(function(steeringmaclist){
                //console.log("steeringmaclist.MACAddress", steeringmaclist.MACAddress);
                if (steeringmaclist.MACAddress == macaddress) return true;
                return false;                
            });
            //console.log("found_steeringmaclist", found_steeringmaclist);
            
            var wanted_radio = undefined;
            var SignalStrength;
            var LastDataUplinkRate;
            var RSSI;
            var frequency = [];
            
            var found_device = _this.model.denetworkdevicelist.find(function(cur_networkdevice, cur_networkdevice_index){
                
                var found_radio = cur_networkdevice.Radio.find(function(cur_radio, cur_radio_index){
                    var found_bss = cur_radio.BSS.find(function(cur_bss, cur_bss_index){
                        var found_sta = cur_bss.STA.find(function(cur_sta, cur_sta_index){
                            if (cur_sta.MACAddress == macaddress){
                                wanted_radio = cur_radio;
                                SignalStrength = cur_sta.SignalStrength;
                                LastDataUplinkRate = cur_sta.LastDataUplinkRate;
                                RSSI = _this.signalStrengthToRSSI(SignalStrength);
																//console.log("Device list SignalStrength: ", SignalStrength);
                                //console.log("cur_sta.MACAddress :", cur_sta.MACAddress);
                                //console.log("cur_sta: ", cur_sta);
                                //console.log("cur_sta: Hostname :", cur_sta.Hostname);
                                //console.log("wanted_radio: ", wanted_radio);
                                wanted_radio.CurrentOperatingClasses.forEach(function(curOpClass){
                                    //console.log("CurrentOperatingClasses: ", curOpClass);
                                    //console.log("Class :", curOpClass.Class);
                                    
                                    // Device.WiFi.DataElements.Network.Device.*.Radio.*.CurrentOperatingClasses.*.Class 
                                    // 2G: 81~84
                                    // 5G: 115~130
                                    // 6G: 131~137
                                    if (curOpClass.Class >= 81 && curOpClass.Class <= 84){
                                        frequency.push('2GHz');
                                    }else if (curOpClass.Class >= 115 && curOpClass.Class <= 130){
                                        frequency.push('5GHz');
                                    }else if (curOpClass.Class >= 131 && curOpClass.Class <= 137){
                                        frequency.push('6GHz');
                                    }
                                });
                                return true;
                            }
                            return false;      
                        });
                        if (found_sta) return true;
                        else return false;
                    });
                    if (found_bss) return true;
                    else return false;
                });
                
                if (found_radio) return true;
                else return false;  
                
            });
            var w = {
                MACAddress: macaddress,
                node: easymeshdevice, 
								devicename: devicename,
                steeringmaclist: found_steeringmaclist, 
                //deviceRadio: wanted_radio,
                SignalStrength: SignalStrength,
                LastDataUplinkRate: LastDataUplinkRate,
                RSSI: RSSI,
                frequency_str: frequency.join('/'),                
                error: ""
            };
            _this.arDevices.push(new EasymeshDevice(w));
            //console.log("added device:",w);
						
				  }
            
        });

    }
    
    
    get easymeshEnable() {
        let ret = false;
        ret = this.model.easymesh.get('Enable') == 1 ? true : false;
        return ret;
    }

    set easymeshEnable(value) {
        this.model.easymesh.set('Enable', value ? 1 : 0);
    }


    @action
    onChange_EasymeshName(event) {
        let name = event.target.value;

        this.validate_EasymeshName(name) ;
    }

    validate_EasymeshName(name) {
        if(name === "") {
            this.errorMsg_EasymeshName = this.intl.t('PAGE_EASY_MESH_NAME_INVALID');
        } else {
            var regex = /^[^\\~@#$%^&*+=\[\]{};:\\|€˜"<>,?']*$/;

            if(regex.test(name)) {
                this.errorMsg_EasymeshName = "";
            } else {
                this.errorMsg_EasymeshName = this.intl.t('PAGE_EASY_MESH_NAME_INVALID');
            }
        }

        return this.errorMsg_EasymeshName;
    }
    
    get hasChanges() {
        var isDirty = false;
        if (this.errorMsg_EasymeshName) return false;
        var hasError = false;
        this.arNodes.forEach(entry => {     
            if (entry.error.length > 0) hasError = true;
        });
        if (hasError) return false;

        this.arDevices.forEach(entry => {     
            if (entry.error.length > 0) hasError = true;
        });

        if (hasError) return false;

        
        if (this.model.easymesh.hasDirtyAttributes){
            return true;
        }
        
        var t = this.model.nodelist.forEach(entry => {     
            if (entry.isNew || entry.isDeleted || entry.hasDirtyAttributes) isDirty = true;
        });

        var t = this.model.devicelist.forEach(entry => {     
            if (entry.isNew || entry.isDeleted || entry.hasDirtyAttributes) isDirty = true;
        });

        
        //this.model.easymesh.Steering.get('MacList').forEach(entry => {     
        //    if (entry.isNew || entry.isDeleted || entry.hasDirtyAttributes) isDirty = true;
        //});
        let data = this.store.peekAll('wifi-x-000e50-multiap-steering-maclist');
        data.forEach(entry => {
            if (entry.isNew || entry.isDeleted || entry.hasDirtyAttributes) isDirty = true;
        });
        
        return isDirty;
    }
    
    async executeChanges() {
         //console.log("executeChanges");
        
        if (this.model.easymesh.hasDirtyAttributes) {
            this.model.easymesh.save().then(() => {
                window.location.reload();
            });
        }
        const changePromises1 = 
                this.model.nodelist
                .map(e => {
                    if (e.isNew || e.hasDirtyAttributes)
                        return e.save()
                    if (e.isDeleted){
                        return e.destroyRecord()
                    }
                })
        const changePromises2 = 
                this.model.devicelist
                .map(e => {
                    if (e.isNew || e.hasDirtyAttributes)
                        return e.save()
                    if (e.isDeleted){
                        return e.destroyRecord()
                    }
                })
        const changePromises3 = this.store.peekAll('wifi-x-000e50-multiap-steering-maclist').map(e => {
                    if (e.isNew || e.hasDirtyAttributes)
                        return e.save()
                    if (e.isDeleted){
                        return e.destroyRecord()
                    }
                }) 

        const changePromises = changePromises1.concat(changePromises2.concat(changePromises3));
        Promise.all(changePromises).then(() => {
            //window.location.reload()
        })

    }

    @action
    Apply(){
        
        this.validate_EasymeshName(this.model.easymesh.Name);
        if (this.errorMsg_EasymeshName) return;

        if (this.hasChanges){
            this.executeChanges()
        }
    }

    @action
    Cancel(){
        
        if (this.model.easymesh.hasDirtyAttributes) {
            this.model.easymesh.rollbackAttributes();
        }
        
        this.errorMsg_EasymeshName = "";        
        
        this.model.nodelist.forEach(e => {
            e.rollbackAttributes()
        })
        this.model.devicelist.forEach(e => {
            e.rollbackAttributes()
        })

    }

    validate_EasymeshNodeName(name) {
        var errorMsg_EasymeshName;
        if(name === "") {
            errorMsg_EasymeshName = this.intl.t('PAGE_EASY_MESH_NAME_INVALID');
        } else {
            var regex = /^[^\\~@#$%^&*+=\[\]{};:\\|€˜"<>,?']*$/;

            if(regex.test(name)) {
                errorMsg_EasymeshName = "";
            } else {
                errorMsg_EasymeshName = this.intl.t('PAGE_EASY_MESH_NAME_INVALID');
            }
        }

        return errorMsg_EasymeshName;
    }
    
    @action
    updateName(obj, event) {
        
        let newValue = event.target.value;

        var err = this.validate_EasymeshNodeName(newValue);

        if (err) {
            obj.error = err;
            this.eaactrl.setEaaWarningPolite(err);
        } else {
            // if there was previous error, remove it
            obj.error = "";
            this.eaactrl.setEaaWarningPolite("");
        }

        obj.node.Name = newValue;
       
    }

  
}




