// ----------------------------------------------------------------------

export default function Card(theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          // Applies custom shadow defined in theme
          boxShadow: theme.customShadows.card,
          // Makes corners twice as rounded as the default theme borderRadius
          borderRadius: Number(theme.shape.borderRadius) * 2,
          position: 'relative',
          // Fixes a Safari-specific issue with overflow:hidden on bordered elements
          zIndex: 0,
        },
      },
    },
    // Configures the header section of cards
    MuiCardHeader: {
      // Sets default typography variants for title and subheader
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          // Applies padding: 24px on left/right/top, 0px bottom
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          // Applies uniform padding of 24px on all sides (assuming theme.spacing(1) = 8px)
          padding: theme.spacing(3),
        },
      },
    },
  };
}
