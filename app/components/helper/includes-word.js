import { helper } from '@ember/component/helper';

export default helper(function includesWord([string, word]) {
  if (typeof string !== 'string' || typeof word !== 'string') {
    return false;
  }

  const words = string.split(/\s+/); // split by spaces or whitespace
  return words.includes(word);
});
