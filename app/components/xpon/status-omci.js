import Component from '@glimmer/component';

export default class StatusOmciComponent extends Component {
  get totalMessagesReceived() {
    return this.args.baseMsg + this.args.extMsg;
  }
}