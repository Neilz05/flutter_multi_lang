import { helper } from '@ember/component/helper';

export default helper(function arrayAt([index, array]) {
  if (!Array.isArray(array)) {
    console.warn('Provided value is not an array:', array);
    return null;
  }
  if (typeof index !== 'number' || index < 0 || index >= array.length) {
    console.warn('Invalid index or out of bounds:', index);
    return null;
  }
  return array[index];
});
