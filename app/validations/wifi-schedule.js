import {
    validatePresence,
    validateLength,
    validateFormat,
} from 'ember-changeset-validations/validators';

import validateDurationWithinDay from './validate-schedule-duration';
import validateUniqueAlias from './unique-alias';

export default function ScheduleValidator(store, prefix, currentModel = null) {
    const allAliases = store.peekAll('data')
        .filter((data) => {
            if (!data.id) return true; // include unsaved
            return data.id.startsWith(prefix);
        })
        .map((data) => data.parameters?.Alias || '')
        .filter((alias) => alias !== '');

    // Exclude the current model's Alias (for edit mode)
    const currentAlias = currentModel?.parameters?.Alias;
    const aliasesToCheck = currentAlias
        ? allAliases.filter((alias) => alias !== currentAlias)
        : allAliases;

    return {
        parameters: {
            Alias: [
                validatePresence({ presence: true, message: 'Rule Name is required.' }),
                validateLength({
                    min: 1,
                    max: 64,
                    message: 'Schedule Name must be between 1 and 64 characters.',
                }),
                validateFormat({
                    regex: /^[\x20-\x7E]+$/,
                    message: 'Schedule Name must use only printable ASCII characters (32–126).',
                }),
                validateFormat({
                    regex: /^[^\\~@#$%^&*+=\[\]{};:\\|€˜"<>,?]*$/,
                    message: 'Schedule Name contains forbidden characters.',
                }),
                validateFormat({
                    regex: /^[^\d].*$/,
                    message: 'Schedule Name must not start with a number.'
                }),
                validateUniqueAlias(aliasesToCheck),
            ],
            Duration: [
                validatePresence({
                    presence: true,
                    message: 'Please Set an End Time.',
                }),
                validateDurationWithinDay(), 
            ],
            StartTime: [
                validatePresence({
                    presence: true,
                    message: 'Please Set a Start Time.',
                }),
            ],
            Day: [
                validatePresence({
                    presence: true,
                    message: 'Please select at least one day.',
                }),
            ],
        },
    };
}
