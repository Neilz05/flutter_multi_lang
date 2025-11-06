'use strict';

const { encrypt } = require("sjcl");

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'prpl-webui',
    environment,
    rootURL: '/',
    locationType: 'history',
    'ember-local-storage': {
      loadInitializer: false
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },
    intl: {
      locales: ['en-us', 'it-it']
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      modelType: 'FG4278Av2', //Neutral, FG4278Bv3, FG4278Av2, FG4278Av2_VD
      encryptionEnabled: false // Set to true to enable encryption
    },
  };

  /* ENV['ember-simple-auth'] = {
    routeAfterAuthentication: 'authenticated.dashboard',
  }; */

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
