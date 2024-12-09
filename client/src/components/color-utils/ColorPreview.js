import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';

// ----------------------------------------------------------------------

// Define PropTypes for type checking
ColorPreview.propTypes = {
  sx: PropTypes.object,      // Custom styles object
  limit: PropTypes.number,   // Maximum number of colors to display
  colors: PropTypes.arrayOf(PropTypes.string), // Array of color values
};

export default function ColorPreview({ colors, limit = 3, sx }) {
  // Slice the colors array to show only up to the limit
  const showColor = colors.slice(0, limit);

  // Calculate how many additional colors are not shown
  const moreColor = colors.length - limit;

  return (
    // Stack component acts as a flex container for the color circles
    <Stack component="span" direction="row" alignItems="center" justifyContent="flex-end" sx={sx}>
      {/* Map through colors and create circular color previews */}
      {showColor.map((color, index) => (
        <Box
          key={color + index}
          sx={{
            ml: -0.75,                    // Negative margin for overlapping effect
            width: 16,
            height: 16,
            borderRadius: '50%',          // Makes the box circular
            border: (theme) => `solid 2px ${theme.palette.background.paper}`, // White border around circles
            boxShadow: (theme) => `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`, // Inner shadow for depth
            bgcolor: color,               // Apply the color from the array
          }}
        />
      ))}

      {/* Show count of remaining colors if exceeding the limit */}
      {colors.length > limit && <Typography variant="subtitle2">{`+${moreColor}`}</Typography>}
    </Stack>
  );
}
