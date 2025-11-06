// app/helpers/divide.js
import { helper } from '@ember/component/helper';

export default helper(function divide([numerator, denominator]) {
  if (!denominator) {
    return 0; // Handle division by zero
  }
  return (numerator / denominator).toFixed(2); // Round to 2 decimal places
});
