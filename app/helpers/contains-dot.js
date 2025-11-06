import { helper } from '@ember/component/helper';

export default helper(function containsDot([str]) {
  if (typeof str !== 'string') {
    return false;
  }
  return str.includes('.');
});
