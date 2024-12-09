import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import Logo from "../../../components/logo";
import { SignupForm } from "./index";
import { apiUrl, methods, routes } from "../../../constants";

// Styled component for the root container with a decorative pseudo-element
const StyledRoot = styled("div")(({ theme }) => ({
  position: 'relative',
  [theme.breakpoints.up("md")]: {
    display: "flex",
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '200px',
      height: '100px',
      backgroundColor: '#f7f7f7',
      zIndex: 0,
      borderRadius: '0 0 20px 0'
    }
  }
}));

// Styled component for centering content and maintaining full viewport height
const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0)
}));

export default function SignupPage() {
  // Hook to access authentication context
  const { login, user } = useAuth();

  // Redirect authenticated users to books page
  if (user) {
    return <Navigate to={"/books"} replace />;
  }

  // Handler function for user registration
  const registerUser = (name, email, password, phone, photoUrl, dob) => {
    // Validation for required fields
    if (email === "" || password === "" || name === "") {
      toast.error("Please fill in all required fields");
      return;
    }

    // Prepare user data with optional fields defaulting to empty values
    const userData = {
      name,
      email,
      password,
      phone: phone || "",
      photoUrl: photoUrl || "",
      dob: dob || null,
    };

    // API call to register user
    axios.post(
      apiUrl(routes.AUTH, methods.REGISTER),
      userData,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false
      }
    )
      .then((response) => {
        // On successful registration, show success message and log user in
        if (response.status === 201 || response.status === 200) {
          toast.success(`Successfully registered as ${response.data.user.name}`);
          login(response.data.user);
        }
      })
      .catch((error) => {
        // Handle registration errors with appropriate error message
        console.error('Registration error:', error.response?.data || error);
        toast.error(error.response?.data?.message || "Registration failed");
      });
  };  

  return (
    <>
      {/* Set page title */}
      <Helmet>
        <title> Sign Up | Library</title>
      </Helmet>

      <StyledRoot>
        {/* Logo positioned in top-left corner */}
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
            zIndex: 1
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            {/* Page headings */}
            <Typography variant="h4" sx={{ color: "#666666", fontWeight: "600" }} textAlign="center" gutterBottom
                        paddingBottom={0}>
              Library System
            </Typography>
            <Typography variant="h3" textAlign="center" gutterBottom paddingBottom={3}>
              Sign up
            </Typography>

            {/* Registration form component */}
            <SignupForm registerUser={registerUser} />

          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}