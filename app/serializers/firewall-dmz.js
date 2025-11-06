import ApplicationSerializer from './application';
export default class DMZSerializer extends ApplicationSerializer {
    normalizeRecord(store, record, id, type) {
        if (record.parameters.Alias && record.path != id){
            id = id.replace(/\d+\.$/, record.parameters.Alias + '.')    
        }
        return super.normalizeRecord(store, record, id, type)
    }
}