// This function customizes the Material-UI Table component styling
// It receives the theme object as a parameter to access theme values
export default function Table(theme) {
  return {
    // Override styles for MuiTableCell component
    MuiTableCell: {
      styleOverrides: {
        // Specifically targeting table header cells
        head: {
          // Sets the header text color using the theme's secondary text color
          color: theme.palette.text.secondary,
          // Sets the header background color using the theme's neutral background
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
  };
}
