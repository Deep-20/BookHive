import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// Base grey scale used throughout the application
// Used for text, backgrounds, and various UI elements
const GREY = {
  0: '#FFFFFF',  // Pure white
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24', // Nearly black
};

// Primary color scheme - Main brand color
// Used for primary buttons, links, and key UI elements
const PRIMARY = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#2065D1',
  dark: '#103996',
  darker: '#061B64',
  contrastText: '#fff',
};

// Secondary color palette
// Used for secondary actions and complementary UI elements
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};

// Information color scheme
// Used for informational messages, tooltips, and help elements
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};

// Success color scheme
// Used for positive actions, success messages, and confirmations
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

// Warning color scheme
// Used for warning messages and cautionary actions
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};

// Error color scheme
// Used for error states, destructive actions, and important alerts
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

// Main theme palette configuration
// Combines all color schemes and defines global theme properties
const palette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),    // Hover state with 8% opacity
    selected: alpha(GREY[500], 0.16),  // Selected state with 16% opacity
    disabled: alpha(GREY[500], 0.8),   // Disabled state with 80% opacity
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),     // Focus state with 24% opacity
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
