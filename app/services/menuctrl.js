import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MenuavailableService extends Service {
    @service intl;
    @service currentUser;
	
	isMenuItemShow(menuobj){
		// superadmin: 3
		// enduser expert: 2
		// enduser basic: 1
		console.log("isMenuItemShow",menuobj.hide, this.currentUser.openModemEnable);
		if (menuobj.hide){
			return false;
		}else{
			var level = this.currentUser.isSuperAdmin() ? 3 : (this.currentUser.uiMode ==  "Expert" ? 2 : 1);
			return (menuobj.auth.indexOf(level) > -1) ;
		}
	};

    getMenuTable(p){
        console.log("getMenuTable", this.currentUser.openModemEnable);
		const phone_submenu = []
		phone_submenu.push({ route: "authenticated.phone.phone2", str: 'PAGE_PHONE_SETTINGS_TITLE', icon: 'icon-phone', id: 'phone', auth: [2,3], hide: !((p.voipEnable == 1) ? ((p.modelType ==  'FG4278Bv3') ?  true : false) : false), submenu: []});
        /* phone_submenu.push({ route: "authenticated.phone.phone", str: 'PAGE_PHONE_SETTINGS_TITLE', icon: 'icon-phone', id: 'phone', auth: [2,3], hide: !((p.voipEnable == 1) ? ((p.modelType ==  'FG4278Bv3') ?  false : true) : false), submenu: []}); */
		phone_submenu.push({ route: "authenticated.phone.calllog", str: 'PAGE_CALL_LOG_PAGETITLE', icon: undefined, id: 'calllog', auth: [1,2,3], hide: false, submenu: []})
		phone_submenu.push({ route: "authenticated.phone.callsettings", str: 'SUB_NAVIGATION_ITEM_CALL_SETTINGS', icon: undefined, id: 'callsettings', auth: [2,3], hide: false, submenu: []})
		phone_submenu.push({ route: "authenticated.phone.phone-numbers", str: 'SUB_NAVIGATION_ITEM_PHONE_NUMBERS', icon: undefined, id: 'phone-numbers', auth: [1,2,3], hide: false, submenu: []});
		phone_submenu.push({ route: "authenticated.phone.ring-schedule", str: 'SUB_NAVIGATION_ITEM_RINGING_SCHEDULE', icon: undefined, id: 'ring-schedule', auth: [1,2,3], hide: false, submenu: []});
		phone_submenu.push({ route: "authenticated.phone.blocking", str: 'PAGE_NUMBER_BLOCKING', icon: undefined, id: 'blocking', auth: [1,2,3], hide: false, submenu: []});

		var m = [];
      if ((p.modelType ==  'FG4278Av2') || (p.modelType ==  'FG4278Av2_VD') ){
		m.push({ route: "authenticated.dashboard", str: 'NAVIGATION_ITEM_OVERVIEW', icon: 'icon-overview', id: 'overview', auth: [1,2,3], hide: false, submenu: []});

		

		/* if (this.currentUser.uiMode === 'Expert'){
			m.push({ route: "authenticated.phone.phone", str: 'NAVIGATION_ITEM_PHONE', icon: 'icon-phone', id: 'phone', auth: [1,2,3], hide: !(p.voipEnable == 1), submenu: phone_submenu});	
		}
		else {
			m.push({ route: "authenticated.phone.calllog", str: 'NAVIGATION_ITEM_PHONE', icon: 'icon-phone', id: 'calllog', auth: [1,2,3], hide: !(p.voipEnable == 1), submenu: phone_submenu});
		} */
		m.push({ route: "authenticated.phone.calllog", str: 'NAVIGATION_ITEM_PHONE', icon: 'icon-phone', id: 'calllog', auth: [1,2,3], hide: !(p.voipEnable == 1), submenu: phone_submenu});	

	    m.push({ route: "authenticated.internet.firewall", str: 'NAVIGATION_ITEM_INTERNET', icon: 'icon-internet', id: 'security', auth: [1,2,3], hide: false, submenu: [
			{ route: "authenticated.internet.firewall", str: 'SUB_NAVIGATION_ITEM_FIREWALL', icon: undefined, id: 'firewall', auth: [1,2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.port-mapping", str: 'PAGE_PORT_MAPPING_TITLE', icon: undefined, id: 'port-mapping', auth: [2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.dmz", str: 'SUB_NAVIGATION_ITEM_EXPOSED_HOST', icon: undefined, id: 'dmz', auth: [2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.upnp", str: 'SUB_NAVIGATION_ITEM_UPNP', icon: undefined, id: 'upnp', auth: [2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.ddns", str: 'SUB_NAVIGATION_ITEM_DDNS', icon: undefined, id: 'ddns', auth: [2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.dns", str: 'SUB_NAVIGATION_ITEM_DNS', icon: undefined, id: 'dns', auth: [2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.parental", str: 'SUB_NAVIGATION_ITEM_PARENTAL_CONTROL', icon: undefined, id: 'parental', auth: [2,3], hide: false, submenu: []}, 

		]});
		m.push({ route:  "authenticated.wifi.general2", str: 'NAVIGATION_ITEM_WIFI', icon: 'icon-wifi', id: 'wifi', auth: [1,2,3], hide: false, submenu: [
				{ route: "authenticated.wifi.general2", str: 'SUB_NAVIGATION_ITEM_GENERAL', icon: undefined, id: 'general2', auth: [1,2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.wifi.easymesh2", str: 'SUB_NAVIGATION_ITEM_EASY_MESH', icon: undefined, id: 'easymesh', auth: [2,3], hide: false, submenu: []},
				{ route: "authenticated.wifi.data-elements", str: 'SUB_NAVIGATION_ITEM_MESH_TOPOLOGY', icon: undefined, id: 'data-elements', auth: [2,3], hide: false, submenu: []},
				{ route: "authenticated.wifi.macfilter", str: 'SUB_NAVIGATION_ITEM_MAC_FILTER', icon: undefined, id: 'mac-filter', auth: [2,3], hide: false, submenu: []},
				{ route: "authenticated.wifi.settings", str: 'SUB_NAVIGATION_ITEM_SETTINGS', icon: undefined, id: 'settings', auth: [2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.wifi.schedule", str: 'PAGE_SCHEDULE_TITLE', icon: undefined, id: 'schedule', auth: [1,2,3], hide: false, submenu: []}, 	
		]});
		//
		m.push({ route: "authenticated.settings.lan", str: 'NAVIGATION_ITEM_SETTINGS', icon: 'icon-settings', id: 'network', auth: [2,3], hide: false, submenu: [
			{ route: "authenticated.settings.lan", str: 'SUB_NAVIGATION_ITEM_IPV4', icon: undefined, id: 'lan', auth: [2,3], hide: false, submenu: []}, 
			//{ route: "authenticated.settings.wan", str: 'SUB_NAVIGATION_ITEM_WAN', icon: undefined, id: 'wan', auth: [2,3], hide: false, submenu: []}, 
			{ route: "authenticated.settings.open-modem", str: 'SUB_NAVIGATION_ITEM_GENERIC_MODEM', icon: undefined, id: 'open-modem', auth: [1,2,3], hide: false, submenu: [
				{ route: "authenticated.settings.internet-time", str: 'SUB_NAVIGATION_ITEM_INTERNET_TIME', icon: undefined, id: 'internet-time', auth: [1,2,3], hide: !this.currentUser.openModemEnable, submenu: []}, 
				{ route: "authenticated.settings.wan", str: 'SUB_NAVIGATION_ITEM_WAN', icon: undefined, id: 'wan', auth: [1,2,3], hide: !this.currentUser.openModemEnable, submenu: []}, 
				{ route: "authenticated.phone.phone", str: 'PAGE_PHONE_SETTINGS_TITLE', icon: 'icon-phone', id: 'phone', auth: [1,2,3], hide: !this.currentUser.openModemEnable, submenu: []},
				{ route: "authenticated.phone.phoneadv", str: 'SUB_NAVIGATION_ITEM_PHONEADV', icon: undefined, id: 'phoneadv', auth: [2,3], hide: false, submenu: []}, 
					
			]}, 
			//{ route: "authenticated.settings.internet-time", str: 'SUB_NAVIGATION_ITEM_INTERNET_TIME', icon: undefined, id: 'internet-time', auth: [2,3], hide: false, submenu: []}, 
			{ route: "authenticated.settings.gpon", str: 'SUB_NAVIGATION_ITEM_GPON', icon: undefined, id: 'gpon', auth: [2,3], hide: !((p.xponData > 0) ? true : false), submenu: []},
			{ route: "authenticated.settings.lanswitch", str: 'PAGE_LAN_SWITCH', icon: undefined, id: 'lanswitch', auth: [2,3], hide: false, submenu: []},
			{ route: "authenticated.settings.eco-mode", str: 'SUB_NAVIGATION_ITEM_ECO_MODE', icon: undefined, id: 'eco-mode', auth: [2,3], hide: false, submenu: []},
		]});
		m.push({ route: "authenticated.status-and-support.status", str: 'NAVIGATION_ITEM_STATUS_AND_SUPPORT', icon: 'icon-support', id: 'status-and-support', auth: [1,2,3], hide: false, submenu: [
				{ route: "authenticated.status-and-support.status", str: 'SUB_NAVIGATION_ITEM_STATUS', icon: undefined, id: 'status', auth: [1,2,3], hide: false, submenu: [
					{ route: "authenticated.status-and-support.wan-status", str: 'SUB_SUB_NAVIGATION_ITEM_WAN_STATUS', icon: undefined, id: 'wan-status', auth: [1,2,3], hide: false, submenu: []}, 	
					{ route: "authenticated.status-and-support.lan-status", str: 'SUB_SUB_NAVIGATION_ITEM_LAN_STATUS', icon: undefined, id: 'lan-status', auth: [1,2,3], hide: false, submenu: []}, 	
					{ route: "authenticated.status-and-support.wlan-status", str: 'SUB_SUB_NAVIGATION_ITEM_WLAN_STATUS', icon: undefined, id: 'wlan-status', auth: [1,2,3], hide: false, submenu: []},
					{ route: "authenticated.status-and-support.voice-status", str: 'SUB_SUB_NAVIGATION_ITEM_VOICE_STATUS', icon: undefined, id: 'voice-status', auth: [1,2,3], hide: (p.voipEnable != 1), submenu: []}, 	
					{ route: "authenticated.status-and-support.gpon-status", str: 'PAGE_DIAGNOSTIC_UTILITY_POPUP_DIAGNOSIS_GPON_STATUS', icon: undefined, id: 'gpon-status', auth: [1,2,3], hide: false, submenu: []}, 	
					{ route: "authenticated.status-and-support.optical-status", str: 'PAGE_OPTICAL_STATUS_TITLE', icon: undefined, id: 'optical-status', auth: [2,3], hide: false, submenu: []}, // peter 10/13 '25 f/s saxon request	
			
				]}, 	
				{ route: "authenticated.status-and-support.diagnostic-utility", str: 'SUB_NAVIGATION_ITEM_DIAGNOSTIC_UTILITY', icon: undefined, id: 'diagnostic-utility', auth: [1,2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.status-and-support.routing", str: 'PAGE_ROUTING_TITLE', icon: undefined, id: 'routing', auth: [1,2,3], hide: false, submenu: []},
				{ route: "authenticated.status-and-support.eventlog", str: 'SUB_NAVIGATION_ITEM_EVENT_LOG', icon: undefined, id: 'event-log', auth: [2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.status-and-support.restart", str: 'SUB_NAVIGATION_ITEM_RESTART', icon: undefined, id: 'restart', auth: [1,2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.status-and-support.config", str: 'SUB_NAVIGATION_ITEM_BACKUP_RESTORE', icon: undefined, id: 'config', auth: [2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.status-and-support.upgrade", str: 'SUB_NAVIGATION_ITEM_FIRMWARE_UPDATE', icon: undefined, id: 'firmware-update', auth: [2, 3], hide: p.upgradesManaged ? true : false, submenu: []},
				{ route: "authenticated.status-and-support.about", str: 'SUB_NAVIGATION_ITEM_ABOUT', icon: undefined, id: 'about', auth: [1,2,3], hide: false, submenu: []}, 	
	
		]});
        
      }else{ // Neutral, FG4278Bv3 ...
		m.push({ route: "authenticated.dashboard", str: 'NAVIGATION_ITEM_OVERVIEW', icon: 'icon-overview', id: 'overview', auth: [1,2,3], hide: false, submenu: []});
        m.push({ route: "authenticated.phone.phone2", str: 'NAVIGATION_ITEM_PHONE2', icon: 'icon-phone', id: 'phone', auth: [1,2,3], hide: !((p.voipEnable == 1) ? ((p.modelType ==  'FG4278Bv3') ?  true : false) : false), submenu: []});
        m.push({ route: "authenticated.phone.phone", str: 'NAVIGATION_ITEM_PHONE', icon: 'icon-phone', id: 'phone', auth: [1,2,3], hide: !((p.voipEnable == 1) ? ((p.modelType ==  'FG4278Bv3') ?  false : true) : false), submenu: []});
	    m.push({ route: "authenticated.internet.firewall", str: 'NAVIGATION_ITEM_INTERNET', icon: 'icon-internet', id: 'security', auth: [1,2,3], hide: false, submenu: [
			{ route: "authenticated.internet.firewall", str: 'SUB_NAVIGATION_ITEM_FIREWALL', icon: undefined, id: 'firewall', auth: [1,2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.port-mapping", str: 'PAGE_PORT_MAPPING_TITLE', icon: undefined, id: 'port-mapping', auth: [1,2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.dmz", str: 'SUB_NAVIGATION_ITEM_EXPOSED_HOST', icon: undefined, id: 'dmz', auth: [1,2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.upnp", str: 'SUB_NAVIGATION_ITEM_UPNP', icon: undefined, id: 'upnp', auth: [1,2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.ddns", str: 'SUB_NAVIGATION_ITEM_DDNS', icon: undefined, id: 'ddns', auth: [1,2,3], hide: false, submenu: []}, 
			{ route: "authenticated.internet.parental", str: 'SUB_NAVIGATION_ITEM_PARENTAL_CONTROL', icon: undefined, id: 'parental', auth: [1,2,3], hide: false, submenu: []}, 

		]});
		m.push({ route: "authenticated.wifi.general", str: 'NAVIGATION_ITEM_WIFI', icon: 'icon-wifi', id: 'wifi', auth: [1,2,3], hide: false, submenu: [
				{ route: "authenticated.wifi.general", str: 'SUB_NAVIGATION_ITEM_GENERAL', icon: undefined, id: 'general', auth: [1,2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.wifi.easymesh", str: 'SUB_NAVIGATION_ITEM_EASY_MESH', icon: undefined, id: 'easymesh', auth: [1,2,3], hide: false, submenu: []},
				{ route: "authenticated.wifi.data-elements", str: 'SUB_NAVIGATION_ITEM_MESH_TOPOLOGY', icon: undefined, id: 'data-elements', auth: [1,2,3], hide: false, submenu: []},
				{ route: "authenticated.wifi.wps", str: 'SUB_NAVIGATION_ITEM_WPS', icon: undefined, id: 'wps', auth: [1,2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.wifi.macfilter", str: 'SUB_NAVIGATION_ITEM_MAC_FILTER', icon: undefined, id: 'mac-filter', auth: [1,2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.wifi.settings", str: 'SUB_NAVIGATION_ITEM_SETTINGS', icon: undefined, id: 'settings', auth: [1,2,3], hide: false, submenu: []},
				{ route: "authenticated.wifi.schedule", str: 'PAGE_SCHEDULE_TITLE', icon: undefined, id: 'schedule', auth: [1,2,3], hide: false, submenu: []}, 	
		]});
		m.push({ route: "authenticated.status-and-support.lcm", str: 'NAVIGATION_ITEM_LCM', icon: 'icon-overview', id: 'lcm', auth: [1,2,3], hide: ((p.modelType ==  'FG4278Bv3') ?  true : false), submenu: []});
		m.push({ route: "authenticated.settings.password", str: 'NAVIGATION_ITEM_SETTINGS', icon: 'icon-settings', id: 'network', auth: [1,2,3], hide: false, submenu: [
			{ route: "authenticated.settings.password", str: 'SUB_NAVIGATION_ITEM_PASSWORD', icon: undefined, id: 'password', auth: [1,2,3], hide: false, submenu: []}, 
			{ route: "authenticated.settings.lan", str: 'SUB_NAVIGATION_ITEM_IPV4', icon: undefined, id: 'lan', auth: [1,2,3], hide: false, submenu: []}, 
			{ route: "authenticated.settings.wan-autosensing", str: 'PAGE_SETTINGS_WAN_AUTOSENSING_TITLE', icon: undefined, id: 'wan-autosensing', auth: [1,2,3], hide: ((p.modelType ==  'FG4278Bv3') ?  true : false), submenu: []},
			{ route: "authenticated.settings.wan", str: 'SUB_NAVIGATION_ITEM_WAN', icon: undefined, id: 'wan', auth: [1,2,3], hide: false, submenu: []}, 
			{ route: "authenticated.settings.internet-time", str: 'SUB_NAVIGATION_ITEM_INTERNET_TIME', icon: undefined, id: 'internet-time', auth: [1,2,3], hide: false, submenu: []}, 
			{ route: "authenticated.settings.gpon", str: 'SUB_NAVIGATION_ITEM_GPON', icon: undefined, id: 'gpon', auth: [1,2,3], hide: !((p.xponData > 0 && (p.wanMode.includes('GPON') && (p.wanOperationMode !== 'Automatic'))) ? true : false), submenu: []},
		]});
		m.push({ route: "authenticated.status-and-support.status", str: 'NAVIGATION_ITEM_STATUS_AND_SUPPORT', icon: 'icon-support', id: 'status-and-support', auth: [1,2,3], hide: false, submenu: [
				{ route: "authenticated.status-and-support.status", str: 'SUB_NAVIGATION_ITEM_STATUS', icon: undefined, id: 'status', auth: [1,2,3], hide: false, submenu: [
					{ route: "authenticated.status-and-support.wan-status", str: 'SUB_SUB_NAVIGATION_ITEM_WAN_STATUS', icon: undefined, id: 'wan-status', auth: [1,2,3], hide: false, submenu: []}, 	
					{ route: "authenticated.status-and-support.lan-status", str: 'SUB_SUB_NAVIGATION_ITEM_LAN_STATUS', icon: undefined, id: 'lan-status', auth: [1,2,3], hide: false, submenu: []}, 	
					{ route: "authenticated.status-and-support.wlan-status", str: 'SUB_SUB_NAVIGATION_ITEM_WLAN_STATUS', icon: undefined, id: 'wlan-status', auth: [1,2,3], hide: false, submenu: []}, 		 	
					{ route: "authenticated.status-and-support.voice-status", str: 'SUB_SUB_NAVIGATION_ITEM_VOICE_STATUS', icon: undefined, id: 'voice-status', auth: [1,2,3], hide: (p.voipEnable != 1), submenu: []}, 	
					{ route: "authenticated.status-and-support.gpon-status", str: 'PAGE_DIAGNOSTIC_UTILITY_POPUP_DIAGNOSIS_GPON_STATUS', icon: undefined, id: 'gpon-status', auth: [3], hide: !(p.wanMode.includes('GPON') && (p.wanOperationMode !== 'Automatic')), submenu: []},
					{ route: "authenticated.status-and-support.optical-status", str: 'PAGE_OPTICAL_STATUS_TITLE', icon: undefined, id: 'optical-status', auth: [3], hide: false, submenu: []},
				]},
				{ route: "authenticated.status-and-support.diagnostic-utility", str: 'SUB_NAVIGATION_ITEM_DIAGNOSTIC_UTILITY', icon: undefined, id: 'diagnostic-utility', auth: [1,2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.status-and-support.routing", str: 'PAGE_ROUTING_TITLE', icon: undefined, id: 'routing', auth: [1,2,3], hide: false, submenu: []},
				{ route: "authenticated.status-and-support.eventlog", str: 'SUB_NAVIGATION_ITEM_EVENT_LOG', icon: undefined, id: 'event-log', auth: [1,2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.status-and-support.restart", str: 'SUB_NAVIGATION_ITEM_RESTART', icon: undefined, id: 'restart', auth: [1,2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.status-and-support.config", str: 'SUB_NAVIGATION_ITEM_BACKUP_RESTORE', icon: undefined, id: 'config', auth: [1,2,3], hide: false, submenu: []}, 	
				{ route: "authenticated.status-and-support.upgrade", str: 'SUB_NAVIGATION_ITEM_FIRMWARE_UPDATE', icon: undefined, id: 'firmware-update', auth: [1,2,3], hide: p.upgradesManaged ? true : false, submenu: []},
				{ route: "authenticated.status-and-support.about", str: 'SUB_NAVIGATION_ITEM_ABOUT', icon: undefined, id: 'about', auth: [1,2,3], hide: false, submenu: []}, 	
				// { route: "authenticated.status-and-support.lcm", str: 'SUB_NAVIGATION_ITEM_LCM', icon: undefined, id: 'lcm', auth: [1,2,3], hide: ((p.modelType ==  'FG4278Bv3') ?  true : false), submenu: []}, 	
	
		]});


      }
		return m;		
    }
}

