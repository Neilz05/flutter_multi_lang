import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class WanWanmanagerComponent extends Component {
  get opModeOptions() {
    return [
      { key: 'Manual', label: 'Manual' },
      { key: 'Automatic', label: 'Automatic' },
    ];
  }

  get wanModeOptions() {
    var options = [];
    this.args.model.WAN.forEach((wan) => {
      options.push({ key: wan.Alias, label: wan.Alias });
    });
    return options;
  }

  get hasChanges() {
    let isDirty = this.args.model.hasDirtyAttributes;

    this.args.model.WAN.forEach((wan) => {
      if (wan.hasDirtyAttributes) {
        isDirty = true;
      }

      wan.Intf.forEach((iface) => {
        if (iface.hasDirtyAttributes) {
          isDirty = true;
        }
      });
    });

    return isDirty;
  }

  get isAutomatic() {
    return this.args.model.OperationMode == 'Automatic' ? true : false;
  }

  @action
  setOperationMode(operationMode) {
    this.args.model.OperationMode = operationMode;
  }

  @action
  setWanMode(wanMode) {
    this.args.model.WANMode = wanMode;
  }

  @action
  updateWanManager() {
    if (this.args.model.hasDirtyAttributes) {
      this.args.model.save();
    }

    // save relationships
    this.args.model.WAN.forEach((wan) => {
      if (wan.hasDirtyAttributes) {
        wan.save();
      }

      wan.Intf.forEach((iface) => {
        if (iface.hasDirtyAttributes) {
          iface.save();
        }
      });
    });
  }
}
