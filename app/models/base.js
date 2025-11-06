import Model from '@ember-data/model';
import sanitize from 'prpl-webui/utils/sanitize';

export default class BaseModel extends Model {
    
  async save() {
    if(!this.hasDirtyAttributes){ return; } // No changes to save
    
    const changed = this.changedAttributes();
    let changedAttributeNames = Object.keys(changed);
    let sanitizedValue = '';
    let attr;

    if(changedAttributeNames.length > 0) {
        changedAttributeNames.forEach((key) => {
            attr = this.get(key);
            if (typeof attr === 'string') {
                sanitizedValue = sanitize(attr);
                this.set(key,sanitizedValue); // Overwrite with sanitized value
            }
        });
    }
    return super.save(); // Call parent save
  }

}
