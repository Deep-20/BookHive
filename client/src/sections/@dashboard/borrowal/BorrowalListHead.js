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
BorrowalListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),    // Sort order (ascending or descending)
  orderBy: PropTypes.string,                   // Column ID being sorted
  headLabel: PropTypes.array,                  // Array of column definitions
  onRequestSort: PropTypes.func,               // Callback function for sort events
};

export default function BorrowalListHead({
  order,
  orderBy,
  headLabel,
  onRequestSort,
}) {
  // Creates a sort handler for a specific column
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}  // Handles text alignment
            sortDirection={orderBy === headCell.id ? order : false}  // Shows current sort direction
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}  // Highlights currently sorted column
              direction={orderBy === headCell.id ? order : 'asc'}  // Sets sort direction
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* Accessibility text for sort direction - hidden visually but available to screen readers */}
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
