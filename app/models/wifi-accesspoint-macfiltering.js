import Model, { attr, hasMany } from '@ember-data/model';

export default class WifiAccesspointMacfilteringModel extends Model {
    @attr Mode;
    @attr TempBlacklistEnable;
    @hasMany('wifi-accesspoint-macfiltering-entry', { async: false, inverse: null }) Entry;
}
