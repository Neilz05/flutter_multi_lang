import Model, { attr } from '@ember-data/model';
import BaseModel from './base';

export default class DnsRelayForwardingModel extends BaseModel {
  static sanitizedFields = []; // leave empty to sanitize all strings
  
  @attr Alias;
  @attr DNSServer;
  @attr Enable;
  @attr Interface;
  @attr Status;
  @attr Type;
}
