import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'prpl-webui/config/environment';

export default class AuthenticatedController extends Controller {
    @service session;
    @service status;
    @service intl
    @service store
    @service menuctrl; 
    @service currentUser; 
    @service router;
	
    @tracked softwareVersion;
    @tracked SerialNumber;
    @tracked menu = [];
    @tracked isMobile = window.innerWidth <= 992;
    
    init() {
        super.init(...arguments);
        this.status.one('deviceInfo.SoftwareVersion-Added', () => {
            let data = this.status.getData('deviceInfo.SoftwareVersion');
            this.set('softwareVersion', data[0]);
        });

        this.modelType = config.APP.modelType || 'Neutral';
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }
    willDestroy() {
        super.willDestroy(...arguments);
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize() {
        this.isMobile = window.innerWidth <= 992;
    }
	  isActiveMenuItemSetted = false;
    updateMenu(){

        this.menu = this.menuctrl.getMenuTable({
            voipEnable: this.model.voip.Enable,
            upgradesManaged: this.model.managementserver.UpgradesManaged,
            xponData: this.model.xpon?.ONUNumberOfEntries ? this.model.xpon.ONUNumberOfEntries : 0,
            wanMode: this.model.wanmanager.WANMode,
            wanOperationMode: this.model.wanmanager.OperationMode,
            modelType: this.modelType
        });

        this.router.on('routeDidChange', () => {
            if (!this.isActiveMenuItemSetted){
                this.isActiveMenuItemSetted = true;
                this.handleInitalMenuActive();
            }
        });

    }
	
    handleInitalMenuActive(){
		
        const route =  this.router.currentRouteName;
        var selectedTopMenuId = '', selectedSubMenuId = '', selectedSubsubMenuId = '';
        var selectedTopMenuPageHeader;
        var found = false;
        this.menu.forEach(function (topMenuItem, topMenuIndex) {
          if (!found){
            if (topMenuItem.route == route) { 
              selectedTopMenuId = topMenuItem.id;
              selectedTopMenuPageHeader = topMenuItem.str;              
              found = true;
            }			
            topMenuItem.submenu.forEach(function (subMenuItem, subMenuIndex) {
              if (subMenuItem.route == route) { 
                selectedSubMenuId = subMenuItem.id;
                selectedTopMenuId = topMenuItem.id;
                selectedTopMenuPageHeader = topMenuItem.str;
                found = true;
              }
              subMenuItem.submenu.forEach(function (subsubMenuItem, subsubMenuIndex) {
                if (subsubMenuItem.route == route) { 
                  selectedSubsubMenuId = subsubMenuItem.id;
                  selectedSubMenuId = subMenuItem.id;
                  selectedTopMenuId = topMenuItem.id;
                  selectedTopMenuPageHeader = topMenuItem.str;
                  found = true;
                }					
              });
            });
          }
        });
		
        if (found){
          this.activeTopMenu = selectedTopMenuId;
          this.activeSubMenu = selectedSubMenuId;
          this.activeSubsubMenu = selectedSubsubMenuId;
          
          this.pageHeader = selectedTopMenuPageHeader;

        }else {
          this.activeTopMenu = '';
          this.activeSubMenu = '';
          this.activeSubsubMenu = '';
          
          this.pageHeader = '';
        }
    }
    @action
    isMenuItemShow(menuobj) {
        return this.menuctrl.isMenuItemShow(menuobj);
    }

    get isSuperAdminUser(){
        return this.currentUser.isSuperAdmin();
    }
    get isEndUser(){
        return this.currentUser.isEndUser();
    }
    get uiMode(){
        return this.currentUser.uiMode;
    }

    menuCheck(selectedUiMode, menu){
      let ret = false;
      let tab = localStorage.getItem('tab');
      //console.log('tab:', tab);
      menu.forEach(item => {
          if (this.isMenuItemShow(item)) {
            ret = (item.route === tab) || ret;
            if (item.submenu.length > 0) {
              ret = this.menuCheck(selectedUiMode, item.submenu) || ret;
            }
            //console.log('tab:', tab);
            //console.log('item.route:', item.route);
          }
      });
      return ret;
    }

    @action
    async UpdateUiMode(event) {
        var newUiMode = event.target.value;
        this.store.queryRecord('users-user', { path: `Users.User.[Username=="${this.session.data.authenticated.username}"].` })
            .then((record) => {
                record['X_PRPL-COM_WUIMode'] = newUiMode
                record.save().then(
                  (result) => {
                    console.log('Save result:', result);
                    let menuCheckResult = this.menuCheck(event.target.value, this.menu);
                    console.log('menuCheckResult:', menuCheckResult);
                    if (!menuCheckResult){
                      this.router.transitionTo('authenticated.dashboard');
                      localStorage.setItem('tab', 'authenticated.dashboard');
                      this.activeTopMenu = 'overview';
                      this.pageHeader = 'NAVIGATION_ITEM_OVERVIEW';
                    }
                  },
                  (error) => {
                    console.error('Save error:', error);
                  }
                );
             })
        this.currentUser.uiMode = newUiMode;

    }

    @action
    invalidateSession() {
        this.session.invalidate();
    }
    @action
    updateSettingsPw() {
        this.model.ONU.forEach((onu) => {
            onu.ANI.forEach((ani) => {
                ani.TC.get('Authentication').then((auth) => {
                    auth.save();
                });
            });
        });
    }
    @action
    updateRadio() {
        this.model.Radio.forEach((radio) => {
            radio.get('Channel').then((channel) => {
                channel.save();
            });
        });
    }

    @tracked pageHeader = '';
	
    @tracked activeTopMenu;
    @tracked activeTopMenuRoute;
    @action
    setActiveTopMenu(menu) {
        this.activeTopMenu = menu.id;
        this.activeTopMenuRoute = menu.route;

        this.pageHeader = menu.str;
		
        if (menu.submenu.length > 0){
          var submenu_init = menu.submenu.find(function(current){ return (current.route == menu.route);});
          this.setActiveSubmenu(submenu_init);
        }
    }
    @tracked activeSubMenu = "";
    @action
    setActiveSubmenu(sub) {
        if (sub == undefined){
          this.activeSubMenu = '';
        }else{
          this.activeSubMenu = sub.id;
          if (sub.submenu.length > 0){
            var subsub_init = sub.submenu.find(function(current){ return (current.route == sub.route);});
            if (subsub_init == undefined){
              this.setActiveSubsubMenu('');
            }else{
              this.setActiveSubsubMenu(subsub_init.id);
            }
          }
        }
    }
    @tracked activeSubsubMenu = "";
    @action
    setActiveSubsubMenu(subsub) {
        this.activeSubsubMenu = subsub.id;
    }


    @action
    async UpdateLanguage(value) {
        //const credentials = JSON.parse(sessionStorage.getItem('credentials'))
        this.store.queryRecord('users-user', { path: `Users.User.[Username=="${this.session.data.authenticated.username}"].` })
        .then((record) => {
            record.Language = value
            record.save() 
                .then(() => {
                    //console.log('setting in ba-cli done')
                })
        })
        this.intl.setLocale([value])
        sessionStorage.setItem('selectedLocale', value)
    }


    get lang_locale() {
        return sessionStorage.getItem('selectedLocale') || 'en-us';
    }
}


