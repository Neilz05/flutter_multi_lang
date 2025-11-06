import {
  validatePresence,
  validateLength,
  validateFormat,
} from 'ember-changeset-validations/validators';


const ASCII_RANGE_REGEX = /^[\x20-\x7E]+$/;
const FORBIDDEN_CHARS_REGEX = /^[^\\~@#$%^&*+=\[\]{};:\\|€˜"<>,?']*$/;

export default {

    SSID: [
      validatePresence({ presence: true, message: 'SSID is required.' }),
      validateLength({
        min: 1,
        max: 32,
        message: 'SSID must be between 1 and 32 characters.',
      }),
      validateFormat({
        regex: ASCII_RANGE_REGEX,
        message: 'SSID must use only printable ASCII characters (32–126).',
      }),
      validateFormat({
        regex: FORBIDDEN_CHARS_REGEX,
        message:
          'SSID contains forbidden characters: \\ ~ @ # $ % ^ & * + = [ ] { } ; : \\ | € ˜ " < > , ? \' ',
      }),
    ],

};
