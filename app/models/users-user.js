import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';
export default class UsersUserModel extends BaseModel {
 static sanitizedFields = []; //leave empty to sanitize all strings

  @attr Alias;
  @attr UserID;
  @attr Username;
  @attr Password;
  @attr Language
  @attr 'X_PRPL-COM_HashedPassword';
  @attr 'X_PRPL-COM_WUIMode';
}

