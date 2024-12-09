import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

/**
 * Formats a date into a string using the specified format or default 'dd MMM yyyy'
 * @param {Date|string} date - The date to format
 * @param {string} newFormat - Optional custom format string
 * @returns {string} Formatted date string (e.g., "15 Mar 2024")
 */
export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

/**
 * Formats a date with time using the specified format or default 'dd MMM yyyy p'
 * @param {Date|string} date - The date to format
 * @param {string} newFormat - Optional custom format string
 * @returns {string} Formatted datetime string (e.g., "15 Mar 2024 11:30 AM")
 */
export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

/**
 * Converts a date to Unix timestamp (milliseconds since Unix epoch)
 * @param {Date|string} date - The date to convert
 * @returns {number} Unix timestamp in milliseconds
 */
export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

/**
 * Returns the relative time from now (e.g., "2 hours ago", "in 3 days")
 * @param {Date|string} date - The date to compare against current time
 * @returns {string} Human-readable relative time string
 */
export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
