import {
    validatePresence,
    validateLength,
    validateFormat,
} from 'ember-changeset-validations/validators';

import validateUniqueAlias from './unique-alias';
import validateUniquePhysAddress from './unique-physaddress';

export default function AccessControlValidator() {
    return {
        Alias: [
            validatePresence({ presence: true, message: 'ERROR_MESSAGE_ALIAS_REQUIRED' }),
            validateLength({
                min: 1,
                max: 64,
                message: 'ERROR_MESSAGE_ALIAS_LENGTH',
            }),
            validateFormat({
                // Only check that the first character is a letter
                regex: /^[A-Za-z]/,
                message: 'ERROR_MESSAGE_ALIAS_STARTS_WITH_LETTER',
            }),
            validateFormat({
                regex: /^[^\\~@#$%^&*+=\[\]{};:\\|€˜"<>,?]*$/,
                message: 'ERROR_MESSAGE_ALIAS_FORBIDDEN_CHARACTERS',
            }),
            validateUniqueAlias(),
        ],
        PhysAddress: [
            validatePresence({ presence: true, message: 'ERROR_MESSAGE_MAC_ADDRESS_REQUIRED' }),
            validateFormat({
                regex: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
                message: 'ERROR_MESSAGE_MAC_ADDRESS_FORMAT',
            }),
            validateUniquePhysAddress(),
        ],
    };
}
