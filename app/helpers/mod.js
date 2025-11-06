import { helper } from '@ember/component/helper';

export default helper(function mod([dividend, divisor]) {
  return ((dividend % divisor) + divisor) % divisor;
});
