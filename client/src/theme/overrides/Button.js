import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        // Base styles for all buttons
        root: {
          '&:hover': {
            boxShadow: 'none', // Removes shadow on hover for all buttons
          },
        },
        // Large button size variant
        sizeLarge: {
          height: 48,
        },
        // Styles for contained buttons with 'inherit' color
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        // Styles for contained primary buttons
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        },
        // Styles for contained secondary buttons
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        // Styles for outlined buttons with 'inherit' color
        outlinedInherit: {
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`, // Semi-transparent border
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        // Styles for text buttons with 'inherit' color
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
