import { helper } from '@ember/component/helper';

export function formatDuration([seconds]) {
  if (!seconds || seconds === "0") {
    return '00:00:00';
  }

  // Convert to number if it's a string
  const totalSeconds = parseInt(seconds, 10);

  // Handle invalid input
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    return '00:00:00';
  }

  // Calculate hours, minutes and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  // Format with zero padding
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export default helper(formatDuration);
