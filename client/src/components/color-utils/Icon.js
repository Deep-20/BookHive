import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import Iconify from '../iconify';

// ----------------------------------------------------------------------

// PropTypes definition for component props
Icon.propTypes = {
  sx: PropTypes.object,      // Custom styles object
  checked: PropTypes.bool,   // Controls if icon is selected/checked
  whiteColor: PropTypes.bool, // Controls if icon should use white color variant
};

export default function Icon({ checked, whiteColor, sx, ...other }) {
  // Shadow element - appears when icon is checked
  // Creates a subtle shadow effect behind the icon
  const shadow = (
    <Box
      sx={{
        width: 1,
        height: 1,
        opacity: 0.48,
        borderRadius: '50%',
        position: 'absolute',
        boxShadow: '4px 4px 8px 0 currentColor',
      }}
    />
  );

  // Checkmark icon element
  // Only visible when checked prop is true
  // Color changes based on whiteColor prop
  const icon = (
    <Iconify
      icon="eva:checkmark-fill"
      sx={{
        opacity: 0, // Hidden by default
        ...(checked && {
          opacity: 1, // Show when checked
          color: 'common.white',
          ...(whiteColor && {
            color: 'common.black', // Use black if whiteColor is true
          }),
        }),
      }}
    />
  );

  // Main container element
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        display: 'flex',
        borderRadius: '50%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'currentColor',
        // Smooth transition animation for all changes
        transition: (theme) =>
          theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
          }),
        // Special styles for white color variant
        ...(whiteColor && {
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          boxShadow: (theme) => `4px 4px 8px 0 ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
        // Scale up when checked
        ...(checked && {
          transform: 'scale(1.4)',
        }),
        ...sx, // Apply any custom styles passed via sx prop
      }}
      {...other} // Spread any additional props
    >
      {checked && shadow} {/* Render shadow only when checked */}

      {icon} {/* Always render the icon (visibility controlled by opacity) */}
    </Box>
  );
}
