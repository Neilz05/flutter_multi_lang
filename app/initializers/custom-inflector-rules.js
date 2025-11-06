import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;
  inflector.uncountable('users');
  inflector.uncountable('users-user');
  inflector.uncountable('stats');
  inflector.uncountable('Stats');
  inflector.uncountable('softwaremodules');
  inflector.uncountable('xpon-onu-ani-tc-alarms');
  inflector.uncountable('xpon-onu-ani-tc-performancethresholds');
  inflector.uncountable('currentoperatingclasses');
  inflector.uncountable('dataelements');
  inflector.uncountable('backhaulsta');
  inflector.uncountable('sta');
  inflector.uncountable('multiapsta');
  inflector.uncountable('affiliatedsta');
  inflector.uncountable('devices');
  inflector.uncountable('nodes');
  inflector.uncountable('MultiAP');
  inflector.uncountable('multiap');
  inflector.uncountable('wifi-multiap-nodes');
  inflector.uncountable('wifi-multiap-devices');
  inflector.uncountable('Nodes');
  inflector.uncountable('Devices');
  inflector.uncountable('@meshConfig.MultiAP.Nodes');
  inflector.uncountable('SerialNumber');
  inflector.uncountable('capabilities');
  inflector.uncountable('status');
  inflector.uncountable('voiceservice');
  inflector.uncountable('service');
  inflector.uncountable('wifi-accesspoint-wps');
  inflector.uncountable('WPS');
  inflector.uncountable('wps');
  inflector.uncountable('hosts');
  inflector.uncountable('DNS');
  inflector.uncountable('dns');
  inflector.uncountable('WANStats');
  inflector.uncountable('wanstats');
  inflector.uncountable('associationeventdata');
  inflector.uncountable('disassociationeventdata');
  inflector.uncountable('qos');
  inflector.uncountable('services-voiceservice-sip-network');
  inflector.uncountable('services');
  inflector.uncountable('DynamicDNS');
  inflector.uncountable('dynamicdns');
  inflector.uncountable('Diagnostics');
  inflector.uncountable('diagnostics');
  inflector.uncountable('ip-diagnostics');
  inflector.uncountable('packetcapturediagnostics');
  inflector.uncountable('PacketCaptureDiagnostics');
  inflector.irregular('services', 'services');
  inflector.uncountable('hosts-accesscontrol-xprplwarecomapplicationfilter-applications');
  inflector.uncountable('hosts-accesscontrol-xprplwarecomurlfilter-urls');
  inflector.uncountable('services-voiceservice-pots');
  inflector.uncountable('services-voiceservice-pots-fxs');

}

export default {
  name: 'custom-inflector-rules',
  initialize,
};
