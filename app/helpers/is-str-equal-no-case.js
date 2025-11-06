import { helper } from '@ember/component/helper';

export default helper(function isStrEqualNoCase([str1, str2]) {
  return str1.toLowerCase() === str2.toLowerCase() ? true : false;
});
