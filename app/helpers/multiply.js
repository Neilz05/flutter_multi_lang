import { helper } from '@ember/component/helper';

export default helper(function multiply([a, b]) {
  return (a * b).toFixed(1);
});
