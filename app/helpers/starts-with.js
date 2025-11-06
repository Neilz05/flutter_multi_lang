import { helper } from '@ember/component/helper';

export default helper(function startsWith([value, prefix]) {
  if (typeof value !== 'string' || typeof prefix !== 'string') {
    return false;
  }
  return value.startsWith(prefix);
});
