import { helper } from '@ember/component/helper';

// export default helper(function inc(positional/*, named*/) {
  // return positional;
// });

export function inc([number]) {
  return number + 1;
}

export default helper(inc);