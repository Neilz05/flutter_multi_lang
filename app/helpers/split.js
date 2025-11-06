import { helper } from '@ember/component/helper';

export default helper(function split([string, delimiter]) {
  if (typeof string !== 'string') {
    return [];
  }

  return string.split(delimiter);
});
