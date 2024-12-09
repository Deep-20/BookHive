import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import Logo from "../../../components/logo";
import { LoginForm } from "./index";

// ----------------------------------------------------------------------

// Styled components for layout
const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

// Main content container with flex layout and centering
const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  // Get authentication context hooks
  const { login, user } = useAuth();

  // Redirect logic based on user role
  if (user) {
    if (user.isAdmin) {
      return <Navigate to={"/dashboard"} replace />;
    }
    return <Navigate to={"/books"} replace />;
  }

  // Handle login form submission
  const loginUser = (email, password) => {
    // Input validation
    if (email === "" || password === "") {
      toast.error("Please enter email and password");
    } else {
      // API call to backend for authentication
      axios.post(`http://localhost:8080/api/auth/login`, { email, password }, { withCredentials: false })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            toast.success(`Successfully logged in as ${response.data.user.name}`);
            // Update auth context with user data
            login(response.data.user);
          }
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "An error occurred");
          console.log(error);
        });
    }
  };  

  return (
    <>
      {/* Page title */}
      <Helmet>
        <title> Login | Library</title>
      </Helmet>

      <StyledRoot>
        {/* Logo component with responsive positioning */}
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 }
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
              Sign in
            </Typography>

            {/* Login form component with login handler */}
            <LoginForm loginUser={loginUser} />

          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
