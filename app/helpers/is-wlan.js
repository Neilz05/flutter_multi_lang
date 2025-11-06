import { helper } from '@ember/component/helper';

export function isWlan([alias]) {
  return !alias.includes('.');
}

export default helper(isWlan);