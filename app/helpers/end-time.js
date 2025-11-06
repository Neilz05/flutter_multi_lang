import { helper } from '@ember/component/helper';

export default helper(function endTime([startTime, durationSeconds]) {
    if (!startTime || typeof durationSeconds !== 'number') return '';

    const [hours, minutes] = startTime.split(':').map(Number);

    // Convert start time to total seconds
    let totalSeconds = hours * 3600 + minutes * 60 + durationSeconds;

    // Convert back to HH:MM (24h format)
    let endHours = Math.floor(totalSeconds / 3600) % 24;
    let endMinutes = Math.floor((totalSeconds % 3600) / 60);

    // Pad with zeroes
    let pad = num => num.toString().padStart(2, '0');

    return `${pad(endHours)}:${pad(endMinutes)}`;
});
