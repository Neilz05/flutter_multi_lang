import Model, { attr } from '@ember-data/model';

export default class XscmacfilterModel extends Model {
    @attr Enable;
    @attr FilterAsBlackList;

    @attr({
        defaultValue() { return 'WiFi.X_SC_MACFilter.'; }
    }) _namespace;
}
