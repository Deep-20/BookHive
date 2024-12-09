import { Link as RouterLink } from 'react-router-dom';
import { useState } from "react";
import { IconButton, InputAdornment, Stack, TextField, Button, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

// LoginForm component handles user authentication UI
// loginUser prop is a function that handles the login logic
const LoginForm = ({loginUser}) => {
  // State management for form fields and password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Form fields container with vertical spacing */}
      <Stack spacing={3} sx={{mb: 2}}>
        {/* Email input field */}
        <TextField 
          name="email" 
          label="Email address" 
          value={email} 
          required 
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        {/* Password input field with show/hide toggle */}
        <TextField
          name="password"
          required
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            // Password visibility toggle button
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* Login button - triggers loginUser function with form data */}
      <LoadingButton 
        sx={{mt: 4}} 
        fullWidth 
        size="large" 
        type="submit" 
        variant="contained"
        onClick={() => loginUser(email, password)}
      >
        Login
      </LoadingButton>
        
      {/* Sign up link for new users */}
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
        <Link variant="subtitle2" component={RouterLink} to="/signup">
          Don't have an account? Sign up
        </Link>
      </Stack>
    </>
  );
}

// PropTypes validation
LoginForm.propTypes = {
  loginUser: PropTypes.func,
};

export default LoginForm
