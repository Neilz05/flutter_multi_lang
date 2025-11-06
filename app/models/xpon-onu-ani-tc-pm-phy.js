import Model, { attr, hasMany } from '@ember-data/model';
export default class XponOnuAniTCPMPhyModel extends Model {
    @attr CorrectedFECBytes;
    @attr CorrectedFECCodeWords;
    @attr HeaderHECErrorCount;
    @attr PSBdHECErrorCount;
    @attr TotalFECCodeWords;
    @attr UncorrectableFECCodeWords;
    @attr UnknownProfile;
  }