import PropTypes from 'prop-types';
import { useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  // Define theme configuration options using useMemo for performance optimization
  const themeOptions = useMemo(
    () => ({
      palette, // Custom color palette configuration
      shape: { borderRadius: 6 }, // Global border radius setting
      typography, // Custom typography configuration (fonts, sizes, etc.)
      shadows: shadows(), // Custom shadow definitions
      customShadows: customShadows(), // Additional custom shadow configurations
    }),
    [] // Empty dependency array as these options are static
  );

  // Create the MUI theme instance with our options
  const theme = createTheme(themeOptions);
  // Apply component-specific style overrides
  theme.components = componentsOverride(theme);

  return (
    // StyledEngineProvider with injectFirst ensures proper CSS injection order
    <StyledEngineProvider injectFirst>
      {/* MUIThemeProvider makes the theme available to all child components */}
      <MUIThemeProvider theme={theme}>
        {/* CssBaseline normalizes browser styles */}
        <CssBaseline />
        {/* GlobalStyles applies custom global styles */}
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
