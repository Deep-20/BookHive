import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { IconButton, InputAdornment, OutlinedInput, Toolbar, Tooltip, Typography } from "@mui/material";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

// Styled components for custom toolbar styling
const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// Custom styled search input with animation and focus effects
const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

// Component props validation
UserListToolbar.propTypes = {
  numSelected: PropTypes.number,  // Number of selected items
  filterName: PropTypes.string,   // Current search/filter text
  onFilterName: PropTypes.func,   // Handler for search/filter changes
};

export default function UserListToolbar({ numSelected, filterName, onFilterName }) {
  return (
    <StyledRoot
      sx={{
        // Conditional styling when items are selected
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {/* Conditional rendering: Show either selected count or search input */}
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        // Search input with icon
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {/* Conditional rendering: Show either delete or filter button */}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
}
