import ApplicationAdapter from './application';

export default class GponAdapter extends ApplicationAdapter {
  pathForType(type) {
    return 'XPON.';
  }
}