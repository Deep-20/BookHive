import Author from '../models/author.js';
import Book from '../models/book.js';
import Borrowal from '../models/borrowal.js';

// Read - Get a single author by ID from the database
// @param {string} req.params.id - The ID of the author to retrieve
// @returns {Object} Response with author data or error message
const getAuthor = async (req, res) => {
    const { id: authorId } = req.params;

    try {
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ success: false, message: "Author not found" });
        }

        return res.status(200).json({
            success: true,
            author
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

// Read - Get all authors from the database
// @returns {Object} Response with array of all authors or error message
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find({});
        return res.status(200).json({
            success: true,
            authorsList: authors
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

// Create - Add a new author to the database
// @param {Object} req.body - Author data including name and other details
// @returns {Object} Response with newly created author or error message
const addAuthor = async (req, res) => {
    const newAuthor = req.body;

    try {
        const author = await Author.create(newAuthor);
        return res.status(200).json({
            success: true,
            newAuthor: author
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

// Update - Modify an existing author's information
// @param {string} req.params.id - The ID of the author to update
// @param {Object} req.body - Updated author data
// @returns {Object} Response with updated author or error message
const updateAuthor = async (req, res) => {
    const { id: authorId } = req.params;
    const updatedAuthor = req.body;

    try {
        const author = await Author.findByIdAndUpdate(authorId, updatedAuthor, { new: true });
        if (!author) {
            return res.status(404).json({ success: false, message: "Author not found" });
        }

        return res.status(200).json({
            success: true,
            updatedAuthor: author
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

// Delete - Remove an author from the database
// @param {string} req.params.id - The ID of the author to delete
// @returns {Object} Response with deleted author or error message
const deleteAuthor = async (req, res) => {
    const { id: authorId } = req.params;

    try {
        // First, find all books by this author
        const authorBooks = await Book.find({ authorId });
        
        // Check if any of the author's books are currently borrowed
        const activeBorrowals = await Borrowal.find({
            bookId: { $in: authorBooks.map(book => book._id) },
            status: 'borrowed'
        });

        if (activeBorrowals.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete author while their books are borrowed"
            });
        }

        // If no active borrowals, delete all books by this author
        await Book.deleteMany({ authorId });

        // Then proceed with author deletion
        const author = await Author.findByIdAndDelete(authorId);
        if (!author) {
            return res.status(404).json({ success: false, message: "Author not found" });
        }

        return res.status(200).json({
            success: true,
            deletedAuthor: author,
            deletedBooksCount: authorBooks.length
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

export {
    getAuthor,
    getAllAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor
};
