import { helper } from '@ember/component/helper';
import sanitizeString from '../utils/sanitize';

export default helper(function sanitize([htmlString]) {
  return sanitizeString(htmlString);
});
