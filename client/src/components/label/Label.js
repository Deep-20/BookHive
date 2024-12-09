import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import { StyledLabel } from './styles';

// ----------------------------------------------------------------------

/**
 * Label Component - A customizable label/tag component
 * @param {object} props - Component props
 * @param {node} props.children - Content to be displayed inside the label
 * @param {string} props.color - Color variant of the label (default, primary, etc.)
 * @param {string} props.variant - Style variant of the label (soft, filled, etc.)
 * @param {node} props.startIcon - Icon to display at the start of the label
 * @param {node} props.endIcon - Icon to display at the end of the label
 * @param {object} props.sx - Additional MUI system styles
 */
const Label = forwardRef(({ children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other }, ref) => {
  const theme = useTheme();

  // Common styling for both start and end icons
  const iconStyle = {
    width: 16,
    height: 16,
    '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
  };

  return (
    <StyledLabel
      ref={ref}
      component="span"
      ownerState={{ color, variant }}
      sx={{
        // Add left padding if there's a start icon
        ...(startIcon && { pl: 0.75 }),
        // Add right padding if there's an end icon
        ...(endIcon && { pr: 0.75 }),
        ...sx,
      }}
      theme={theme}
      {...other}
    >
      {/* Render start icon if provided */}
      {startIcon && <Box sx={{ mr: 0.75, ...iconStyle }}> {startIcon} </Box>}

      {children}

      {/* Render end icon if provided */}
      {endIcon && <Box sx={{ ml: 0.75, ...iconStyle }}> {endIcon} </Box>}
    </StyledLabel>
  );
});

// PropTypes for type checking and documentation
Label.propTypes = {
  sx: PropTypes.object,
  endIcon: PropTypes.node,
  children: PropTypes.node,
  startIcon: PropTypes.node,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost', 'soft']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error']),
};

export default Label;
