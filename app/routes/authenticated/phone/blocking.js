import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

import filterMultiInstanceModels from '../../../utils/filter-instance-models';

export default class AuthenticatedPhoneRoute extends Route {
    @service store;
    beforeModel() {
        localStorage.setItem('tab', 'authenticated.phone.blocking');
    }
    async model() {

        try {
            const path = 'Services.VoiceService.1.CallControl.X_PRPLWARE-COM_NumberBlocking.'
            const data = await this.store.query('services-voiceservice-callcontrol-x-prplware-com-numberblocking', { path: path })

            return {
                outgoingsettings: this.store.peekRecord('services-voiceservice-callcontrol-x-prplware-com-numberblocking-outgoingblocking', "Services.VoiceService.1.CallControl.X_PRPLWARE-COM_NumberBlocking.OutgoingBlocking."),
                outgoingnumbers: this.store.peekAll('services-voiceservice-callcontrol-x-prplware-com-numberblocking-outgoingblocking-rules'),
                incomingsettings: this.store.peekRecord('services-voiceservice-callcontrol-x-prplware-com-numberblocking-incomingblocking', "Services.VoiceService.1.CallControl.X_PRPLWARE-COM_NumberBlocking.IncomingBlocking."),
                incomingnumbers: this.store.peekAll('services-voiceservice-callcontrol-x-prplware-com-numberblocking-incomingblocking-rules'),
            }

        } catch (error) {
            console.log(error)
            return {
                outgoingsettings: {},
                outgoingnumbers: [],
                incomingsettings: {},
                incomingnumbers: []
            }
        }
    }
}