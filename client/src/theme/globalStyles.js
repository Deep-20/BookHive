// @mui
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        // Apply border-box sizing to all elements for consistent layouts
        '*': {
          boxSizing: 'border-box',
        },
        // Reset HTML element and ensure full viewport coverage
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch', // Improve scrolling on iOS devices
        },
        // Reset body element and ensure full viewport coverage
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        // Ensure root element takes full viewport
        '#root': {
          width: '100%',
          height: '100%',
        },
        // Remove spinner buttons from number input fields
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield', // Firefox
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        // Ensure images are responsive
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        // Reset list styles
        ul: {
          margin: 0,
          padding: 0,
        },
      }}
    />
  );

  return inputGlobalStyles;
}
