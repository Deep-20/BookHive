// Import required modules
import express from 'express';
const router = express.Router();

// Import controller functions that handle the business logic
import {
    getAuthor,
    getAllAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor
} from '../controllers/authorController.js';

// GET route to retrieve all authors from the database
router.get("/getAll", (req, res) => getAllAuthors(req, res));

// GET route to retrieve a specific author by their ID
router.get("/get/:id", (req, res) => getAuthor(req, res));

// POST route to create a new author
router.post("/add", (req, res) => addAuthor(req, res));

// PUT route to update an existing author by their ID
router.put("/update/:id", (req, res) => updateAuthor(req, res));

// DELETE route to remove an author by their ID
router.delete("/delete/:id", (req, res) => deleteAuthor(req, res));

// Export the router for use in the main application
export default router;
