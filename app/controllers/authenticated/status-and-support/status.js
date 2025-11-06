import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class AuthenticatedStatusStatusController extends Controller {
    @service store;

    formatTime(seconds) {
        const days = Math.floor(seconds / (24 * 3600));
        seconds %= 24 * 3600;
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    get bootReason() {
        const reboot = this.store.peekRecord('reboot', 'Reboot.');
        const found = reboot.Reboot.find((rb) => {
            return reboot.BootCounter === parseInt(rb.id.split('.')[2]);
        });

        return found ? found.BootReason : '';
    }
}
