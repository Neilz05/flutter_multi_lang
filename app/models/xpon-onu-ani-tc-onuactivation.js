import Model, { attr, hasMany } from '@ember-data/model';
export default class XponOnuAniTCONUActivationModel extends Model {
    @attr ONUID;
    @attr ONUState;
    @attr SerialNumber;
    @attr VendorID;
  }
