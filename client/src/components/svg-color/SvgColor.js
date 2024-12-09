import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

/**
 * SvgColor component renders an SVG as a colored shape using CSS masks
 * @param {Object} props - Component props
 * @param {string} props.src - URL of the SVG to be rendered
 * @param {Object} props.sx - MUI system props for additional styling
 * @param {React.Ref} ref - Forwarded ref
 * @returns {React.Element} A styled span element displaying the colored SVG
 */
const SvgColor = forwardRef(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

SvgColor.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
};

export default SvgColor;
