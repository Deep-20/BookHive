// ----------------------------------------------------------------------

// Utility function to convert rem units to pixels
// Example: remToPx('1rem') => 16
export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

// Utility function to convert pixels to rem units
// Example: pxToRem(16) => '1rem'
export function pxToRem(value) {
  return `${value / 16}rem`;
}

// Creates responsive font sizes based on screen breakpoints
// sm: 600px and up
// md: 900px and up
// lg: 1200px and up
export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

// ----------------------------------------------------------------------

// Main font family configuration
const FONT_PRIMARY = 'Public Sans, sans-serif'; // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font

// Main typography configuration object
const typography = {
  // Base font settings
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,  // Normal text
  fontWeightMedium: 600,   // Medium emphasis
  fontWeightBold: 700,     // High emphasis

  // Heading styles (h1-h6)
  // Each heading includes:
  // - fontWeight: Bold/heavy weight for prominence
  // - lineHeight: Optimal spacing between lines
  // - fontSize: Base size in rem units
  // - responsiveFontSizes: Different sizes for different screen widths
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
};

export default typography;
