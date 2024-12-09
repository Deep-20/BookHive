import User from '../models/user.js';
import passport from 'passport';
import mongoose from 'mongoose';

const registerUser = async (req, res) => {
  try {
    // Destructure user data from request body
    const { name, email, password, phone, photoUrl, dob } = req.body;

    console.log('Received registration data:', req.body);

    // Basic input validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email and password are required' 
      });
    }

    // Prevent duplicate email registrations
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Initialize new user with default values for optional fields
    const user = new User({
      name,
      email,
      phone: phone || "",  // Default to empty string if not provided
      photoUrl: photoUrl || "",  // Default to empty string if not provided
      dob: dob || null,  // Default to null if not provided
      isAdmin: false  // Security: Always set new users as non-admin
    });

    console.log('User before saving:', user); 
    // Securely hash the password using passport-local-mongoose
    user.setPassword(password);
    await user.save();

    console.log('User after saving:', user); 
    // Sanitize user data before sending response (exclude sensitive info)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      photoUrl: user.photoUrl,
      dob: user.dob,
      isAdmin: user.isAdmin
    };

    res.status(201).json({
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Error registering user',
      error: error.message 
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    // Monitor MongoDB connection status for debugging
    mongoose.connection.on('connected', () => console.log("MongoDB is connected!"));
    mongoose.connection.on('error', (err) => console.log("MongoDB connection error:", err));

    console.log("Body from Login", req.body);

    // Two-step authentication:
    // 1. First verify user exists
    const user = await User.findOne({ email: req.body.email });
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2. Then verify password
    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: "Password incorrect" });
    }

    // Use Passport's local strategy for session handling
    passport.authenticate('local', async (err, authenticatedUser, info) => {
      if (err) {
        console.error("Passport error:", err); // Log the error
        return res.status(500).json({ success: false, err });
      }
      if (!authenticatedUser) {
        console.log("Authentication failed:", info);
        return res.status(401).json({ success: false, message: info.message || 'Authentication failed' });
      }

      // Create session and send response
      req.logIn(authenticatedUser, (err) => {
        if (err) {
          console.error("Login error:", err); // Log the error
          return res.status(500).json({ success: false, err });
        }
        return res.status(200).json({
          success: true,
          user: authenticatedUser
        });
      });
    })(req, res, next);
  } catch (err) {
    console.error("Unexpected error:", err); // Log the unexpected error
    return res.status(500).json({ success: false, err });
  }
};

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ success: true, message: "User logged out" });
  });
};

export {
  registerUser,
  loginUser,
  logoutUser
};
