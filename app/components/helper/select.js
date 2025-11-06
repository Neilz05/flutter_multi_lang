import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SelectComponent extends Component {
  get firewallLevels() {
    let levels_str = "Low,High,Advanced,Policy";
    let levels = [];
    levels_str.split(',').forEach((level) => {
      levels.push({ key: level, label: level});
    })
    return levels;
  }

  get selOptions() {
    let options = [];
    this.args.options.forEach((value) => {
      options.push({
        key : value[this.args.optValue] || value,
        label : value[this.args.optLabel] || value,
      });
    });
    return options;
  }

  get disabled() {
    return this.args.disabled ? 'disabled' : '';
  }
  
  get hasValidSelection() {
    return this.selOptions.some((opt) => opt.key == this.args.value);
  }

  @action
  update(event) {
    this.args.onChange(event.currentTarget.value);
  }
}
