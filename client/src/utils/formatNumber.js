import numeral from 'numeral';

// ----------------------------------------------------------------------

// Basic number formatting with default numeral.js settings
export function fNumber(number) {
  return numeral(number).format();
}

// Format number as currency with 2 decimal places (e.g., $1,234.56)
// Returns empty string if number is falsy
export function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.00') : '';

  return result(format, '.00');
}

// Convert decimal to percentage with 1 decimal place (e.g., 0.1234 -> 12.3%)
// Assumes input is in decimal form (e.g., 12.34 represents 12.34%)
export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

// Shorten large numbers with suffix (e.g., 1234567 -> 1.23m)
// Uses abbreviations: k (thousands), m (millions), b (billions), etc.
export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

// Format data sizes with binary suffixes (e.g., 1234 -> 1.2 KB)
// Uses binary units: b (bytes), KB, MB, GB, etc.
export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

// Helper function to clean up formatted numbers by removing unnecessary decimal places
// If the formatted number ends with the specified key (default '.00'),
// removes it to show clean integers
function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
