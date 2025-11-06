import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class AuthenticatedPhone2Controller extends Controller {
    @tracked hasComponentErrors = false;
    
    get hasChanges() {
            let isDirty = false;
        
            if (this.model.network && this.model.network.hasDirtyAttributes) {
                isDirty = true;
            }
            
            this.model.clients.forEach((client) => {
                if (client.hasDirtyAttributes) {
                    isDirty = true;
                }
            });
        
            return isDirty && !this.hasComponentErrors;
        }
    
        @action
        updateComponentErrors(hasErrors) {
            this.hasComponentErrors = hasErrors;
        }
    
        @action
        updateVoice() {
            if (this.model.network && this.model.network.hasDirtyAttributes) {
                this.model.network.save();
            }
    
            this.model.clients.forEach((client) => {
                if (client.hasDirtyAttributes) {
                    client.save();
                }
            });
        }
    
        @action
        cancelPhone() {
            this.model.network.rollbackAttributes();
    
            this.model.clients.forEach((client) => {
                if (client.hasDirtyAttributes) {
                    client.rollbackAttributes();
                }
            });
        }
}
