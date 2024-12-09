// Import required modules
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routers
import authRouter from './routes/authRouter.js';
import bookRouter from './routes/bookRouter.js';
import authorRouter from './routes/authorRouter.js';
import borrowalRouter from './routes/borrowalRouter.js';
import genreRouter from './routes/genreRouter.js';
import userRouter from './routes/userRouter.js';

// Initialise passport as authentication middleware
import initializePassport from './passport-config.js';

import User from './models/user.js'; // Adjust path to your User model

// Environment Configuration
dotenv.config();
// Conditional dotenv import for non-production environments
if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(() => process.env);
}

// Setup express
const app = express();
const PORT = process.env.PORT || 8080;

// Use morgan for logging
app.use(logger('dev'));

// Set middleware to process form data
app.use(express.urlencoded({ extended: false }));

// Critical Security Configuration: MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB successfully.');
  })
  .catch((err) => {
    console.error('MongoDB connection error: ', err);
  });

// Security Configuration: CORS Settings
// Important: Update origin in production to match your frontend domain
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Security Configuration: Session Management
// Important: Use a strong SESSION_SECRET in production
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // Consider adding additional session options for production:
    // cookie: { secure: true } // Enable in HTTPS
    // maxAge: 24 * 60 * 60 * 1000 // Session timeout
  })
);

// Parse cookies used for session management
app.use(cookieParser(process.env.SESSION_SECRET));

// Parse JSON objects in request bodies
app.use(express.json());

// Use passport authentication middleware
app.use(passport.initialize());
app.use(passport.session());


initializePassport(passport);

// API Routes Configuration
// Protected routes should implement authentication middleware
app.use('/api/auth', authRouter);
app.use('/api/book', bookRouter);
app.use('/api/author', authorRouter);
app.use('/api/borrowal', borrowalRouter);
app.use('/api/genre', genreRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => res.send('Welcome to Library Management System'));

// Admin User Creation Utility
// Important: This should only be used for initial setup
// Consider moving to a separate setup script
const createAdminUserObject = () => {
  // Important: Update these default admin credentials in production
  const adminData = {
    name: 'Admin User',
    email: 'admin@example.com',
    dob: '1990-01-01',
    phone: '1234567890',
    isAdmin: true,
    photoUrl: 'https://example.com/admin-photo.jpg',
    password: 'secureAdminPassword123', // Change this in production
  };

  const adminUser = new User(adminData); // Create a User instance
  adminUser.setPassword(adminData.password); // Generate salt and hash
  delete adminUser.password; // Remove plain text password as it is no longer needed

  return adminUser;
};

// Note: Admin creation code is commented out to prevent accidental execution
// Consider moving this to a separate setup script

// Server Startup
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
