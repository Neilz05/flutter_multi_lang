// password-component.js
import Component from '@glimmer/component';
import { action,set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { sha512 } from 'sha512-crypt-ts';

export default class PasswordComponent extends Component {
  @service intl
  @service session
  @service eaactrl;

  @tracked selectedUser = null;
  @tracked isModalOpen = false;
  @tracked currentPassword = '';
  @tracked newPassword = '';
  @tracked reenterPassword = '';
  @tracked ErrorMsg = '';
  @tracked strength = 0;

  constructor() {
    super(...arguments);
    if(this.args.user.admin !== null){
      this.selectedUser = this.args.user.admin.UserID;
    }else{
      this.selectedUser = this.args.user.enduser.UserID;
    }
    //console.log("selectedUser:" + this.selectedUser);
  }

  @action
  updateSelectedUser(event) {
    this.selectedUser = event.target.value;
    //console.log("selectedUser:" + this.selectedUser);
  }

  @action
  showChangePasswordModal() {
    this.isModalOpen = true;
  }

  @action
  closeModal() {
    this.isModalOpen = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.reenterPassword = '';
    this.ErrorMsg = '';
  }

  @action
  handleInput(field, event) {
    this[field] = event.target.value;
  }

  @action
  savePassword() {
    //let userData = this.args.user.User;

    if (this.currentPassword === this.newPassword) {
      this.ErrorMsg = this.intl.t('PAGE_PASSWORD_POPUP_CURRENT_NEW_PASSWORD_MATCH_ERROR_MESSAGE');
      return;
    }

    if (this.newPassword !== this.reenterPassword) {
      this.ErrorMsg = this.intl.t('PAGE_GENERAL_PASSWORD_POPUP_PASSWORDS_DONT_MATCH');
      return;
    }

    // copied from wizard password check regex
    const regex = /^(?=(?:.*[A-Z]){0,})(?=(?:.*[a-z]){0,})(?=(?:.*[0-9]){0,})(?=(?:.*[~!@#$%^*()\-_=+\[\]{}]){0,})(?=(?:.*[A-Z].*[a-z]|.*[A-Z].*[0-9]|.*[A-Z].*[~!@#$%^*()\-_=+\[\]{}]|.*[a-z].*[0-9]|.*[a-z].*[~!@#$%^*()\-_=+\[\]{}]|.*[0-9].*[~!@#$%^*()\-_=+\[\]{}]))^.{8,}$/;

    if (!regex.test(this.newPassword)) {
      this.ErrorMsg = this.intl.t('PAGE_GENERAL_PASSWORD_POPUP_PASSWORD_MINIMUM_REQUIREMENTS')
      return;
    }

    // If all validations pass, proceed to save the password
    if(this.args.user.admin !== null){
      if (this.args.user.admin.UserID === parseInt(this.selectedUser, 10)) {
        if (this.ValidatePassword(this.args.user.admin['X_PRPL-COM_HashedPassword'], this.currentPassword)) {
          set(this.args.user.admin, 'Password', this.newPassword);
          this.closeModal();
        }
      }
    }
    if(this.args.user.enduser !== null){
      if (this.args.user.enduser.UserID === parseInt(this.selectedUser, 10)) {
        if (this.ValidatePassword(this.args.user.enduser['X_PRPL-COM_HashedPassword'], this.currentPassword)) {
          set(this.args.user.enduser, 'Password', this.newPassword);
          this.closeModal();
        }
      }
    }
  }

  @action
  checkPasswordStrength (event) {
    let password = event.target.value;
    this.strength = 0;
    if (password.length >= 8) {
      if (/[A-Z]/.test(password)) this.strength++;
      if (/[a-z]/.test(password)) this.strength++;
      if (/[0-9]/.test(password)) this.strength++;
      if (/[^A-Za-z0-9]/.test(password)) this.strength++;
    }
  }

  ValidatePassword(currentHashed, currentCandidate) {
    const salt = currentHashed.split('$').slice(0,3).join('$');
    const result = sha512.crypt(currentCandidate, salt);
    if (result === currentHashed) {
      return true;
    }
    this.ErrorMsg = this.intl.t('PAGE_PASSWORD_POPUP_CURRENT_PASSWORD_INCORRECT_ERROR_MESSAGE');
    return false;

  }
}
