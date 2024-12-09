// @mui
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Creates a blur effect with background color overlay
 * @param {Object} props - Configuration object
 * @param {string} props.color - Background color (default: #000000)
 * @param {number} props.blur - Blur intensity in pixels (default: 6)
 * @param {number} props.opacity - Color overlay opacity (default: 0.8)
 * @param {string} props.imgUrl - Optional background image URL
 */
export function bgBlur(props) {
  const color = props?.color || '#000000';
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    };
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
}

// ----------------------------------------------------------------------

/**
 * Creates a gradient background effect
 * @param {Object} props - Configuration object
 * @param {string} props.direction - Gradient direction (default: 'to bottom')
 * @param {string} props.startColor - Starting gradient color
 * @param {string} props.endColor - Ending gradient color
 * @param {string} props.imgUrl - Optional background image URL
 * @param {string} props.color - Fallback color for single-color gradient
 */
export function bgGradient(props) {
  const direction = props?.direction || 'to bottom';
  const startColor = props?.startColor;
  const endColor = props?.endColor;
  const imgUrl = props?.imgUrl;
  const color = props?.color;

  if (imgUrl) {
    return {
      background: `linear-gradient(${direction}, ${startColor || color}, ${endColor || color}), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
  }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}

// ----------------------------------------------------------------------

/**
 * Creates text with gradient effect
 * Uses webkit-specific properties for gradient text effect
 * @param {string} value - Gradient value string (e.g., '45deg, red, blue')
 */
export function textGradient(value) {
  return {
    background: `-webkit-linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
}

// ----------------------------------------------------------------------

/**
 * Applies CSS filters with cross-browser support
 * @param {string} value - Filter value (e.g., 'blur(5px)', 'brightness(150%)')
 */
export function filterStyles(value) {
  return {
    filter: value,
    WebkitFilter: value,
    MozFilter: value,
  };
}

// ----------------------------------------------------------------------

/**
 * Utility style to hide vertical scrollbar while maintaining scroll functionality
 * Works across different browsers (Chrome, Firefox, Safari, IE)
 */
export const hideScrollbarY = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

// ----------------------------------------------------------------------

/**
 * Utility style to hide horizontal scrollbar while maintaining scroll functionality
 * Works across different browsers (Chrome, Firefox, Safari, IE)
 */
export const hideScrollbarX = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowX: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};
