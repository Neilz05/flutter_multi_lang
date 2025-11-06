import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';

export default class WifiRadioSplitComponent extends Component {
  get enabled() {
    return this.args.radio.get('Enable') == 1 ? true : false;
  }

  @action
  Toggle(record, attr) {
    record[attr] = record[attr] == 1 ? 0 : 1
  }

  set enabled(value) {
    set(this.args.radio, 'Enable', value ? 1 : 0);
  }

  get autoChannelEnabled() {
    return this.args.radio.get('AutoChannelEnable') == 1 ? true : false;
  }

  set autoChannelEnabled(value) {
    set(this.args.radio, 'AutoChannelEnable', value ? 1 : 0);
  }

  get channels() {
    let channels = [];
    this.args.radio.get('PossibleChannels').split(',').forEach((channel) => {
      channels.push(channel);
    });
    // Looks like Radio.PossibleChannels when done with the code above, results in an array of strings representing the channels, which causes confusion
    // mapping it to number allows it to become an arary of ints, which makes it easier to handle. 
    // also Radio.Channel is an int, so need them to be both ints to allow proper comparision. 
    channels = channels.map(Number)
    return channels;
  }

  @action
  setChannel(channel) {
    // same thing here, when calling set() the value for the WiFi.Radio.Channel becomes "xx" rather than xx. 
    set(this.args.radio, 'Channel', Number(channel.target.value));
  }
}
