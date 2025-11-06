import Model, { hasMany, attr } from '@ember-data/model';
import BaseModel from './base';

export default class Dhcpv4ServerPoolModel extends BaseModel {
  static sanitizedFields = ["MinAddress", "MaxAddress", "LeaseTime"]; //leave empty to sanitize all strings

  @attr Alias;
  @attr Chaddr;
  @attr ChaddrExclude;
  @attr ChaddrMask;
  @attr ClientID;
  @attr ClientIDExclude;
  @attr ClientNumberOfEntries;
  @attr DNSServers;
  @attr DomainName;
  @attr Enable;
  @attr IPRouters;
  @attr Interface;
  @attr LeaseTime;
  @attr MaxAddress;
  @attr MinAddress;
  @attr OptionNumberOfEntries;
  @attr Order;
  @attr ReservedAddresses;
  @attr StaticAddressNumberOfEntries;
  @attr Status;
  @attr SubnetMask;
  @attr UserClassID;
  @attr UserClassIDExclude;
  @attr VendorClassID;
  @attr VendorClassIDExclude;
  @attr VendorClassIDMode;
  @hasMany('dhcpv4-server-pool-staticaddress') StaticAddress;
  @hasMany('dhcpv4-server-pool-client') Client;
}
