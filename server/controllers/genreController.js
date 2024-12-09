import Genre from '../models/genre.js';

// @desc    Fetch a single genre by ID from the database
// @route   GET /api/genres/:id
// @access  Public
const getGenre = async (req, res) => {
  const { id: genreId } = req.params;

  try {
    const genre = await Genre.findById(genreId);
    if (!genre) {
      return res.status(404).json({ success: false, message: "Genre not found" });
    }

    return res.status(200).json({
      success: true,
      genre
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// @desc    Fetch all genres from the database
// @route   GET /api/genres
// @access  Public
const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find({});
    return res.status(200).json({
      success: true,
      genresList: genres
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// @desc    Create a new genre in the database
// @route   POST /api/genres
// @access  Private/Admin
const addGenre = async (req, res) => {
  const newGenre = req.body;

  try {
    const genre = await Genre.create(newGenre);
    return res.status(200).json({
      success: true,
      newGenre: genre
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// @desc    Update an existing genre by ID
// @route   PUT /api/genres/:id
// @access  Private/Admin
const updateGenre = async (req, res) => {
  const { id: genreId } = req.params;
  const updatedGenre = req.body;

  try {
    const genre = await Genre.findByIdAndUpdate(genreId, updatedGenre, { new: true });
    if (!genre) {
      return res.status(404).json({ success: false, message: "Genre not found" });
    }

    return res.status(200).json({
      success: true,
      updatedGenre: genre
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// @desc    Remove a genre from the database by ID
// @route   DELETE /api/genres/:id
// @access  Private/Admin
const deleteGenre = async (req, res) => {
  const { id: genreId } = req.params;

  try {
    const genre = await Genre.findByIdAndDelete(genreId);
    if (!genre) {
      return res.status(404).json({ success: false, message: "Genre not found" });
    }

    return res.status(200).json({
      success: true,
      deletedGenre: genre
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export {
  getGenre,
  getAllGenres,
  addGenre,
  updateGenre,
  deleteGenre
};
