import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Backdrop(theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        // The root style affects the default backdrop appearance
        // Uses alpha to create a semi-transparent dark overlay (80% opacity)
        root: {
          backgroundColor: alpha(theme.palette.grey[800], 0.8),
        },
        // The invisible variant removes the background completely
        // Useful for custom backdrop implementations
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
