import ApplicationAdapter from './application';
import { inject as service } from '@ember/service';

export default class OutgoingBlockingRulesAdapter extends ApplicationAdapter {
    

    urlForCreateRecord(id, modelName, snapshot) {
        let url = `/serviceElements/Device.Services.VoiceService.1.CallControl.X_PRPLWARE-COM_NumberBlocking.OutgoingBlocking.Rules.`
        return url
    }
}