// Import required dependencies
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/user.js";

const initializePassport = (passport) => {
  // Main authentication function that verifies user credentials
  const authenticateUser = async (email, password, cb) => {
    try {
      // Search for user in database by email
      const user = await User.findOne({ email: email });

      if (!user) {
        return cb(null, false, { message: "User not found" });
      }

      // Verify password using the method defined in the User model
      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) {
        return cb(null, false, { message: "Password incorrect" });
      }

      // Authentication successful - pass user object to callback
      return cb(null, user);
    } catch (err) {
      // Handle any errors that might occur during the DB query
      return cb(err);
    }
  };

  // Configure passport to use Local Strategy with email as username field
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  // Serialize user for the session
  // Determines which data of the user object should be stored in the session
  passport.serializeUser((user, done) => done(null, user));

  // Deserialize user from the session
  // Uses stored user data from session to retrieve full user object
  passport.deserializeUser((user, done) => {
    User.findById(user._id, (err, user) => {
      done(err, user);
    });
  });
};

export default initializePassport;
