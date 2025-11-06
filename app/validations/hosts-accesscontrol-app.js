import {
    validatePresence,
    validateLength,
    validateFormat,
    validateNumber
} from 'ember-changeset-validations/validators';

export default function AccessControlAppValidator() {
    return {
        Name: [
            validatePresence({ presence: true, message: 'ERROR_MESSAGE_NAME_REQUIRED' }),
        ],
        Port: [
            validatePresence({ presence: true, message: 'ERROR_MESSAGE_PORT_REQUIRED' }),
            validateNumber({
                //integer: true,
                gt: 0,
                lt: 65536,
                message: 'ERROR_MESSAGE_PORT_RANGE'
            }),
        ],
    };
}
