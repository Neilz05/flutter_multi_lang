import Model, { attr, hasMany } from '@ember-data/model';
import BaseModel from './base';

export default class DnsXSecure extends BaseModel {
  @attr Enable;
  @attr ConfigureAllDevices;
}