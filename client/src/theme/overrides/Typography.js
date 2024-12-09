// This file customizes Material-UI's Typography component default styles

export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        // Modifies the styling for <Typography variant="paragraph">
        // Adds more spacing at the bottom of paragraph elements
        paragraph: {
          marginBottom: theme.spacing(2), // 16px by default (with default spacing of 8)
        },
        // Modifies the styling when gutterBottom prop is used
        // e.g., <Typography gutterBottom>
        gutterBottom: {
          marginBottom: theme.spacing(1), // 8px by default
        },
      },
    },
  };
}
