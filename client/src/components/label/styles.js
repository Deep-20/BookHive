// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

// StyledLabel: A customizable label component built on MUI Box
// Supports variants: filled, outlined, soft
// Supports custom colors from theme palette
export const StyledLabel = styled(Box)(({ theme, ownerState }) => {
  const isLight = theme.palette.mode === 'light';

  // Track which variant is being used
  const filledVariant = ownerState.variant === 'filled';
  const outlinedVariant = ownerState.variant === 'outlined';
  const softVariant = ownerState.variant === 'soft';

  // Styles for default color (grey-based)
  const defaultStyle = {
    ...(ownerState.color === 'default' && {
      // Outlined variant: transparent background with grey border
      ...(outlinedVariant && {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
      }),
      // Soft variant: semi-transparent grey background
      ...(softVariant && {
        color: isLight ? theme.palette.text.primary : theme.palette.common.white,
        backgroundColor: alpha(theme.palette.grey[500], 0.16),
      }),
    }),
  };

  // Styles for custom colors from theme palette
  const colorStyle = {
    ...(ownerState.color !== 'default' && {
      // Filled variant: solid background with contrast text
      ...(filledVariant && {
        color: theme.palette[ownerState.color].contrastText,
        backgroundColor: theme.palette[ownerState.color].main,
      }),
      // Outlined variant: colored border and text, transparent background
      ...(outlinedVariant && {
        backgroundColor: 'transparent',
        color: theme.palette[ownerState.color].main,
        border: `1px solid ${theme.palette[ownerState.color].main}`,
      }),
      // Soft variant: semi-transparent colored background
      ...(softVariant && {
        color: theme.palette[ownerState.color][isLight ? 'dark' : 'light'],
        backgroundColor: alpha(theme.palette[ownerState.color].main, 0.16),
      }),
    }),
  };

  // Base styles applied to all variants
  return {
    height: 24,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    textTransform: 'capitalize',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,
    // Apply color and variant-specific styles
    ...colorStyle,
    ...defaultStyle,
  };
});
