import PropTypes from 'prop-types';
// @mui - Material UI components
import { Box, Checkbox } from '@mui/material';
// Custom Icon component for checkbox display
import Icon from './Icon';

// ----------------------------------------------------------------------

// PropTypes definition for type checking
ColorMultiPicker.propTypes = {
  // Style object for the container Box component
  sx: PropTypes.object,
  // Array of color values (hex codes or color names)
  colors: PropTypes.array,
  // Callback function triggered when a color is selected/deselected
  onChangeColor: PropTypes.func,
  // Array of currently selected color values
  selected: PropTypes.arrayOf(PropTypes.string),
};

/**
 * ColorMultiPicker Component
 * A component that displays a group of color checkboxes for multiple color selection
 * 
 * @param {Object} props
 * @param {string[]} props.colors - Array of available colors to choose from
 * @param {string[]} props.selected - Array of currently selected color values
 * @param {Function} props.onChangeColor - Callback function when color selection changes
 * @param {Object} props.sx - Custom styles to apply to the container
 * @param {Object} props.other - Additional props to be spread to the Checkbox components
 */
export default function ColorMultiPicker({ colors, selected, onChangeColor, sx, ...other }) {
  return (
    // Container Box component with custom styles
    <Box sx={sx}>
      {/* Map through each color to create individual color checkboxes */}
      {colors.map((color) => {
        // Special handling for white color to ensure visibility
        const whiteColor = color === '#FFFFFF' || color === 'white';

        return (
          <Checkbox
            key={color}
            size="small"
            value={color}
            color="default"
            // Checkbox is checked if color exists in selected array
            checked={selected.includes(color)}
            // Trigger onChangeColor callback when checkbox is clicked
            onChange={() => onChangeColor(color)}
            // Custom Icon components for unchecked and checked states
            icon={<Icon whiteColor={whiteColor} />}
            checkedIcon={<Icon checked whiteColor={whiteColor} />}
            sx={{
              color, // Set checkbox color to the color value
              '&:hover': { opacity: 0.72 }, // Hover effect
              '& svg': { width: 12, height: 12 }, // Size of the checkbox icon
            }}
            {...other} // Spread additional props
          />
        );
      })}
    </Box>
  );
}
