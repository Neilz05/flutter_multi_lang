import Model, { attr ,belongsTo} from '@ember-data/model';

export default class XponOnuAniTCAlarmsModel extends Model {
    @attr DACT;
    @attr DIS;
    @attr LCDG;
    @attr LODS;
    @attr LOF;
    @attr LOS;
    @attr MEM;
    @attr MIS;
    @attr PEE;
    @attr RDI;
    @attr ROGUE;
    @attr SD;
    @attr SF;
    @attr SUF;
    @attr TF;
}