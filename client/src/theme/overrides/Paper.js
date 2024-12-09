// ----------------------------------------------------------------------

export default function Paper() {
  return {
    MuiPaper: {
      // Set default elevation to 0 (flat) for all Paper components
      defaultProps: {
        elevation: 0,
      },
      // Custom style modifications for Paper components
      styleOverrides: {
        root: {
          // Remove any default background images/patterns
          backgroundImage: 'none',
        },
      },
    },
  };
}
