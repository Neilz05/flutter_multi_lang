import { helper } from '@ember/component/helper';

export function formatCallDate([dateString]) {
  if (!dateString) {
    return '';
  }

  // Parse the input date
  const inputDate = new Date(dateString);

  // Format as dd.mm.yyyy
  const day = String(inputDate.getDate()).padStart(2, '0');
  const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed
  const year = inputDate.getFullYear();

  return `${day}.${month}.${year}`;
}

export default helper(formatCallDate);
