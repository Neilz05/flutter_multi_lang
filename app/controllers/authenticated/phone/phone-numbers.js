import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class AuthenticatedPhonePhoneNumbers extends Controller {
    @service store;
    @service intl;

    columns = [
      { header: this.intl.t('PAGE_PHONE_NUMBERS_TABLE_2_COLTITLE_1'), key: "connection" },
      { header: this.intl.t('PAGE_PHONE_NUMBERS_TABLE_2_COLTITLE_2'), key: "internal-number" },
      { header: this.intl.t('PAGE_PHONE_NUMBERS_TABLE_1_COLTITLE'), key: "phone-number" },
      { header: this.intl.t('PAGE_PHONE_NUMBERS_TABLE_1_COLTITLE_2'), key: "name", type: 'input-field' },
    ];

    get phoneNumbersData() {
        return this.model.map(element => {
            return {
                "connection": `TEL${this.getConnection(element.id)}`,
                "internal-number": element.get('X_PRPLWARE-COM_InternalNumber'),
                "phone-number": element.RegisterURI,
                "name": element.get('X_PRPLWARE-COM_DisplayName'),
            };
        });
    }
    get hasChanges(){
        let dirtyElements = this.model.filter(element => {
            return element.hasDirtyAttributes;
        });
        return dirtyElements.some(Boolean);
    }
    @action handleInputChange(index, key, event) {
        let value = event.target.value;
        let record = this.model.objectAt(index);

        if (record) {
            record.set('X_PRPLWARE-COM_DisplayName', value);
        }
    }
    @action apply(){
        this.model.forEach(element => {
            element.save();
            // element.rollbackAttributes();
        });
    }
    @action cancel(){
        this.model.forEach(element => {
            element.rollbackAttributes();
        });
    }
    getConnection(id) {
        let parts = id.split('Client.');
        let number = parts[parts.length - 1];
        return number.replace('.','');
    }
}