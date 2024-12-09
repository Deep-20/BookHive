import { filter } from "lodash";

/**
 * Compares two values for descending sort order
 * @param {any} a - First value to compare
 * @param {any} b - Second value to compare
 * @param {string} orderBy - Property key to sort by
 * @returns {number} -1, 0, or 1 for sorting
 */
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Creates a comparator function for sorting based on order direction
 * @param {string} order - Sort direction ('asc' or 'desc')
 * @param {string} orderBy - Property key to sort by
 * @returns {Function} Comparator function
 */
const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

/**
 * Applies sorting and filtering to an array of data
 * @param {Array} array - Data array to sort/filter
 * @param {Function} comparator - Sorting comparator function
 * @param {string} query - Search query for filtering
 * @returns {Array} Sorted and filtered array
 */
const applySortFilter = (array, comparator, query) => {
  // Create stable sort by preserving original indices
  const stabilizedThis = array.map((el, index) => [el, index]);
  
  // Sort while maintaining stability for equal values
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];  // Use original index for stable sort
  });

  // If search query exists, filter by name property
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  
  // Return sorted array without indices
  return stabilizedThis.map((el) => el[0]);
}

export {getComparator, applySortFilter}
