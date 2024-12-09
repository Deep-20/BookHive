import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Box } from '@mui/material';
//
import { StyledRootScrollbar, StyledScrollbar } from './styles';

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

// Custom scrollbar with mobile/desktop handling
function Scrollbar({ children, sx, ...other }) {
  // Check for SSR
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  // Mobile detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // Use simple overflow for mobile
  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  // Custom scrollbar for desktop
  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);
