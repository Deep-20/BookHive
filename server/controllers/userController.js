import User from '../models/user.js';
import Borrowal from '../models/borrowal.js';

// Read - Get a single user
const getUser = async (req, res) => {
  // Extract userId from request parameters
  const { id: userId } = req.params;

  try {
    const user = await User.findById(userId);
    // Return 404 if user doesn't exist
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Read - Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      usersList: users
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Read - Get all members (non-admin users)
const getAllMembers = async (req, res) => {
  try {
    const members = await User.find({ isAdmin: false });
    return res.status(200).json({
      success: true,
      membersList: members
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Create - Add a new user
const addUser = async (req, res) => {
  const newUser = req.body;

  try {
    // Check for existing user to prevent duplicates
    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(403).json({ success: false, message: "User already exists" });
    }

    // Create and save new user with hashed password
    const user = new User(newUser);
    user.setPassword(newUser.password);
    await user.save();

    return res.status(201).json({
      success: true,
      user
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Update - Update an existing user
const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const updates = req.body;

  try {
    // Verify user exists before attempting update
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Construct update object with fallback to existing values
    const updateFields = {
      name: updates.name || existingUser.name,
      email: updates.email || existingUser.email,
      phone: updates.phone || existingUser.phone,
      photoUrl: updates.photoUrl || existingUser.photoUrl,
      dob: updates.dob || existingUser.dob,
      // Special handling for boolean isAdmin field
      isAdmin: typeof updates.isAdmin !== 'undefined' ? updates.isAdmin : existingUser.isAdmin
    };

    // Only update password if provided in request
    if (updates.password) {
      existingUser.setPassword(updates.password);
      updateFields.hash = existingUser.hash;
      updateFields.salt = existingUser.salt;
    }

    // Perform update with validation and return new document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    );

    // Return sanitized user object (excluding sensitive data)
    return res.status(200).json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        photoUrl: updatedUser.photoUrl,
        dob: updatedUser.dob,
        isAdmin: updatedUser.isAdmin
      }
    });
  } catch (err) {
    // Enhanced error logging and response
    console.error('Update error:', err);
    return res.status(400).json({ 
      success: false, 
      message: err.message || 'Error updating user'
    });
  }
};

// Delete - Delete a user
const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  try {
    // First check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check for unreturned books in Borrowal collection
    const activeLoans = await Borrowal.find({
      memberId: userId,
      status: 'borrowed'
    });

    // If user has active loans, prevent deletion
    if (activeLoans.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete user with unreturned books. Please ensure all books are returned before deleting the account.",
        activeLoans: activeLoans.length
      });
    }

    // If no active loans, proceed with deletion
    const deletedUser = await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      deletedUser
    });
  } catch (err) {
    console.error('Delete user error:', err);
    return res.status(400).json({ 
      success: false, 
      message: err.message || 'Error deleting user'
    });
  }
};

export {
  getUser,
  getAllUsers,
  getAllMembers,
  addUser,
  updateUser,
  deleteUser
};
