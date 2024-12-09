import Book from '../models/book.js';
import mongoose from 'mongoose';

// Read - Get a single book
const getBook = async (req, res) => {
  // Extract book ID from request parameters
  const { id: bookId } = req.params;

  try {
    // Attempt to find book by ID in database
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    return res.status(200).json({
      success: true,
      book
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Read - Get all books with populated author and genre
const getAllBooks = async (req, res) => {
  try {
    // Use MongoDB aggregation pipeline to join books with authors and genres
    const books = await Book.aggregate([
      // Join books with authors collection
      {
        $lookup: {
          from: "authors",  // Target collection
          localField: "authorId",  // Field from books collection
          foreignField: "_id",  // Field from authors collection
          as: "author"  // Output array field
        },
      },
      // Convert author array to single object
      {
        $unwind: "$author"
      },
      // Join with genres collection
      {
        $lookup: {
          from: "genres",
          localField: "genreId",
          foreignField: "_id",
          as: "genre"
        },
      },
      // Convert genre array to single object
      {
        $unwind: "$genre"
      },
    ]);

    console.log('Books:', books); 

    return res.status(200).json({
      success: true,
      booksList: books
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Create - Add a new book
const addBook = async (req, res) => {
  // Separate genre and author IDs from other book data
  const { genreId, authorId, ...bookData } = req.body;
  // Convert string IDs to MongoDB ObjectIds and create new book object
  const newBook = {
    ...bookData,
    genreId: new mongoose.Types.ObjectId(genreId),
    authorId: new mongoose.Types.ObjectId(authorId)
  };

  try {
    const book = await Book.create(newBook);
    return res.status(200).json({
      success: true,
      newBook: book
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Update - Update an existing book
const updateBook = async (req, res) => {
  // Extract book ID from request parameters
  const { id: bookId } = req.params;
  // Get updated book data from request body
  const updatedBook = req.body;

  try {
    // Find book by ID and update with new data, returning the updated document
    const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    return res.status(200).json({
      success: true,
      updatedBook: book
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Delete - Delete a book
const deleteBook = async (req, res) => {
  const { id: bookId } = req.params;

  try {
    // First check if the book exists and get its availability status
    const book = await Book.findById(bookId);
    
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    // Check if the book is currently borrowed
    if (!book.isAvailable) {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot delete book as it is currently borrowed" 
      });
    }

    // If book is available, proceed with deletion
    const deletedBook = await Book.findByIdAndDelete(bookId);

    return res.status(200).json({
      success: true,
      deletedBook
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export {
  getBook,
  getAllBooks,
  addBook,
  updateBook,
  deleteBook
};
