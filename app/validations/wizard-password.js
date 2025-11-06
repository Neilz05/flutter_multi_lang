import { validatePresence, validateConfirmation, validateFormat } from 'ember-changeset-validations/validators';


export default {
    Password: [
        validateFormat({
            /* 
            Password must contain at least 8 characters, 
            must be a combination of at least 2 of the following kinds of characters:
                --> revised to the combination having at least 1 of each of the following kinds of characters:
            uppercase letters [A-Z] 
            lowercase letters [a-z] 
            numeric characters [0-9] 
            special characters [e.g. ~ ! @ # $ % ^ * - _ = + [ { } ] , . / ; :
            */
            // regex: /^(?=(?:.*[A-Z]){0,})(?=(?:.*[a-z]){0,})(?=(?:.*[0-9]){0,})(?=(?:.*[~!@#$%^*()\-_=+\[\]{}]){0,})(?=(?:.*[A-Z].*[a-z]|.*[A-Z].*[0-9]|.*[A-Z].*[~!@#$%^*()\-_=+\[\]{}]|.*[a-z].*[0-9]|.*[a-z].*[~!@#$%^*()\-_=+\[\]{}]|.*[0-9].*[~!@#$%^*()\-_=+\[\]{}]))^.{8,}$/,
            regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~,.!@#$%^*\-_=+\[\]{}\/;:])[A-Za-z\d~,.!@#$%^*\-_=+\[\]{}\/;:]{8,}$/,
            message: 'Password must be at least 8 characters long and contain a mix of uppercase letters, lowercase letters, numbers, and special characters: ~ ! @ # $ % ^ * - _ = + [ { } ] , . / ; :',
            allowBlank: true
        })
    ],
    ConfirmPassword: [
        validatePresence({ presence: true, on: 'Password', message: 'Please confirm your password.' }),
        validateConfirmation({ on: 'Password', allowBlank: true, message: 'Passwords do not match.' })
    ]
};

