import Model, { attr, hasMany } from '@ember-data/model';
export default class XponOnuAniTCPMOMCIModel extends Model {
    @attr BaselineMessagesReceived;
    @attr ExtendedMessagesReceived;
    @attr MICErrors;
    @attr TxFrames;
    @attr RxFrames;
  }