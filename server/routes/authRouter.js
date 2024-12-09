// Import required modules
import express from 'express';
const router = express.Router();

// Import authentication controller functions
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/authController.js';

// Handle POST request for user login
// Expects email/username and password in request body
router.post("/login", (req, res) => loginUser(req, res));

// Handle POST request for new user registration
// Expects user details (email, password, etc.) in request body
router.post("/register", (req, res) => registerUser(req, res));

// Handle GET request for user logout
// Typically clears session/tokens
router.get("/logout", (req, res) => logoutUser(req, res));

// Export router for use in main application
export default router;
