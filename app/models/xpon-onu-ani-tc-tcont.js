import Model, { attr } from '@ember-data/model';

export default class XponOnuAniTCTcontModel extends Model {
    @attr ID;
    @attr AllocID;
    @attr TxGemFrames;
}
