import { helper } from '@ember/component/helper';

export default helper(function replace([string = '', search, replacement]) {
  return string.replaceAll(search, replacement);
});
