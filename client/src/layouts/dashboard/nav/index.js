import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Avatar, Box, Drawer, Link, Typography } from "@mui/material";
// mock
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
//
import navConfig from "./config";
import { useAuth } from "../../../hooks/useAuth";

// Define navigation drawer width
const NAV_WIDTH = 280;

// Styled component for the user account section in the navigation
const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// Main Navigation component that handles both desktop and mobile views
export default function Nav({ openNav, onCloseNav }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');

  // Close navigation drawer when route changes (mobile only)
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Common content for both desktop and mobile navigation drawers
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {height: 1, display: 'flex', flexDirection: 'column'},
      }}
    >
      <Box sx={{px: 2.5, py: 3, display: 'inline-flex'}}>
        <Logo/>
      </Box>

      <Box sx={{mb: 5, mx: 2.5}}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={user.photoUrl} alt="photoURL"/>

            <Box sx={{ml: 2}}>
              <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
                {user.name}
              </Typography>

              <Typography variant="body2" sx={{color: 'text.secondary'}}>
                {user.isAdmin ? "Librarian" : "Member"}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig.filter((navLink) => user.isAdmin || !(navLink.title === "Dashboard" || navLink.title === "Users"))}/>

      <Box sx={{flexGrow: 1}}/>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {/* Render permanent drawer for desktop */}
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {width: NAV_WIDTH},
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};