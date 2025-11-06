import { helper } from '@ember/component/helper';

export function isFronthaul([multiaptype]) {
  return multiaptype == "FronthaulBSS";
}

export default helper(isFronthaul);