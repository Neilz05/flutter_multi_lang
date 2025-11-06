import Component from '@glimmer/component';
import { get, set } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { match } from '@ember/object/computed';
import { sendEvent } from '@ember/object/events';

export default class SupportConfigComponent extends Component {
    @service session;
    @service store;
    @service intl;
    @service api;
    @service eaactrl;
    @service currentUser;

    constructor() {
        super(...arguments);
        this.eaactrl.setEaaTargetController(this);
    }

    @tracked passwordFailed = false;
    @tracked passwordHasForbidden = false;
    @tracked passwordConfirmHasForbidden = false;
    @tracked modalIsOpen = false;
    @tracked modalUploadIsOpen = false;
    @tracked modalResetIsOpen = false;
    @tracked modalResetProgressIsOpen = false;
    @tracked modalSoftResetIsOpen = false;
    @tracked modalSoftResetProgressIsOpen = false;
    @tracked modalUploadDoneIsOpen = false;
    @tracked modalUploadInProgressIsOpen = false;
    @tracked username = '';
    @tracked password = '';
    @tracked confirmPassword = '';
    @tracked uploadPassword = '';
    @tracked strength = 0;
    @tracked width = 1 / 6 * 100;
    @tracked filename;
    @tracked configfile;
    @tracked configfileError = false;
    @tracked backuppath = '';
    @tracked biggerIndex = 0;
    
    get barStyle() {
        return htmlSafe(`width: ${this.width}%;`);
    }

    checkPasswordStrength(event) {
        let password = event.target.value;
        let strengthIndicator = document.getElementById("strength-indicator");
        let pswdStrength = document.getElementById("password-strength");
        let strength = 0;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (password.length < 8) {
          strengthIndicator.textContent = this.intl.t('PAGE_CONFIG_RESTORE_MODAL_PASSWORD_VERY_WEAK');
          strengthIndicator.className = "weak";
          pswdStrength.className = "strength0";

        } else if (strength >= 3) {
          strengthIndicator.textContent = this.intl.t('PAGE_CONFIG_RESTORE_MODAL_PASSWORD_STRONG');
          strengthIndicator.className = "strong";
          pswdStrength.className = "strength2"
        } else if (strength === 2) {
          strengthIndicator.textContent = this.intl.t('PAGE_CONFIG_RESTORE_MODAL_PASSWORD_VERY_MEDIUM');
          strengthIndicator.className = "medium";
          pswdStrength.className = "strength1"
        } else {
          strengthIndicator.textContent = this.intl.t('PAGE_CONFIG_RESTORE_MODAL_PASSWORD_WEAK');
            strengthIndicator.className = "weak";
            pswdStrength.className = "strength0"
        }
    }

    @action
    handleInput(field, event) {
        this[field] = event.target.value;
    }

    @action
    handleKeyPress(event) {
        this.eaactrl.btnTrigger(event);
    }

    get strengthColorClass() {
        const strength = this.strength;
        if (strength === 0 || strength === 1) {
            return 'weak';
        } else if (strength === 2 || strength === 3) {
            return 'medium';
        } else {
            return 'strong';
        }
    }

    get passwordErrClass() {
        if (this.passwordHasForbidden === true) {
            return `password-error-highlight`;
        }
        return ``;
    }

    get passwordConfirmErrClass() {
        if (this.passwordConfirmHasForbidden === true) {
            return `password-error-highlight`;
        }
        return ``;
    }

    calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length > 6) strength += 1;
        if (password.length > 12) strength += 1;
        if (password.match(/^(?=.*[a-z])(?=.*[A-Z]).*$/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

        return strength;
    }

    get strengthText() {
        const messages = ['Very Weak', 'Weak', 'Better', 'Medium', 'Strong', 'Strongest'];
        return messages[this.strength] || '';
    }

    @action
    updateUsername(event) {
        this.username = event.target.value;
    }

    @action
    updatePassword(event) {
        this.password = event.target.value;
        this.strength = this.calculatePasswordStrength(this.password);
        this.width = ((this.strength + 1) / 6) * 100;
    }

    @action
    updateConfirmPassword(event) {
        this.confirmPassword = event.target.value;
    }

    @action
    updateUploadPassword(event) {
        this.uploadPassword = event.target.value;
    }

    @action
    // save(data, filename = "default-filename", type) {
    save() {
        // if ((this.password !== this.confirmPassword)
        //     || (this.password.length < 8)
        //     || this.password.match(/[\\'"<>]/)
        // ) {
        //     this.passwordFailed = true;

        //     if (this.password.match(/[\\'"<>]/) || (this.password.length < 8)) {
        //         this.passwordHasForbidden = true;
        //     } else {
        //         this.passwordHasForbidden = false;
        //     }

        //     if (this.confirmPassword.match(/[\\'"<>]/) || (this.confirmPassword.length < 8)) {
        //         this.passwordConfirmHasForbidden = true;
        //     } else {
        //         this.passwordConfirmHasForbidden = false;
        //     }
        // } else {
            this.passwordFailed = false;
            this.passwordHasForbidden = false;
            this.passwordConfirmHasForbidden = false;
            this.closeModal();
            this.proceedBackup();
        // }
    }

    /* Need this since ...VendorConfigFile.1.Name isn't updated soon enough after Backup() */
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async proceedBackup() {
        let url = '/commands';
        try {
            let response = await this.api.customFetch(url, {
                method: 'post',
                body: JSON.stringify({
                    command: 'PersistentConfiguration.Backup()',
                    commandKey: ',',
                    sendresp: true,
                    inputArgs: {
                        Type: 'export',
                    }
                })
            });
            this.reloadDeviceInfo();
        } catch (error) {
            console.error(`Something went wrong when running Backup() ${error}`);
        }
    }

    async proceedBackupProper() {
        const url = '/assets/pcm.usr/' + this.backuppath.split('/').pop();
        try {
            let response = await this.api.customFetch(url, {
                method: 'get'
            });

            if (!response.ok) {
                throw new Error("HTTP Response did not return OK.");
            } else {
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = url.split('/').pop();

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                this.modalUploadInProgressIsOpen = false;
            }
        } catch (error) {
            console.error('Something went wrong when uploading config file backup proper ' + error);
        }
    }

    async reloadDeviceInfo() {
        // basically wait for the node to change within 15s to get the true path
        for (let i = 0; i < 15; i++) {
            const dev = await this.store.findRecord('deviceinfo-vendorconfigfile','DeviceInfo.VendorConfigFile.1.', { reload: true });
            if ((i !== 0) && (dev.Name !== this.backuppath) && (dev.Name !== undefined && dev.Name !== '')) {
                this.backuppath = dev.Name;
                this.proceedBackupProper();
                break;
            }
            await this.sleep(1000);
        }
    }

    @action
    async getFirstConfigFile() {
        console.log('Running getFirstConfigFile');
        const dev = await this.store.peekRecord('deviceinfo-vendorconfigfile','DeviceInfo.VendorConfigFile.1.', { reload: true });
        console.log('dev name:', dev?.Name);
        if (dev?.Name !== '' && dev?.Name !== undefined && dev?.Name !== null) {
            this.backuppath = dev.Name;
            console.log('Original backup path:', this.backuppath)
        }
    }

    getLatestBackupFile() {
        return this.store.findAll('persistentconfiguration-backupfile', { reload: true }).then(
            (bak) => {
                bak.forEach((b) => {
                    const parts = b.Alias.split('-') 
                    let newidx = parseInt(parts.slice(2))
                    if (newidx > this.biggerIndex) {
                        this.biggerIndex = newidx;
                    }
                })
                return this.biggerIndex;
            }
        );
    }

    checkFileNamePrefix(filename) {
        const prefix = 'user_backup';
        //const hasPrefix = filename.startsWith(prefix);
        const hasPrefix = filename.includes(prefix);
        
        return hasPrefix;
    }

    @action
    async uploadFile(file) {
        // a filename is required to call the upload api !!!
        let url = '/upload/' + file.name;

        if (!this.checkFileNamePrefix(file.name)) {
            //console.error('File name does not with the required prefix.');
            this.configfileError = true;
            this.configfile = '';
            return;
        }

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
            this.configfile = file.name;
            this.openLoadedConfigModal();
        }

        } catch (error) {
            //console.log('upload aborted');
            file.state = 'aborted';
        }
    }

    @action
    clickUploadInput() {
        const i = document.getElementById('config-input');
        i.click();
    }

    @action
    openBackupModal() {
        // this.modalIsOpen = true;
        this.modalUploadInProgressIsOpen = true;
        this.save();
    }

    @action
    openLoadedConfigModal() {
        // this.modalUploadIsOpen = true;
        this.callAddBackupUpload();
    }

    @action
    async startConfigRestore() {
        let url = '/commands';
        // this.getBackupFileIndex();
        try {
            let response = await this.api.customFetch(url, {
                method: 'post',
                body: JSON.stringify({
                    command: 'Device.DeviceInfo.VendorConfigFile.1.Restore()',
                    commandKey: ',',
                    sendresp: true,
                    inputArgs: {
                        URL: "file:///tmp/upload/" + this.configfile,
                        Username: "",
                        Password: this.uploadPassword,
                        TargetFileName: 'user_backup.tar',
                    }
                })
            });
            this.callAddBackupUpload();
            this.closeUploadModal();
        } catch (error) {
            console.error('Something went wrong when uploading config file ' + error);
        }
    }

    async callAddBackupUpload() {
        let url = '/commands';
        try {
            let response = await this.api.customFetch(url, {
                method: 'post',
                body: JSON.stringify({
                    command: 'PersistentConfiguration.AddBackupFile()',
                    commandKey: ',',
                    sendresp: true,
                    inputArgs: {
                        FileName: "/tmp/upload/" + this.configfile,
                        Tag: 'Upload',
                    }
                })
            });
            this.callBackupProper();
        } catch (error) {
            console.error('Something went wrong when adding backup file');
        }
    }

    // async getBackupFileIndex(){
    //     //console.log('inside getBackupFileName');
    //     try {
    //         const rec = await this.store.findRecord('persistentconfiguration', 'PersistentConfiguration.');
    //         //console.log('Stringed: ' + JSON.stringify(rec));
    //         return '50.'
    //     } catch (err) {
    //         console.error('Err is ' + err);
    //         throw err;
    //     };
    // }

    async callBackupProper() {
        await this.getLatestBackupFile();
        let url = '/commands';
        try {
            let response = await this.api.customFetch(url, {
                method: 'post',
                body: JSON.stringify({
                    command: 'PersistentConfiguration.Restore()',
                    commandKey: ',',
                    sendresp: true,
                    inputArgs: {
                        Type: 'export',
                        FileRef: this.biggerIndex + '.',
                    }
                })
            });
            if (response.ok) {
                this.modalUploadIsDoneText = this.intl.t('PAGE_CONFIGURATION_SAVING_CONFIGURATION_TO_COMPUTER_POPUP_CONFIGURATION_SET');
            } else {
                this.modalUploadIsDoneText = this.intl.t('PAGE_CONFIGURATION_SAVING_CONFIGURATION_TO_COMPUTER_POPUP_CONFIGURATION_NOT_SET');
            }
            this.modalUploadDoneIsOpen = true;
        } catch (error) {
            console.error('Something went wrong when uploading config file ' + error);
        }
    }

    async Reset() {
        let url = '/commands';

        let cause;
        if (this.session.data.authenticated.username === 'remote') cause = 'RemoteFactoryReset';
        else cause = 'LocalFactoryReset';

        try {
            let response = await this.api.customFetch(url, {
                method: "post",
                body: JSON.stringify({
                    command: "Device.FactoryReset()",
                    commandKey: "",
                    sendresp: true,
                    inputArgs: {
                        isRelay: false,
                        Cause: cause,
                        Reason: 'WebGUI',
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Factory Reset HTTP error! status: ${response.status}`);
            }

            let result = await response.json();

        } catch (error) {
            console.error('Something went wrong during Reset.');
        }
    }

    async SoftReset() {
        let url = '/commands';

        let cause;
        if (this.session.data.authenticated.username === 'remote') cause = 'RemoteSoftReset';
        else cause = 'LocalSoftReset';

        try {
            let response = await this.api.customFetch(url, {
                method: "post",
                body: JSON.stringify({
                    command: "Device.SoftReset()",
                    commandKey: "",
                    sendresp: true,
                    inputArgs: {
                        isRelay: false,
                        Cause: cause,
                        Reason: 'WebGUI',
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Soft Reset HTTP error! status: ${response.status}`);
            }

            let result = await response.json();

        } catch (error) {
            console.error('Something went wrong during SoftReset.');
        }
    }

    @action
    closeModal() {
        this.modalIsOpen = false;
    }

    @action
    closeUploadModal() {
        this.modalUploadIsOpen = false;
    }

    @action
    openResetModal() {
        this.modalResetIsOpen = true;
    }

    @action
    closeResetModal() {
        this.modalResetIsOpen = false;
    }

    @action
    openResetProgressModal() {
        this.modalResetIsOpen = false;
        this.modalResetProgressIsOpen = true;
        this.Reset();
    }

    @action
    openSoftResetModal() {
        this.modalSoftResetIsOpen = true;
    }

    @action
    closeSoftResetModal() {
        this.modalSoftResetIsOpen = false;
    }

    @action
    openSoftResetProgressModal() {
        this.modalSoftResetIsOpen = false;
        this.modalSoftResetProgressIsOpen = true;
        this.SoftReset();
    }
}
