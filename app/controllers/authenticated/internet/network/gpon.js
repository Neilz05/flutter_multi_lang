import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class GponController extends Controller {
    @tracked oltType = '';
    @tracked oltAutoDetect = '';
    @tracked oltStatus = '';

    get hasChanges() {
        return this.oltType !== this.model.oltType || this.oltAutoDetect !== this.model.oltAutoDetect || this.oltStatus !== this.model.oltStatus;
    }

    @action
    updateGpon() {
        if (this.hasChanges) {
            this.model.setProperties({
                oltType: this.oltType,
                oltAutoDetect: this.oltAutoDetect,
                oltStatus: this.oltStatus
            });

            this.model.save().then(() => {
                this.model.rollbackAttributes();
            });
        }
    }

    @action
    setOltType(event) {
        this.oltType = event.target.value;
    }

    @action
    setOltAutoDetect(event) {
        this.oltAutoDetect = event.target.value;
    }

    @action
    setOltStatus(event) {
        this.oltStatus = event.target.value;
    }
}