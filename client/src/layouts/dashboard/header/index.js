import PropTypes from 'prop-types';
// @mui
import {styled} from '@mui/material/styles';
import {AppBar, Box, IconButton, Stack, Toolbar} from '@mui/material';
// utils
import {bgBlur} from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

// Width of the navigation drawer
const NAV_WIDTH = 280;

// Header height for mobile devices
const HEADER_MOBILE = 64;

// Header height for desktop devices
const HEADER_DESKTOP = 92;

// Styled AppBar component with blur effect and responsive width
const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    // Adjust width to account for nav drawer on desktop
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

// Styled Toolbar with responsive height and padding
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

/**
 * Header component for the dashboard layout
 * @param {Object} props
 * @param {Function} props.onOpenNav - Callback function to open navigation drawer on mobile
 */
export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        {/* Hamburger menu button - only visible on mobile */}
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/* Flexible spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right-aligned content container */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* User account menu */}
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
