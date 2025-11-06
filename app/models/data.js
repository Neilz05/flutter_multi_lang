import Model, { attr } from '@ember-data/model';

export default class DataModel extends Model {
    @attr() parameters;
    _changedParameters = new Map(); // Not tracked, for internal change tracking
    _parametersBackup = null;

    setupParameters() {
        this._parametersBackup = JSON.parse(JSON.stringify(this.parameters));
    }
    
    backupParameters(param) {
        this._parametersBackup = param;
    }

    set(key, value) {
        const oldValue = this.parameters?.[key];

        if (oldValue !== value) {
            // Track change
            this._changedParameters.set(key, value);

            this.parameters = {
                ...this.parameters,
                [key]: value
            };
        }
    }

    get(key) {
        return this.parameters?.[key]
    }

    getChangedParameters() {
        return Object.fromEntries(this._changedParameters.entries())
    }

    async applySaveChangeset(cs, path) {
        this.setupParameters()
        cs.execute()
        const res = await this.save(path)
        cs.rollback()
    }

    async destroyRecord(path){
        return super.destroyRecord({});
    }

    async save(path) {
        if (!path) throw new Error('Missing path');
        return super.save({ adapterOptions: { customPath: path } });
    }

    applyChangeset(changeset) {
        changeset.changes.forEach(({ key, value }) => {
            if (!key.startsWith('parameters.')) {
                // Skip anything that's not under "parameters."
                return;
            }

            const paramKey = key.slice('parameters.'.length); // extract "Alias", "Duration", etc.

            this.set(paramKey, value);
        });
    }
}
