import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DnsInputComponent extends Component {
  @service intl;
  @service eaactrl;
  @tracked errorMessage = '';
  @tracked segments =[{ value: '' },
                      { value: '' },
                      { value: '' },
                      { value: '' }];

  constructor() {
    super(...arguments);
    this.initializeSegments();
  }

  initializeSegments() {
    if (this.args.value) {
      const parts = this.args.value.split('.');
      this.segments = parts.map((part, index) => {
        return { value: part || '' };
      });
    }
  }

  @action
  updateSegment(index, event) {
    this.segments[index].value = event.target.value;
    this.updateIpAddress();
  }

  isValidIpAddress(ipSegments) {
  const ipAddress = ipSegments.map(s => s.value).join('.');

  // Validate complete IP address format
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!ipRegex.test(ipAddress)) {
    return { isValid: false, error: this.intl.t('PAGE_SETTINGS_LAN_POPUP_ERROR_IP_ADDRESS_INVALID')};
  }

  return { isValid: true, ipAddress };
}

updateIpAddress() {
  const validationResult = this.isValidIpAddress(this.segments);
  
  if (!validationResult.isValid) {
      this.errorMessage = validationResult.error;
    return;
  }

  if (this.args.onChange) {
    this.args.onChange(validationResult.ipAddress);
  }
  this.errorMessage = '';
}
}
