import DOMPurify from 'dompurify';

// Configure DOMPurify to remove all HTML tags and attributes
DOMPurify.setConfig({
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
});

// Regex to strip known dangerous command-like prefixes
const commandPrefixes = [
  'redirect',
  'rewrite',
  'location',
  'script',
  'set-cookie',
  'content-disposition',
  'refresh',
  'window-location',
  'meta',
  'eval',
  'expression',
  'document',
  'javascript',
  'vbscript',
  'data',
  'base',
  'iframe',
  'object',
  'embed',
  'formaction',
];

const commandRegex = new RegExp(`^\\s*(${commandPrefixes.join('|')})\\b.*`, 'i');
// JS-context breaker detection
// const jsContextRegex = /\b(alert|confirm|prompt|Function|eval|setTimeout|setInterval)\s*\(|["']\s*;|\/\/|\/\*|\*\/|[{}]/i;

// Map of common obfuscated characters → ASCII equivalents
const charMap = {
  '¼': '<',  // U+00BC VULGAR FRACTION ONE QUARTER
  '¾': '>',  // U+00BE VULGAR FRACTION THREE QUARTERS
  '¢': '"',  // U+00A2 CENT SIGN
  '‘': "'",  // U+2018 LEFT SINGLE QUOTE
  '’': "'",  // U+2019 RIGHT SINGLE QUOTE
  '“': '"',  // U+201C LEFT DOUBLE QUOTE
  '”': '"',  // U+201D RIGHT DOUBLE QUOTE
};
function normalizeExtendedASCII(str) {
  const pattern = new RegExp(`[${Object.keys(charMap).join('')}]`, 'g');
  return str.replace(pattern, ch => charMap[ch] || '');
}

export default function sanitizeString(input) {
  if (typeof input !== 'string') return '';

  let clean = normalizeExtendedASCII(input);
  clean = DOMPurify.sanitize(clean);//Remove HTML tags/attributes
  
  if (commandRegex.test(clean)) {//command-style lines (full-line)
    clean = '';
  }
  // if (jsContextRegex.test(clean)) {
  //   console.log('Potential JavaScript context breaker detected:', clean);
  //   return '';
  // }

  clean = clean.replace(/&(lt|gt|#\d+|#x[0-9a-f]+);?/gi, ''); // Remove HTML entities for <, >, and numeric equivalents (decimal/hex). Ex. matched: &lt;, &LT, &gt, &GT, &#34;, &#x2
  clean = clean.replace(/[<>"'`\\()]/g, '');// Remove any of the special characters < > " ' \ ( ) `
  return clean;
}
