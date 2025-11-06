import { helper } from '@ember/component/helper';

export default helper(function splitDns([input, delimiter = ',']) {
  if (typeof input !== 'string') {
    return [];
  }

  return input.split(delimiter).map(str => str.trim());
});
