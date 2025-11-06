import { helper } from '@ember/component/helper';
import DOMPurify from 'dompurify';

export default helper(function sanitizeHtml([rawHtml]) {
  return DOMPurify.sanitize(rawHtml);
});
