// Import required modules
import express from 'express';
const router = express.Router();

// Import controller functions that handle the business logic for user operations
import {
  getUser,
  getAllUsers,
  getAllMembers,
  addUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

// Get all users from the database
router.get("/getAll", (req, res) => getAllUsers(req, res));

// Get all members (likely filtered users with member status)
router.get("/getAllMembers", (req, res) => getAllMembers(req, res));

// Get a specific user by their ID
router.get("/get/:id", (req, res) => getUser(req, res));

// Create a new user
router.post("/add", (req, res) => addUser(req, res));

// Update an existing user by their ID
router.put("/update/:id", (req, res) => updateUser(req, res));

// Delete a user by their ID
router.delete("/delete/:id", (req, res) => deleteUser(req, res));

export default router;
