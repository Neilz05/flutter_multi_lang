import Service from '@ember/service';
import { inject as service } from "@ember/service";

export default class EaaCtrlService extends Service {
  @service intl;

  warningController = null;
  targetController = null;

  setEaaWarningController(controllerInstance) {
    this.warningController = controllerInstance;
  }

  setEaaTargetController(controllerInstance) {
    this.targetController = controllerInstance;
  }
  //warning polite
  setEaaWarningPolite(message) {
    //console.log('Setting EAA Warning (polite):', message);
    if (this.warningController && typeof this.warningController.setEaaWarningPolite === 'function') {
      this.warningController.setEaaWarningPolite(message);
    } else {
      console.log('Controller setEaaWarningPolite action not found!');
    }
  }
  //warning assertive
  setEaaWarningAssertive(message) {
    //console.log('Setting EAA Warning (assertive):', message);
    if (this.warningController && typeof this.warningController.setEaaWarningAssertive === 'function') {
      this.warningController.setEaaWarningAssertive(message);
    } else {
      console.log('Controller setEaaWarningAssertive action not found!');
    }
  }

  getRandomString(length = 8) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
  }

  onoffTrigger = (event) => {
    //console.log('OnOff Triggered:', event);
    if(event.key == "Enter"){
      if(document.getElementById(event.target.getAttribute('for'))){
        let label = event.target.getAttribute('aria-label') || 'Switch';
        document.getElementById(event.target.getAttribute('for')).click();
        console.log('OnOff Triggered:', label + (document.getElementById(event.target.getAttribute('for')).checked ? ' '+this.intl.t('MESSAGES_ACTIVE') : ' '+this.intl.t('MESSAGES_INACTIVE')));
        this.warningController.setEaaWarningPolite(label + (document.getElementById(event.target.getAttribute('for')).checked ? ' '+this.intl.t('MESSAGES_ACTIVE') : ' '+this.intl.t('MESSAGES_INACTIVE')));
      }
    }
  }

  checkboxTrigger = (event) => {
    //console.log('Checkbox Triggered:', event);
    if(event.key == "Enter"){
      document.getElementById(event.target.getAttribute('id')).click();
      let label = event.target.getAttribute('aria-label') || 'Checkbox';
      console.log('Checkbox State:', label + (document.getElementById(event.target.getAttribute('id')).checked ? ' '+this.intl.t("MESSAGES_CHECKED") : ' '+this.intl.t("MESSAGES_UNCHECKED")));
      this.warningController.setEaaWarningPolite(label + (document.getElementById(event.target.getAttribute('id')).checked ? ' '+this.intl.t("MESSAGES_CHECKED") : ' '+this.intl.t("MESSAGES_UNCHECKED")));
    }
  }

  radioTrigger = (event) => {
    //console.log('Radio Triggered:', event);
    if(event.key == "Enter"){
      if(document.getElementById(event.target.getAttribute('for'))){
        document.getElementById(event.target.getAttribute('for')).click();
        let label = event.target.getAttribute('aria-label') || 'Radio button';
        console.log('Radio Button Selected:', label + ' '+this.intl.t("MESSAGES_SELECTED"));
        this.warningController.setEaaWarningPolite(label + ' '+this.intl.t("MESSAGES_SELECTED"));
      }
    }
  }

  eyeControlTrigger = (event) => {
    //console.log('Eye Control Triggered:', event);
    if(event.key == "Enter"){
      document.getElementById(event.target.getAttribute('id')).click();
      let label = event.target.getAttribute('aria-label') || 'Eye control';
      console.log('Eye Control Triggered:', label + ' '+this.intl.t("MESSAGES_ACTIVATED"));
      this.warningController.setEaaWarningPolite(label + ' '+this.intl.t("MESSAGES_ACTIVATED"));
      setTimeout(() => {
        document.getElementById(event.target.getAttribute('id')).focus();
      }, 50);
    }
  }

  btnTrigger = (event) => {
    //console.log('Button Triggered:', event);
    if(event.key == "Enter"){
      event.target.click();
      let label = event.target.getAttribute('aria-label') || 'Button';
      console.log('Button Triggered:', label + ' '+this.intl.t("MESSAGES_CLICKED"));
      this.warningController.setEaaWarningPolite(label + ' '+this.intl.t("MESSAGES_CLICKED"));
    }
  }

  btnApply = (event) => {
    if(event.key == "Enter"){
      console.log('btnApply:', this.intl.t('MESSAGES_APPLY_CHANGES'));
      this.warningController.setEaaWarningPolite(this.intl.t('MESSAGES_APPLY_CHANGES'));
    }
  }

  btnCancel = (event) => {
    if(event.key == "Enter"){
      console.log('btnCancel:', this.intl.t('MESSAGES_CANCEL_CHANGES'));
      this.warningController.setEaaWarningPolite(this.intl.t('MESSAGES_CANCEL_CHANGES'));
    }
  }

  btnClick = (event) => {
    if(event.key == "Enter"){
      let label = event.target.getAttribute('aria-label') || 'Button';
      console.log('Button Clicked:', label + ' '+this.intl.t("MESSAGES_CLICKED"));
      this.warningController.setEaaWarningPolite(label + ' '+this.intl.t("MESSAGES_CLICKED"));
    }
  }

}
