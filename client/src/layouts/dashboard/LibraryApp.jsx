import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";
import { useAuth } from "../../hooks/useAuth";

// Constants for header height on different screen sizes
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

// Root container component with flex layout
const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

// Main content container with responsive padding
const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// Main layout component for the library application
export default function LibraryApp() {
  // State for controlling the navigation drawer
  const [open, setOpen] = useState(false);
  const {user} = useAuth();

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to={'/login'} replace/>
  }

  return (
    <StyledRoot>
      {/* Header component with hamburger menu trigger */}
      <Header onOpenNav={() => setOpen(true)}/>
      {/* Navigation drawer component */}
      <Nav openNav={open} onCloseNav={() => setOpen(false)}/>
      {/* Main content area where child routes are rendered */}
      <Main>
        <Outlet/>
      </Main>
    </StyledRoot>
  );
}
