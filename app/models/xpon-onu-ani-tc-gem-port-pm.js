import Model, { attr, hasMany } from '@ember-data/model';
export default class XponOnuAniTCGEMPortPMModel extends Model {
    @attr FramesSent;
    @attr FramesReceived;
    @attr TxBytes;
    @attr DiscardPacketsReceived;
    @attr RxBytes;
  }