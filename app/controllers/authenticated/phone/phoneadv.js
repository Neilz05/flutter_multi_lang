import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

class InputNode{
 
  @tracked node = null; 
  @tracked error = "";
  @tracked title = null; 
  @tracked onUpdate = null; 
  @tracked attr = null; 
	@tracked value = null; 

  constructor(from) {
    this.node = from.node;
    this.title = from.title;
    this.onUpdate = from.onUpdate;
    this.error = from.error;
    this.attr = from.attr;
		this.value = from.value;
  }
}
class ButtonNode{
 
  @tracked node = null; 
  //@tracked error = "";
  @tracked title = null; 
  @tracked onUpdate = null; 
  @tracked attr = null; 
	//@tracked value = null; 
	@tracked buttonId = null; 

  constructor(from) {
    this.node = from.node;
    this.title = from.title;
    this.onUpdate = from.onUpdate;
    //this.error = from.error;
    this.attr = from.attr;
		//this.value = from.value;
		this.buttonId = from.buttonId;
  }
}

class ChangeNode{
 
  @tracked node = null; 

  constructor(from) {
    this.node = from.node;
  }
}


export default class AuthenticatedSecurityPhoneadvController extends Controller {
    @service intl;
    @service eaactrl;

    @tracked arInputNodes = [];
    @tracked arChangeNodes = [];
		
    @tracked voipDailTimeout = null;
    @tracked firstDigitTimeout = null;
    @tracked minHookFlash = null;
    @tracked maxHookFlash = null;
    @tracked preferedCodec1 = null;
    @tracked preferedCodec1_packetization = null;
    @tracked preferedCodec1_state = null;
    @tracked preferedCodec2 = null;
    @tracked preferedCodec2_packetization = null;
    @tracked preferedCodec2_state = null;
    @tracked location = null;
    @tracked echoCancellation = null;
    @tracked vadSupport = null;
    @tracked dscpForRtp = null;
    @tracked signallingDscp = null;
    @tracked localRtpMaxPort = null;
    @tracked localRtpMinPort = null;
    @tracked rtcpPacketInterval = null;
    @tracked registrationExpireTimeout = null;
    @tracked registrationRetryInterval = null;
    @tracked primaryProxyRetryInterval = null;
    @tracked sessionTimerExpires = null;
    @tracked sessionTimerMinSe = null;
    @tracked prack = null;
    @tracked interfaceName = null;
		@tracked arOptions_interfaceName = [];

		
		arAudioCodecOptions=["G.711ALaw","G.729","G.711MuLaw","G.722"];
		arAudioCodecPacketizationOptions=["20","10, 20, 30","5-40","5-10, 20, 30"];
		arLocationOptions=["IT","DE","UK","PT","IE","ETS"];

    
    setupData(){
				var current = null;		
	
        var _this = this;
        this.arInputNodes = [];
        this.arChangeNodes = [];
				
				this.voipDailTimeout = new InputNode({
                node: this.model.callcontrol_numberingplan_1, 
                attr: 'InterDigitTimerStd',                 
                value: this.model.callcontrol_numberingplan_1.get('InterDigitTimerStd'),  
                onUpdate: this.validateNumber, 
                title: 'PAGE_PHONEADV_VOIP_DIAL_TIMEOUT',
                error: ""
            });
				this.arInputNodes.push(this.voipDailTimeout);
				this.arChangeNodes.push(new ChangeNode({node: this.model.callcontrol_numberingplan_1}));
				
				this.firstDigitTimeout = new InputNode({
                node: this.model.callcontrol_numberingplan_1, 
                attr: 'X_PRPLWARE-COM_FirstDigitTimerStd',                 
                value: '',  
                onUpdate: this.validateNumber, 
                title: 'PAGE_PHONEADV_FIRST_DIGIT_TIMEOUT',
                error: ""
            });
				this.firstDigitTimeout.value = this.firstDigitTimeout.node.get(this.firstDigitTimeout.attr);						
				this.arInputNodes.push(this.firstDigitTimeout);
				this.arChangeNodes.push(new ChangeNode({node: this.model.callcontrol_numberingplan_1}));

				this.minHookFlash = current = new InputNode({
                node: this.model.voipprofile_1, 
                attr: 'X_PRPLWARE-COM_FlashHookMinTime',                 
                value: '',  
                onUpdate: this.validate_minHookFlash, 
                title: 'PAGE_PHONEADV_MINHOOKFLASH',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.maxHookFlash = current = new InputNode({
                node: this.model.voipprofile_1, 
                attr: 'X_PRPLWARE-COM_FlashHookMaxTime',                 
                value: '',  
                onUpdate: this.validate_maxHookFlash, 
                title: 'PAGE_PHONEADV_MAXHOOKFLASH',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.preferedCodec1 = new InputNode({
                node: this.model.codecprofile_1, 
                attr: 'Codec',                 
                value: '',  
                onUpdate: this.onSelectChange, 
                title: 'PAGE_PHONEADV_PREFERRED_CODEC_1',
                error: ""
            });
				this.preferedCodec1.value = this.preferedCodec1.node.get(this.preferedCodec1.attr);						
				//this.arInputNodes.push(this.preferedCodec1);
				this.arChangeNodes.push(new ChangeNode({node: this.model.codecprofile_1}));

				this.preferedCodec1_packetization = new InputNode({
                node: this.model.codecprofile_1, 
                attr: 'PacketizationPeriod',                 
                value: '',  
                onUpdate: this.onSelectChange, 
                title: 'PAGE_PHONEADV_PACKETIZATION',
                error: ""
            });
				this.preferedCodec1_packetization.value = this.preferedCodec1_packetization.node.get(this.preferedCodec1_packetization.attr);						
				//this.arInputNodes.push(this.preferedCodec1_packetization);
				this.arChangeNodes.push(new ChangeNode({node: this.model.codecprofile_1}));

				this.preferedCodec1_state = new ButtonNode({
                node: this.model.codecprofile_1, 
                attr: 'Enable',                 
                //value: '',  
                //onUpdate: this.onButtonChange, 
                title: 'PAGE_PHONEADV_STATE',
                //error: "",
								buttonId: 'preferedCodec1_state',
            });
				//this.arInputNodes.push(this.preferedCodec1_state);
				this.arChangeNodes.push(new ChangeNode({node: this.model.codecprofile_1}));

				this.preferedCodec2 = new InputNode({
                node: this.model.codecprofile_2, 
                attr: 'Codec',                 
                value: '',  
                onUpdate: this.onSelectChange, 
                title: 'PAGE_PHONEADV_PREFERRED_CODEC_2',
                error: ""
            });
				this.preferedCodec2.value = this.preferedCodec2.node.get(this.preferedCodec2.attr);						
				this.arChangeNodes.push(new ChangeNode({node: this.model.codecprofile_2}));

				this.preferedCodec2_packetization = new InputNode({
                node: this.model.codecprofile_2, 
                attr: 'PacketizationPeriod',                 
                value: '',  
                onUpdate: this.onSelectChange, 
                title: 'PAGE_PHONEADV_PACKETIZATION',
                error: ""
            });
				this.preferedCodec2_packetization.value = this.preferedCodec2_packetization.node.get(this.preferedCodec2_packetization.attr);						
				this.arChangeNodes.push(new ChangeNode({node: this.model.codecprofile_2}));

				this.preferedCodec2_state = new ButtonNode({
                node: this.model.codecprofile_2, 
                attr: 'Enable',                 
                title: 'PAGE_PHONEADV_STATE',
								buttonId: 'preferedCodec2_state',
            });
				this.arChangeNodes.push(new ChangeNode({node: this.model.codecprofile_2}));
				
				this.arChangeNodes.push(new ChangeNode({node: this.model.sip_client_1}));
								
				this.location = new InputNode({
                node: this.model.pots, 
                attr: 'Region',                 
                value: '',  
                onUpdate: this.onSelectChange, 
                title: 'PAGE_PHONEADV_LOCATION',
                error: ""
            });
				this.location.value = this.location.node.get(this.location.attr);						
				//this.arInputNodes.push(this.location);
				this.arChangeNodes.push(new ChangeNode({node: this.model.pots}));

				this.echoCancellation = new ButtonNode({
                node: this.model.pots_fxs_1_voiceprocessing, 
                attr: 'EchoCancellationEnable',                 
                title: 'PAGE_PHONEADV_ECHOCANCELLATION',
								buttonId: 'echoCancellation',
            });
				this.arChangeNodes.push(new ChangeNode({node: this.model.pots_fxs_1_voiceprocessing}));

				this.vadSupport = new ButtonNode({
                node: this.model.codecprofile_1, 
                attr: 'SilenceSuppression',                 
                title: 'PAGE_PHONEADV_VADSUPPORT',
								buttonId: 'vadSupport',
            });
				this.arChangeNodes.push(new ChangeNode({node: this.model.codecprofile_1}));
				
				this.dscpForRtp = current = new InputNode({
                node: this.model.voipprofile_1_rtp, 
                attr: 'DSCPMark',                 
                value: '',  
                onUpdate: this.validateNumber, 
                title: 'PAGE_PHONEADV_DSCP4RTP',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.signallingDscp = current = new InputNode({
                node: this.model.sip_network_1, 
                attr: 'DSCPMark',                 
                value: '',  
                onUpdate: this.validateNumber, 
                title: 'PAGE_PHONEADV_SIGNALLINGDSCP',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.localRtpMaxPort = current = new InputNode({
                node: this.model.voipprofile_1_rtp, 
                attr: 'LocalPortMax',                 
                value: '',  
                onUpdate: this.validate_LocalRtpMaxPort, 
                title: 'PAGE_PHONEADV_LOCALRTPMAXPORT',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.localRtpMinPort = current = new InputNode({
                node: this.model.voipprofile_1_rtp, 
                attr: 'LocalPortMin',                 
                value: '',  
                onUpdate: this.validate_LocalRtpMinPort, 
                title: 'PAGE_PHONEADV_LOCALRTPMINPORT',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.rtcpPacketInterval = current = new InputNode({
                node: this.model.voipprofile_1_rtp_rtcp, 
                attr: 'TxRepeatInterval',                 
                value: '',  
                onUpdate: this.validateNumber, 
                title: 'PAGE_PHONEADV_RTCPPACKETINTERVAL',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.registrationExpireTimeout = current = new InputNode({
                node: this.model.sip_network_1, 
                attr: 'RegisterExpires',                 
                value: '',  
                onUpdate: this.validateNumber, 
                title: 'PAGE_PHONEADV_REGISTRATIONEXPIRETIMEOUT',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.registrationRetryInterval = current = new InputNode({
                node: this.model.sip_network_1, 
                attr: 'RegisterRetryInterval',                 
                value: '',  
                onUpdate: this.validateNumber, 
                title: 'PAGE_PHONEADV_REGISTRATIONRETRYTIMEOUT',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.primaryProxyRetryInterval = current = new InputNode({
                node: this.model.sip_network_1, 
                attr: 'X_PRPLWARE-COM_ProbeRetryInterval',                 
                value: '',  
                onUpdate: this.validateNumber, 
                title: 'PAGE_PHONEADV_PRIMARYPROXYRETRYINTERVAL',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));
				
				this.sessionTimerExpires = current = new InputNode({
                node: this.model.voipprofile_1, 
                attr: 'X_PRPLWARE-COM_SessionExpire',                 
                value: '',  
                onUpdate: this.validateNumber, 
                title: 'PAGE_PHONEADV_SESSIONTIMEREXPIRES',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.sessionTimerMinSe = current = new InputNode({
                node: this.model.voipprofile_1, 
                attr: 'X_PRPLWARE-COM_MinSessionExpire',                 
                value: '',  
                onUpdate: this.validateNumber, 
                title: 'PAGE_PHONEADV_SESSIONTIMERMINSE',
                error: ""
            });
				current.value = current.node.get(current.attr);						
				this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.prack = current = new ButtonNode({
                node: this.model.voipprofile_1, 
                attr: 'X_PRPLWARE-COM_PrackEnable',                 
                title: 'PAGE_PHONEADV_PRACK',
								buttonId: 'prack',
            });
				this.arChangeNodes.push(new ChangeNode({node: current.node}));

				this.interfaceName = current = new InputNode({
                node: this.model.voiceservice_1, 
                attr: 'X_PRPLWARE-COM_WANReferenceList',                 
                value: '',  
                onUpdate: this.onSelectChange, 
                title: 'PAGE_PHONEADV_INTERFACENAME',
                error: ""
            });
				current.value = current.node.get(current.attr);					
				//this.arInputNodes.push(current);
				this.arChangeNodes.push(new ChangeNode({node: current.node}));
				
				if (this.model.ip_interface_2.Name)
					this.arOptions_interfaceName.push({display: this.model.ip_interface_2.Name, value: "Logical.Interface.1."});
				if (this.model.ip_interface_9.Name)
					this.arOptions_interfaceName.push({display: this.model.ip_interface_9.Name, value: "Logical.Interface.5."});


    }

    get T38Enable() {
        let ret = false;
        ret = this.model.sip_client_1.get('T38Enable') == 1 ? true : false;
				//console.log("get t38enable", ret);
        return ret;
    }
    set T38Enable(value) {
        this.model.sip_client_1.set('T38Enable', value ? 1 : 0);
				//console.log("set t38enable", value);
    }
		
    get preferedCodec1_state_onoffvalue() {
        let ret = false;
				let obj = this.preferedCodec1_state;
        ret = obj.node.get(obj.attr) == 1 ? true : false;
				//console.log("get preferedCodec1_state_onoffvalue", ret);
        return ret;
    }
    set preferedCodec1_state_onoffvalue(value) {
				let obj = this.preferedCodec1_state;
        obj.node.set(obj.attr, value ? 1 : 0);
				//console.log("set preferedCodec1_state_onoffvalue", value);
    }
    get preferedCodec2_state_onoffvalue() {
        let ret = false;
				let obj = this.preferedCodec2_state;
        ret = obj.node.get(obj.attr) == 1 ? true : false;
				//console.log("get preferedCodec2_state_onoffvalue", ret);
        return ret;
    }
    set preferedCodec2_state_onoffvalue(value) {
				let obj = this.preferedCodec2_state;
        obj.node.set(obj.attr, value ? 1 : 0);
				//console.log("set preferedCodec2_state_onoffvalue", value);
    }

    get echoCancellation_onoffvalue() {
        let ret = false;
				let obj = this.echoCancellation;
        ret = obj.node.get(obj.attr) == 1 ? true : false;
				//console.log("get echoCancellation_onoffvalue", ret);
        return ret;
    }
    set echoCancellation_onoffvalue(value) {
				let obj = this.echoCancellation;
        obj.node.set(obj.attr, value ? 1 : 0);
				//console.log("set echoCancellation_onoffvalue", value);
    }
    get prack_onoffvalue() {
        let ret = false;
				let obj = this.prack;
        ret = obj.node.get(obj.attr) == 1 ? true : false;
				//console.log("get prack_onoffvalue", ret);
        return ret;
    }
    set prack_onoffvalue(value) {
				let obj = this.prack;
        obj.node.set(obj.attr, value ? 1 : 0);
				//console.log("set prack_onoffvalue", value);
    }
		
    get vadSupport_onoffvalue() {
        let ret = false;
				let obj = this.vadSupport;
        ret = obj.node.get(obj.attr) == 1 ? true : false;
				//console.log("get vadSupport_onoffvalue", ret);
        return ret;
    }
    set vadSupport_onoffvalue(value) {
				let obj = this.vadSupport;
        obj.node.set(obj.attr, value ? 1 : 0);
				//console.log("set vadSupport_onoffvalue", value);
    }
		
    @action
    onSelectChange(obj, event) {
        const v = event.target.value;
        obj.node[obj.attr] =  event.target.value;
    }


    get hasChanges() {
        let isDirty = false;

        let isError = false;
        this.arInputNodes.forEach((one, index) => {
            if (one.error) isError = true;
        });
        if (isError){
            return isDirty;
        }

        this.arChangeNodes.forEach((one, index) => {
					//console.log("arChangeNodes: "+index, one);
                if (one.node.hasDirtyAttributes) {
                    isDirty = true;										
                }            
        });

        return isDirty;
    } 

    @action
    applyPage() {
			
        this.arChangeNodes.forEach((one, index) => {
					//console.log("arChangeNodes: "+index, one);
                if (one.node.hasDirtyAttributes) {
                    one.node.save().then(() => {                        
                    });										
                }            
        });				
    }

    @action
    cancelPage() {
        this.arChangeNodes.forEach((one, index) => {
					//console.log("arChangeNodes: "+index, one);
                if (one.node.hasDirtyAttributes) {
                    one.node.rollbackAttributes();										
                }            
        });
				this.setupData();
    }

		isNumeric(value, positive_only) {
			if (positive_only){
				return /^\d+$/.test(value);
			}else{
				return /^-?\d+$/.test(value);				
			}		
		}
		
    @action
    validateNumber(obj, event) {
			  let v = event.target.value;							
        let ret = this.isNumeric(v, true);
				//console.log(v, ret);
        if (ret){
					v = Number(v);
					obj.node[obj.attr] =  v;
					obj.error =  "" ;
				}else{
					obj.error =  this.intl.t('PAGE_PHONEADV_INVALID_NUMBER');
				}
    }
    @action
    validate_maxHookFlash(obj, event) {

			  let v = event.target.value;				
				obj.value = v;
        let ret = this.isNumeric(v, true);
        if (ret){
					v = Number(v);	
				  obj.node[obj.attr] = v;					
					if (v >= this.minHookFlash.node.get(this.minHookFlash.attr)){
						obj.error =  "" ;
						if (this.minHookFlash.error){
							var relatedValue = this.minHookFlash.value;
							if (this.isNumeric(relatedValue, true)){
								var relatedNumber = Number(relatedValue);
								if (relatedNumber <= v){
									this.minHookFlash.error = '';
								}
							}
						}

					}else{
						obj.error =  this.intl.t('PAGE_PHONEADV_INVALID_VALUE');
					}
				}else{
					obj.error =  this.intl.t('PAGE_PHONEADV_INVALID_NUMBER');
				}
    }
		
    @action
    validate_minHookFlash(obj, event) {
			  let v = event.target.value;		
        obj.value = v;				
        let ret = this.isNumeric(v, true);
        if (ret){
					v = Number(v);
				  obj.node[obj.attr] = v;					
					if (v <= this.maxHookFlash.node.get(this.maxHookFlash.attr)){
						obj.error =  "" ;
						if (this.maxHookFlash.error){
							var relatedValue = this.maxHookFlash.value;
							if (this.isNumeric(relatedValue, true)){
								var relatedNumber = Number(relatedValue);
								if (relatedNumber >= v){
									this.maxHookFlash.error = '';
								}
							}
						}

					}else{
						obj.error =  this.intl.t('PAGE_PHONEADV_INVALID_VALUE');						
					}
				}else{
					obj.error =  this.intl.t('PAGE_PHONEADV_INVALID_NUMBER');
				}
    }		

    @action
    validate_LocalRtpMaxPort(obj, event) {
			  let v = event.target.value;	
        obj.value = v;						
        let ret = this.isNumeric(v, true);
        if (ret){
					v = Number(v);
          obj.node[obj.attr] = v;	
					if (v >= this.localRtpMinPort.node.get(this.localRtpMinPort.attr)){
						obj.error =  "" ;
						if (this.localRtpMinPort.error){
							var relatedValue = this.localRtpMinPort.value;
							if (this.isNumeric(relatedValue, true)){
								var relatedNumber = Number(relatedValue);
								if (relatedNumber <= v){
									this.localRtpMinPort.error = '';
								}
							}
						}
					}else{
						obj.error =  this.intl.t('PAGE_PHONEADV_INVALID_VALUE');
					}
				}else{
					obj.error =  this.intl.t('PAGE_PHONEADV_INVALID_NUMBER');
				}
    }
    @action
    validate_LocalRtpMinPort(obj, event) {
			  let v = event.target.value;		
        obj.value = v;					
        let ret = this.isNumeric(v, true);
        if (ret){
					//console.log('validate_LocalRtpMinPort', v, this.localRtpMaxPort.node.get(this.localRtpMaxPort.attr));
					v = Number(v);
          obj.node[obj.attr] = v;	
					if (v <= this.localRtpMaxPort.node.get(this.localRtpMaxPort.attr)){
						obj.error =  "" ;
						if (this.localRtpMaxPort.error){
							var relatedValue = this.localRtpMaxPort.value;
							if (this.isNumeric(relatedValue, true)){
								var relatedNumber = Number(relatedValue);
								if (relatedNumber >= v){
									this.localRtpMaxPort.error = '';
								}
							}
						}
					}else{
						
						obj.error =  this.intl.t('PAGE_PHONEADV_INVALID_VALUE');
					}
				}else{
					obj.error =  this.intl.t('PAGE_PHONEADV_INVALID_NUMBER');
				}
    }		

}