import ApplicationAdapter from './application';

export default class VoiceAdapter extends ApplicationAdapter {
  pathForType(type) {
    return 'Voice.';
  }
}
