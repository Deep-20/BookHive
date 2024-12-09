import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/iconify";

export default function SignupForm({ registerUser }) {
  // State management for form controls and data
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    photoUrl: "",
    dob: "",
  });

  // Handles form field changes and automatically generates avatar URL based on name
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      // Generates a unique avatar using DiceBear API when name changes
      photoUrl: e.target.name === "name" ? `https://api.dicebear.com/9.x/initials/svg?seed=${e.target.value.replace(" ", "+")}` : formData.photoUrl
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Calls the registerUser function passed as prop with all form data
    await registerUser(
      formData.name, 
      formData.email, 
      formData.password,
      formData.phone,
      formData.photoUrl,
      formData.dob
    );
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {/* Basic user information fields */}
        <TextField
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          name="email"
          label="Email address"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Phone field with validation pattern */}
        <TextField
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          inputProps={{ 
            pattern: "[0-9]{10}" // Ensures exactly 10 digits
          }}
          helperText="Enter 10-digit phone number"
        />

        {/* Profile photo URL field - auto-populated when name changes */}
        <TextField
          name="photoUrl"
          label="Profile Photo URL"
          value={formData.photoUrl}
          onChange={handleChange}
          helperText="Enter URL for your profile picture"
        />

        {/* Date of birth field with date picker */}
        <TextField
          name="dob"
          label="Date of Birth"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Password field with show/hide toggle */}
        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* Submit button with loading state */}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
        sx={{ mt: 3 }}
      >
        Sign Up
      </LoadingButton>

      {/* Login link for existing users */}
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
        <Link variant="subtitle2" component={RouterLink} to="/login">
          Already have an account? Login
        </Link>
      </Stack>
    </form>
  );
}