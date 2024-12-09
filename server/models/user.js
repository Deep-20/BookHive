import mongoose from 'mongoose';
import crypto from "crypto";

// Creating user schema
const UserSchema = new mongoose.Schema({
  // Basic user information
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures no duplicate emails in the database
  },
  // Optional user details
  dob: {
    type: Date,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  // Access control flag
  isAdmin: {
    type: Boolean,
    required: true,
    default: false  // Users are non-admin by default
  },
  photoUrl: {
    type: String,
    required: false,
  },
  // Password-related fields (not stored directly for security)
  hash: String,  // Stores the hashed password
  salt: String,  // Random value used in password hashing
});

// Method to set a new password
// Generates a random salt and creates a hash from the password
UserSchema.methods.setPassword = function (password) {
  // Generate a random 16-byte salt
  this.salt = crypto.randomBytes(16).toString("hex");
  // Create password hash using PBKDF2 algorithm
  // Parameters: password, salt, iterations (1000), key length (64), hash algorithm (sha512)
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

// Method to validate password during login
// Returns true if the provided password matches the stored hash
UserSchema.methods.isValidPassword = function (password) {
  // Generate hash with the same parameters and compare with stored hash
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.hash === hash;
};

// Export the model
export default mongoose.model("User", UserSchema);
