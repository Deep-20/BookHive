// ----------------------------------------------------------------------

// Custom theme override for Material-UI Tooltip component
export default function Tooltip(theme) {
  return {
    MuiTooltip: {  // Target Material-UI's Tooltip component
      styleOverrides: {
        tooltip: {
          // Customize the tooltip background color using the theme's grey palette
          backgroundColor: theme.palette.grey[800],
        },
        arrow: {
          // Match the arrow color with the tooltip background
          color: theme.palette.grey[800],
        },
      },
    },
  };
}
