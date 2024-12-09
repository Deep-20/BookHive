// Import required modules
import express from 'express';
const router = express.Router();

// Import controller functions that handle the business logic
import {
  getBorrowal,
  getAllBorrowals,
  addBorrowal,
  updateBorrowal,
  deleteBorrowal
} from '../controllers/borrowalController.js';

// GET route to retrieve all borrowal records
router.get("/getAll", (req, res) => getAllBorrowals(req, res));

// GET route to retrieve a specific borrowal by ID
router.get("/get/:id", (req, res) => getBorrowal(req, res));

// POST route to create a new borrowal record
router.post("/add", (req, res) => addBorrowal(req, res));

// PUT route to update an existing borrowal record by ID
router.put("/update/:id", (req, res) => updateBorrowal(req, res));

// DELETE route to remove a borrowal record by ID
router.delete("/delete/:id", (req, res) => deleteBorrowal(req, res));

// Export the router for use in the main application
export default router;
