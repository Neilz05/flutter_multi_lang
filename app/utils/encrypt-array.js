import sjcl from 'sjcl';
import config from 'prpl-webui/config/environment';

export default function encryptArray(data) {
  // This function encrypts an array of objects, each containing a path and parameters.(For simulation purposes)
  // If encryption is disabled in the configuration, it returns the data as is.
  if (!config.APP.encryptionEnabled) return data;

  let dk = sessionStorage.getItem('dk');
  let encrypt_data =  data.map(item => ({
    path: item.path,
    parameters: sjcl.encrypt(dk, JSON.stringify(item.parameters))
  }));
  
  return encrypt_data;
}
