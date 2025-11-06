import { getOwner } from '@ember/application';

export default function validateDurationWithinDay({ startField = 'StartTime', endField = null } = {}) {
    
    return (key, value, _oldValue, changes, content) => {
        const owner = getOwner(content);
        const intl = owner.lookup('service:intl');
        const MAX_SECONDS_IN_DAY = 86400;
        const MESSAGES = {
            DURATION_TOO_SHORT: intl.t('ERROR_MESSAGE_DURATION_TOO_SHORT'),
            EXCEEDS_MIDNIGHT: intl.t('ERROR_MESSAGE_EXCEEDS_MIDNIGHT')
        };
        // Helper to get value from nested or flat structure
        const getValue = (field) => 
            changes?.parameters?.[field] ?? 
            changes?.[`parameters.${field}`] ?? 
            content?.parameters?.[field];

        const startTime = getValue(startField);
        const endTime = endField ? getValue(endField) : null;
        const startSeconds = timeToSeconds(startTime);

        if (endTime) {
            const endSeconds = timeToSeconds(endTime);
            if (endSeconds <= startSeconds) {
                return endSeconds < startSeconds 
                    ? MESSAGES.EXCEEDS_MIDNIGHT 
                    : MESSAGES.DURATION_TOO_SHORT;
            }
        } else {
            // Validate duration value
            if (value <= 0) {
                return MESSAGES.DURATION_TOO_SHORT;
            }
            if (startSeconds + value >= MAX_SECONDS_IN_DAY) {
                return MESSAGES.EXCEEDS_MIDNIGHT;
            }
        }

        return true;
    };
}

function timeToSeconds(timeString) {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours * 3600) + (minutes * 60);
}