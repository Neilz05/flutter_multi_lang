import sjcl from 'sjcl';
import config from 'prpl-webui/config/environment';

const DERIVED_KEY = sessionStorage.getItem('dk');

export function encryptData(data) {
  if(!config.APP.encryptionEnabled){
    return data; // If encryption is disabled, return data as is
  }
  return sjcl.encrypt(DERIVED_KEY, JSON.stringify(data));
}

export function decryptData(data) {
  if(!config.APP.encryptionEnabled)  return data;

  try{
    return JSON.parse(sjcl.decrypt(DERIVED_KEY, data));
  }catch{
    console.error('Decryption failed for data:', data);
    console.warn('encryptionEnabled is set to `true`, but the data could not be decrypted. This might be because the data is not encrypted or the derived key is incorrect.');
    return data;
  }
}