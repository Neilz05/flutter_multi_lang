import Model, { attr, hasMany } from '@ember-data/model';

export default class UsersModel extends Model {
  @hasMany('users-user') User;

  @attr({
    defaultValue() { return 'Users.'; }
  }) _namespace;
}

