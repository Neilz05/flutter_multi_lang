import {
  validatePresence,
  validateLength,
  validateFormat,
} from 'ember-changeset-validations/validators';
import validateUniqueSSIDName from './wifi-general-ssid-name';

const ASCII_RANGE_REGEX = /^[\x20-\x7E]+$/;
const FORBIDDEN_CHARS_REGEX = /^[^\\~@#$%^&*+=\[\]{};:\\|€˜"<>,?']*$/;

export default function SSIDValidation(store, splitSSIDStatus, currentModel = null){
  let allowedAliases = [];

  if (splitSSIDStatus) {
    allowedAliases = ["WiFi-2G", "WiFi-2G-Guest", "WiFi-5G", "WiFi-5G-Guest", "WiFi-6G", "WiFi-6G-Guest"];
  } else {
    allowedAliases = ["WiFi-2G", "WiFi-2G-Guest"];
  }

  const wifiSSIDs = store.peekAll('wifi-ssid');
  const currentSSIDs = currentModel?.SSID;
  const existingSSIDs = wifiSSIDs.filter(wifi => wifi.SSID !== currentSSIDs && allowedAliases.includes(wifi.Alias)).map(wifi => wifi.SSID);

  return {
    SSID: [
      validatePresence({ presence: true, message: 'PAGE_GENERAL_WIFI_NAME_INPUT_ERROR' }),
      validateLength({
        min: 1,
        max: 32,
        message: 'PAGE_GENERAL_WIFI_NAME_LENGTH_ERROR',
      }),
      validateFormat({
        regex: ASCII_RANGE_REGEX,
        message: 'PAGE_GENERAL_WIFI_NAME_FORMAT_ERROR_1',
      }),
      validateFormat({
        regex: FORBIDDEN_CHARS_REGEX,
        message: 'PAGE_GENERAL_WIFI_NAME_FORMAT_ERROR_2',
      }),
      validateUniqueSSIDName(existingSSIDs)
    ],
  }
};
