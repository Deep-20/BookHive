import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Input(theme) {
  return {
    // Base input styling
    MuiInputBase: {
      styleOverrides: {
        root: {
          // Style for disabled state icons
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled },
          },
        },
        input: {
          // Ensure placeholder has consistent opacity and color
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
        },
      },
    },

    // Standard input variant styling
    MuiInput: {
      styleOverrides: {
        underline: {
          // Default underline color before interaction
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
        },
      },
    },

    // Filled input variant styling
    MuiFilledInput: {
      styleOverrides: {
        root: {
          // Background color states for filled variant
          backgroundColor: alpha(theme.palette.grey[500], 0.12),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        // Underline styling for filled variant
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
        },
      },
    },

    // Outlined input variant styling
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Border color for outlined variant
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.grey[500], 0.32),
          },
          // Disabled state border color
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  };
}
