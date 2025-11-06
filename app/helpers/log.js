import { helper } from '@ember/component/helper';

export default helper(function log(params) {
  console.log(...params);
});
