// This file customizes the Material-UI Autocomplete component's default styling

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        // Modifies the dropdown paper component of the Autocomplete
        paper: {
          // Applies custom shadow defined in theme.customShadows.z20
          // This affects the dropdown menu's elevation/depth appearance
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  };
}
