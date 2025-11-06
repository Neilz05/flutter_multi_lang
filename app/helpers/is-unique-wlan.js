import { helper } from '@ember/component/helper';

let renderedAliases = new Set();

export function isUniqueWlan([alias]) {
  if (renderedAliases.has(alias)) {
    return false;
  } else {
    renderedAliases.add(alias);
    return true;
  }
}

export function resetRenderedAliases() {
  renderedAliases.clear();
}

export default helper(isUniqueWlan);