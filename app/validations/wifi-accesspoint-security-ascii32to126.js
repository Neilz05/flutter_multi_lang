import {
  validatePresence,
  validateLength,
  validateFormat,
} from 'ember-changeset-validations/validators';

const ASCII_RANGE_REGEX = /^[\x20-\x7E]+$/;

export default {
  KeyPassPhrase: [
    validatePresence({presence:true, message: 'Wi-Fi Password is required.'}),
    validateFormat({
        regex: /^[^~@#$%^&*+=\[\]{};:\\|€˜"'<>?,\s!_]{8,63}$/,
        message: 'Password must be between 8 and 63 characters long and must not contain spaces or special characters: ~ ! @ # $ % ^ & * + = _ [ ] { } ; : \\ | € ˜ " \' < > , ?',
        allowBlank: true
    }),
      validateFormat({
        regex: ASCII_RANGE_REGEX,
        message: 'Password must use only printable ASCII characters (32–126).',
      }),
  ],
};
