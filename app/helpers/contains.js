import { helper } from '@ember/component/helper';

export default helper(function contains([haystack, needle]) {
  return haystack.includes(needle);
});