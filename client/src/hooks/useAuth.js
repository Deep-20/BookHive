import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocalStorage } from "./useLocalStorage";

// Create context for authentication state management
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Persist user data in localStorage and provide navigation
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // Handle user login and redirect based on user role
  const login = async (data) => {
    setUser(data);
    if (data.isAdmin) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/books", { replace: true });
    }
  };

  // Handle user logout and redirect to login page
  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

// Custom hook to access auth context from any component
export const useAuth = () => useContext(AuthContext);
