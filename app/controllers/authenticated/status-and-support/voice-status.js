import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusVoiceStatusController extends Controller {
    @service store;

    @action
    checkRegisterURI(index) {
        let result = 0;
        let count = 0;
        this.model.client.forEach(cli => {
            if (count === index) {
                result = cli.RegisterURI != "" ? 1 : 0;
            }
            count++;
        });
        return result;
    }
}
