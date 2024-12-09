import { useState } from "react";
import { alpha } from "@mui/material/styles";
import { Avatar, Box, Divider, IconButton, MenuItem, Popover, Typography } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";

// Account popover component that displays user info and logout option
export default function AccountPopover() {
  const { user } = useAuth();
  const { logout } = useAuth();
  const [open, setOpen] = useState(null);

  // Handles user logout by making API call and clearing auth state
  const logoutUser = () => {
    handleClose();
    axios.get(`http://localhost:8080/api/auth/logout`, { withCredentials: true })
      .then((response) => {
        // handle success
        if (response.status === 200) {
          console.log(response.data);
          logout();
        }
      })
      .catch((error) => {
        // handle error
        alert(error);
        console.log(error);
      })
  };

  // Opens the popover and sets anchor element
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  // Closes the popover by clearing anchor element
  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      {/* Avatar button that triggers the popover */}
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user.photoUrl} alt={user.name}/>
      </IconButton>

      {/* Popover menu containing user info and logout option */}
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* User information section */}
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
            {user.email}
          </Typography>
        </Box>

        {/* Commented out menu options section */}
        {/* <Stack sx={{ p: 1 }}> */}
        {/*  {MENU_OPTIONS.map((option) => ( */}
        {/*    <MenuItem key={option.label} onClick={handleClose}> */}
        {/*      {option.label} */}
        {/*    </MenuItem> */}
        {/*  ))} */}
        {/* </Stack> */}

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        {/* Logout button */}
        <MenuItem onClick={logoutUser} sx={{m: 1}}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
