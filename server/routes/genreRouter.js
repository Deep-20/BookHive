// Import required modules
import express from 'express';
const router = express.Router();

// Import controller functions that handle the business logic
import {
  getGenre,
  getAllGenres,
  addGenre,
  updateGenre,
  deleteGenre
} from '../controllers/genreController.js';

// GET route to retrieve all genres from the database
router.get("/getAll", (req, res) => getAllGenres(req, res));   

// GET route to retrieve a specific genre by ID
router.get("/get/:id", (req, res) => getGenre(req, res));

// POST route to create a new genre
router.post("/add", (req, res) => addGenre(req, res));

// PUT route to update an existing genre by ID
router.put("/update/:id", (req, res) => updateGenre(req, res));

// DELETE route to remove a genre by ID
router.delete("/delete/:id", (req, res) => deleteGenre(req, res));

// Export the router for use in the main application
export default router;
