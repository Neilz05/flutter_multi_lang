// app/validations/pppoe.js
import { validatePresence, validateFormat } from 'ember-changeset-validations/validators';

const FORMAT_REGEX = /^[!@#$%&*_+\-=|?,./~a-zA-Z0-9]+$/;

export default {
    Username: [
        validatePresence({ presence: true, message: 'Username is required.' }),
        validateFormat({
            regex: FORMAT_REGEX,
            message: 'Invalid Username.',
        })
    ],
    Password: [
        validateFormat({
            regex: FORMAT_REGEX,
            message: 'Invalid Password.',
            allowBlank: true
        })
    ]
};
