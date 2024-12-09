// Import individual component style overrides
import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import Table from './Table';
import Button from './Button';
import Tooltip from './Tooltip';
import Backdrop from './Backdrop';
import Typography from './Typography';
import Autocomplete from './Autocomplete';

// ----------------------------------------------------------------------

/**
 * Combines all component style overrides into a single theme override object
 * @param {Object} theme - The base theme object
 * @returns {Object} Combined style overrides for all components
 */
export default function ComponentsOverrides(theme) {
  return Object.assign(
    // Merge all component-specific style overrides into a single object
    Card(theme),
    Table(theme),
    Input(theme),
    Paper(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    Autocomplete(theme)
  );
}
