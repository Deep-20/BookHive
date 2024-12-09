// Import necessary dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@mui/material";

// ----------------------------------------------------------------------

// Logo component using forwardRef to allow ref forwarding from parent components
// Props:
// - disabledLink: if true, renders logo without link wrapper
// - sx: allows custom styling via MUI's sx prop system
// - other: spreads any additional props to the root element
const Logo = forwardRef(({disabledLink = false, sx, ...other}, ref) => {

  // Define the core logo element
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        display: 'inline-flex',
        textAlign: 'center',
        margin: 'auto',
        justifyContent: 'center',
        ...sx,  // Merge any custom styles passed via sx prop
      }}
      {...other}  // Spread any additional props
    >
      {/* Render the logo image */}
      <img src="./assets/libraryLogo.svg" alt="Logo" width="80%"/>
    </Box>
  );

  // If disabledLink is true, return logo without link wrapper
  if (disabledLink) {
    return <>{logo}</>;
  }

  // Return logo wrapped in a Router Link component
  return (
    <Link to="/" component={RouterLink} sx={{display: 'contents'}}>
      {logo}
    </Link>
  );
});

// PropTypes for type checking
Logo.propTypes = {
  sx: PropTypes.object,      // Custom styles object
  disabledLink: PropTypes.bool,  // Flag to disable link wrapper
};

export default Logo;
