// Import required modules
import express from 'express';
const router = express.Router();

// Import controller functions for handling book-related operations
import {
  getBook,
  getAllBooks,
  addBook,
  updateBook,
  deleteBook
} from '../controllers/bookController.js';

// Route to fetch all books from the database
router.get("/getAll", (req, res) => getAllBooks(req, res));

// Route to fetch a single book by its ID
router.get("/get/:id", (req, res) => getBook(req, res));

// Route to create a new book entry
router.post("/add", (req, res) => addBook(req, res));

// Route to update an existing book by its ID
router.put("/update/:id", (req, res) => updateBook(req, res));

// Route to remove a book from the database by its ID
router.delete("/delete/:id", (req, res) => deleteBook(req, res));

// Export the router for use in the main application
export default router;
