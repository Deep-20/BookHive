// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------

/**
 * Custom hook for responsive design queries
 * @param {('up'|'down'|'between'|'only')} query - The type of breakpoint query
 * @param {string} start - The starting breakpoint (e.g., 'sm', 'md', 'lg')
 * @param {string} [end] - The ending breakpoint (only required for 'between' query)
 * @returns {boolean} - Returns true if the media query matches
 */
export default function useResponsive(query, start, end) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

/**
 * Custom hook that returns the current breakpoint width
 * @returns {string} - Returns the current breakpoint key ('xs', 'sm', 'md', 'lg', 'xl')
 */
export function useWidth() {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}
