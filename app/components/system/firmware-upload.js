import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SystemFirmwareUploadComponent extends Component {
  @tracked fwUpdateModalOpen = false;
  @service session;
  @service api;
  @tracked uploaded     = false;
  @tracked firmwareFile = '';
  @tracked modalIsOpen  = true;
  @tracked errorCode    = 0;

  @action
  validateFile(file) {
    debugger;
    return true;
  }

  @action
  async uploadFile(file) {
    // a filename is required to call the upload api !!!
    let url = '/upload/' + file.name;

    try {
      let options = {
        data: {
          file: file.file,
        },
        headers: {
          Authorization: 'bearer ' + this.session.data.authenticated.sessionID,
        },
      };
      if (sessionStorage.getItem('csrf_token')) {
          options.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf_token');
      }

      const response = await file.uploadBinary(url, options);

      if(response.status === 202) {
        this.uploaded = true;
        this.firmwareFile = file.name;
      }

    } catch (error) {
      console.error('upload aborted',error);
      file.state = 'aborted';
    }
  }

  @action
  async upgrade() {
    let url = '/commands';

    let response = await this.api.customFetch(url, {
      method: "post",
      body: JSON.stringify({
        command: "Device.DeviceInfo.FirmwareImage.[Alias=='active'].Download()",
        commandKey: "",
        sendresp: true,
        inputArgs: {
          URL: "file:///tmp/upload/" + this.firmwareFile,
          AutoActivate: true
        }
        //parameters: { URL: 'file:///tmp/upload/' + this.firmwareFile, AutoActivate: 1 } 
      }),
    });

    let result = await response.json(); 
    if(result[0].failure.errcode ) {
      this.errorCode = result[0].failure.errcode;
    } else {
      this.modalIsOpen = false;
    }
  }

  @action
  proceedFWUpdate() {
    this.fwUpdateModalOpen = true;
    this.modalIsOpen = false;
  }
}
