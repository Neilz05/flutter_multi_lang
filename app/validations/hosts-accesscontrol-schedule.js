import {
    validatePresence,
    validateLength,
    validateFormat,
} from 'ember-changeset-validations/validators';

import validateDurationWithinDay from './schedule-duration';
import validateOverlappingSchedule from './overlapping-schedule';

export default function AccessControlScheduleValidator(schedules) {
    return {
        Duration: [
            validatePresence({
                presence: true,
                message: 'ERROR_MESSAGE_DURATION_REQUIRED',
            }),
            validateDurationWithinDay(),
            validateOverlappingSchedule(schedules),
        ],
        StartTime: [
            validatePresence({
                presence: true,
                message: 'ERROR_MESSAGE_STARTTIME_REQUIRED',
            }),
        ],
        Day: [
            validatePresence({
                presence: true,
                message: 'ERROR_MESSAGE_DAY_REQUIRED',
            }),
        ],
    };
}