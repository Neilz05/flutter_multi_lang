import {
    validatePresence,
    validateLength,
    validateFormat,
} from 'ember-changeset-validations/validators';

export default function AccessControlURLValidator() {
    return {
        URL: [
            validatePresence({ presence: true, message: 'ERROR_MESSAGE_URL_REQUIRED' }),
        ],
    };
}
