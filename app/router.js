import EmberRouter from '@ember/routing/router';
import config from 'prpl-webui/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login')
  this.route('login2')
  this.route('wizard', function() {
    this.route('wanMode')
    this.route('greeting')
    this.route('pppoe')
    this.route('networkvlan')
    this.route('password')
    this.route('sip')
    this.route('success')
  })
  this.route('authenticated', { path: '' }, function () {
    this.route('dashboard', { path: '/overview' });
    this.route('phone', function() {
      this.route('phone');
      this.route('phone2');
      this.route('callsettings');
      this.route('calllog');
      this.route('phone-numbers');
      this.route('ring-schedule');
      this.route('blocking');
      this.route('phoneadv');
    });
    this.route('settings', function() {
      this.route('password');
      this.route('lan');
      this.route('lan2');
      this.route('wan');
      this.route('open-modem');
      if (config.APP.modelType === 'Neutral') {
        this.route('wan-autosensing');
      }
      this.route('gpon');
      this.route('internet-time');
      this.route('lanswitch');
      this.route('eco-mode');
    });
    this.route('wifi', function() {
      this.route('general', { path: '' });
      this.route('general2');
      this.route('easymesh');
      this.route('easymesh2');
      this.route('macfilter');
      this.route('wps');
      this.route('settings');
      this.route('data-elements');
      this.route('schedule');
    });
    this.route('internet', function(){
      this.route('firewall');
      this.route('port-mapping');
      this.route('dmz');
      this.route('upnp');
      this.route('ddns');
      this.route('dns');
      this.route('parental');
    });
    this.route('status-and-support', function() {
      this.route('status');
      this.route('internet-status');
      this.route('wan-status');
      this.route('lan-status');
      this.route('wlan-status');
      this.route('gpon-status');
      this.route('system-status');
      this.route('voice-status');
      this.route('optical-status');
      this.route('routing');  // Added for routing page
      this.route('upgrade', { path: '/firmware-update' });
      this.route('config');
      this.route('restart');
      this.route('eventlog');
      this.route('diagnostic-utility');
      this.route('about');
      this.route('lcm');
    });
    this.route('support', function() {
      this.route('config');
    });
  });
  this.route('sessionend');
  this.route('loading');
});
