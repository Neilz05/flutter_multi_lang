const data = [
// export const data = [
  {
    parameters: {
      Username: 'root',
      Password: 'root123',
      Alias: 'root-user'
    },
    path: 'Users.User.1.'
  },
  {
    parameters: {
      Username: 'superadmin',
      Password: 'superadmin123',
      Alias: 'other-user'
    },
    path: 'Users.User.2.'
  },
  // {
  //   parameters: {
  //     Username: 'admin',
  //     Password: 'admin123',
  //     Alias: 'admin-user'
  //   },
  //   path: 'Users.User.3.'
  // }  /* remove duplicate admin-user */
  ];

module.exports = { data };