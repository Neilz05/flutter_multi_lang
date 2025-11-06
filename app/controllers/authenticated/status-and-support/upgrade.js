import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UpgradeController extends Controller {
  @service session;
  @service intl;
  @service api;
  @service eaactrl;

  @tracked uploaded = false;
  @tracked firmwareFile = '';
  @tracked errorCode = 0;
  @tracked modalIsOpen = true;
  @tracked loading = false;
  @tracked fileInput = null;
  @tracked success = false;
  @tracked uploadInfo = this.intl.t('PAGE_FIRMWARE_UPDATE_MANUAL_FIRMWARE_UPDATE_NO_FILE');
  @tracked statusClass = "text-muted";

    constructor() {
        super(...arguments);
        this.eaactrl.setEaaTargetController(this);
        this.eaactrl.setEaaWarningController(this);
    }
  	// Methods required by EaaCtrlService
  	setEaaWarningPolite(message) {
    	this.uploadInfo = message;
    	this.statusClass = "text-info";
  	}

  	setEaaWarningAssertive(message) {
    	this.uploadInfo = message;
    	this.statusClass = "text-danger";
  	}
  
  sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
  }

  @action
  async handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      this.loading = true;
      await this.uploadFile(file);
      this.loading = false;
    }
  }

  @action
  async uploadFile(file) {

     if(this.getExtension (file.name) != 'bin' && this.getExtension(file.name) != 'img') {
        this.uploadInfo = this.intl.t('PAGE_FIRMWARE_UPDATE_MANUAL_FIRMWARE_UPDATE_NOT_VALID_UPDATE');
        this.statusClass = "text-danger";
      	this.setEaaWarningAssertive(this.intl.t('PAGE_FIRMWARE_UPDATE_MANUAL_FIRMWARE_UPDATE_NOT_VALID_UPDATE'));
        return this.uploadInfo;
    }
    this.uploadInfo = file.name;
    this.statusClass = "text-success";

    let url = '/upload/' + file.name;
    try {
      let formData = new FormData();
      formData.append('file', file);

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'bearer ' + this.session.data.authenticated.sessionID,
          "X-CSRF-Token": sessionStorage.getItem('csrf_token') || ''
        },
        body: formData,
      });

      if (response.status === 202) {
        this.uploaded = true;
        this.firmwareFile = file.name;
      }
    } catch (error) {
      this.errorCode = -1;
    }
  }

  @action
  async upgrade() {
    if (!this.firmwareFile) {
      alert('Please upload a firmware file first');
      return;
    }
    this.loading = true;
    this.success = false;
    let url = '/commands';

    let cause;
    if (this.session.data.authenticated.username === 'remote') cause = 'RemoteReboot';
    else cause = 'LocalReboot';

    let response = await this.api.customFetch(url, {
      method: "POST",
      body: JSON.stringify({
        command: "Device.DeviceInfo.FirmwareImage.[Alias=='active'].Download()",
        commandKey: "",
        sendresp: true,
        inputArgs: {
          Cause: cause,
          Reason: 'WebGUIFirmwareUpgrade',
          URL: "file:///tmp/upload/" + this.firmwareFile,
          AutoActivate: true
        }
      }),
    });

    let result = await response.json();
    if (result[0].failure.errcode) {
      this.errorCode = result[0].failure.errcode;
      this.success = false;
      this.loading = false;
      this.firmwareFile = '';
      if (this.fileInput) {
        this.fileInput.value = '';
      }
    } else {
      this.modalIsOpen = false;
      //this.success = true;
      //this.loading = false;
      this.firmwareFile = '';
      if (this.fileInput) {
        this.fileInput.value = '';
      }
      await this.sleep(60000); // reload window 60s after firmware update start
      window.location.reload();
    }
  }
  @action
  clearFile() {
    this.uploadInfo = this.intl.t('PAGE_FIRMWARE_UPDATE_MANUAL_FIRMWARE_UPDATE_NO_FILE');
    this.statusClass = "text-muted";
    this.setEaaWarningPolite(this.intl.t('PAGE_FIRMWARE_UPDATE_MANUAL_FIRMWARE_UPDATE_NO_FILE'));
    this.firmwareFile = '';
    if (this.fileInput) {
      this.fileInput.value = '';
    }
  }

  getExtension(filename) {
      if (!filename) return '';
      const lastDot = filename.lastIndexOf('.');
      return lastDot === -1 ? '' : filename.slice(lastDot + 1).toLowerCase();
  }
  @action
    clickUploadInput() {
      const input = document.getElementById('firmwareInput');
      if(input) {
        input.click();
      }
    }
}