import {
  validatePresence,
  validateLength,
} from 'ember-changeset-validations/validators';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import validateDurationWithinDay from '../validations/validate-schedule-duration';
import { tracked } from '@glimmer/tracking';

export default class ParametersValidator extends Service {
  @service intl;

  /**
   * Dynamic validator builder
   * @param {Object} fields - key/value mapping where key = fieldName, value = fieldKey (string)
   * Example: { startTime: "StartTime", endTime: "EndTime", days: "WeekDay", name: "Name" }
   */
  validate(fields = {}) {
    let parameters = {};

    Object.entries(fields).forEach(([key, fieldName]) => {
      switch (key) {
        case 'startTime':
          parameters[fieldName] = [
            validatePresence({
              presence: true,
              message: this.intl.t('ERROR_MESSAGE_SET_START_TIME'),
            }),
          ];
          break;

        case 'endTime':
          parameters[fieldName] = [
            validatePresence({
              presence: true,
              message: this.intl.t('ERROR_MESSAGE_SET_END_TIME'),
            }),
            validateDurationWithinDay({
              startField: fields.startTime,
              endField: fieldName,
            }),
          ];
          break;

        case 'days':
          parameters[fieldName] = [
            validatePresence({
              presence: true,
              message: this.intl.t('ERROR_MESSAGE_SELECT_DAYS'),
            }),
          ];
          break;

        case 'name':
          parameters[fieldName] = [
            validatePresence({
              presence: true,
              message: this.intl.t('ERROR_MESSAGE_NAME_REQUIRED'),
            }),
            validateLength({
              min: 1,
              max: 64,
              message: this.intl.t('ERROR_MESSAGE_NAME_INVALID_LENGTH'),
            }),
          ];
          break;

        default:
          // fallback if new fields are added later
          parameters[fieldName] = [
            validatePresence({
              presence: true,
              message: this.intl.t('ERROR_MESSAGE_REQUIRED_FIELD', { field: fieldName }),
            }),
          ];
          break;
      }
    });

    return { parameters };
  }
}
