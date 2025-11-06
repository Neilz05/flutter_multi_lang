import Model, { attr, hasMany } from '@ember-data/model';
export default class XponOnuAniTCPMGEMModel extends Model {
    @attr FrameHeaderHECErrors;
    @attr FramesReceived;
    @attr FramesSent;
    @attr KeyErrors;
  }