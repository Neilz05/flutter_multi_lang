import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class AuthenticatedNetworkLanswitchController extends Controller {
    @service eaactrl;
    
    @action
    UpdateSpeedDuplex(eth, event) {
        //given 10 MB Full, split it into
        //type: Full
        //size 10
        if (event.target.value === 'Auto') {
            eth.DuplexMode = event.target.value;
            eth.MaxBitRate = -1
        }
        else {
            const [size, filler, type] = event.target.value.split(" ");
            eth.DuplexMode = type
            eth.MaxBitRate = parseInt(size);
        }
    }

    @action
    Apply(){
        this.model.forEach(md => {
            if (md.hasDirtyAttributes) md.save();   
        })
    }

    @action
    Cancel(){
        this.model.forEach(md => {
            if (md.hasDirtyAttributes) md.rollbackAttributes();
        });
    }

    get HasChanges(){

        return this.model.find(md => md.hasDirtyAttributes) ?? false;
    }
}
