import PropTypes from 'prop-types';
// @mui
import {Box, TableCell, TableHead, TableRow, TableSortLabel} from '@mui/material';

// ----------------------------------------------------------------------

// Styles for accessibility - hides sort direction text but keeps it available for screen readers
const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

// PropTypes definition for component props validation
GenreListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),    // Sort order: ascending or descending
  orderBy: PropTypes.string,                   // Column ID being sorted
  headLabel: PropTypes.array,                  // Array of column definitions
  onRequestSort: PropTypes.func,               // Callback function for sort events
};

export default function GenreListHead({
  order,
  orderBy,
  headLabel,
  onRequestSort,
}) {
  // Creates a sort handler function for a specific column
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            // Aligns content right if specified in headCell, otherwise left
            align={headCell.alignRight ? 'right' : 'left'}
            // Sets sort direction for current column if it's the active sort column
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              // Indicates if this column is currently being sorted
              active={orderBy === headCell.id}
              // Sets sort direction, defaults to 'asc' if column isn't currently sorted
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* Accessibility text for screen readers indicating sort direction */}
              {orderBy === headCell.id ? (
                <Box sx={{...visuallyHidden}}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
