import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { Radio, RadioGroup } from '@mui/material';
//
import Icon from './Icon';

// ----------------------------------------------------------------------

/**
 * ColorSinglePicker - A component for selecting a single color from a list of colors
 * @param {Object} props - Component props
 * @param {string[]} props.colors - Array of color values (hex codes or color names)
 * @param {Ref} ref - Forwarded ref from parent component
 * @returns {JSX.Element} Radio group of color options
 */
const ColorSinglePicker = forwardRef(({ colors, ...other }, ref) => (
  <RadioGroup row ref={ref} {...other}>
    {colors.map((color) => {
      // Special handling for white color to ensure visibility
      const whiteColor = color === '#FFFFFF' || color === 'white';

      return (
        <Radio
          key={color}
          value={color}
          color="default"
          // Custom icon components for both unchecked and checked states
          icon={<Icon whiteColor={whiteColor} />}
          checkedIcon={<Icon checked whiteColor={whiteColor} />}
          sx={{
            color, // Uses the color value for the radio button
            '&:hover': { opacity: 0.72 }, // Hover effect
            '& svg': { width: 12, height: 12 }, // Icon size
          }}
        />
      );
    })}
  </RadioGroup>
));

// PropTypes validation
ColorSinglePicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default ColorSinglePicker;
