'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const isProduction = process.env.EMBER_ENV === 'production';
  const isDebug = process.argv.includes('--debug');

  let app = new EmberApp(defaults, {
    // Add options here
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },

    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
    autoImport: {
      webpack: {
        resolve: {
          fallback: {
            crypto: false, // Disable crypto polyfill
          }
        }
      }
    },
    'ember-cli-terser': {
      enabled: isProduction,
      terser: {
        compress: {
          drop_console: isProduction && !isDebug,
          drop_debugger: true
        }
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
