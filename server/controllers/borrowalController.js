import Borrowal from '../models/borrowal.js';
import mongoose from 'mongoose';
import Book from '../models/book.js';


// Fetches a single borrowal record by ID
const getBorrowal = async (req, res) => {
  const { id: borrowalId } = req.params;

  try {
    const borrowal = await Borrowal.findById(borrowalId);
    if (!borrowal) {
      return res.status(404).json({ success: false, message: "Borrowal not found" });
    }

    return res.status(200).json({
      success: true,
      borrowal
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Fetches all borrowals with populated member and book details using MongoDB aggregation
const getAllBorrowals = async (req, res) => {
  try {
    const borrowals = await Borrowal.aggregate([
      // Join borrowal with users collection to get member details
      {
        $lookup: {
          from: "users",
          localField: "memberId",
          foreignField: "_id",
          as: "member"
        },
      },
      // Converts member array to object since we expect one member per borrowal
      {
        $unwind: "$member"
      },
      // Join with books collection to get book details
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book"
        },
      },
      // Converts book array to object since we expect one book per borrowal
      {
        $unwind: "$book"
      },
    ]);

    return res.status(200).json({
      success: true,
      borrowalsList: borrowals
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Creates a new borrowal record with validation
const addBorrowal = async (req, res) => {
  const { memberId, bookId, returnDate, borrowedDate, dueDate, ...borrowalData } = req.body;
  console.log("In addBorrowal: ", req.body);
  
  // Validate dates
  if (dueDate && new Date(dueDate) < new Date(borrowedDate)) {
    return res.status(400).json({
      success: false,
      message: "Due date cannot be earlier than borrowed date"
    });
  }

  if (returnDate && new Date(returnDate) < new Date(borrowedDate)) {
    return res.status(400).json({
      success: false,
      message: "Return date cannot be earlier than borrowed date"
    });
  }

  const newBorrowal = {
    ...borrowalData,
    memberId: new mongoose.Types.ObjectId(memberId),
    bookId: new mongoose.Types.ObjectId(bookId),
    borrowedDate,
    dueDate,
    returnDate,
    status: returnDate ? 'returned' : 'borrowed',
  };

  try {
    // Check if book is available before creating borrowal
    const book = await Book.findById(bookId);
    if (!book || !book.isAvailable) {
      return res.status(400).json({ 
        success: false, 
        message: "Book is not available for borrowing" 
      });
    }

    const borrowal = await Borrowal.create(newBorrowal);
    
    // Update book availability
    await Book.findByIdAndUpdate(newBorrowal.bookId, { isAvailable: false });

    return res.status(200).json({
      success: true,
      newBorrowal: borrowal
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Updates an existing borrowal with validation and book availability management
const updateBorrowal = async (req, res) => {
  const { id: borrowalId } = req.params;
  const { returnDate, borrowedDate, dueDate, bookId, ...updatedData } = req.body;

  try {
    // Get the original borrowal to check if book has changed
    const originalBorrowal = await Borrowal.findById(borrowalId);
    if (!originalBorrowal) {
      return res.status(404).json({ success: false, message: "Borrowal not found" });
    }

    // If book is being changed, check if new book is available
    if (bookId && bookId !== originalBorrowal.bookId.toString()) {
      const newBook = await Book.findById(bookId);
      if (!newBook || !newBook.isAvailable) {
        return res.status(400).json({ 
          success: false, 
          message: "New book is not available for borrowing" 
        });
      }
    }

    // Validate dates
    if (dueDate && new Date(dueDate) < new Date(borrowedDate)) {
      return res.status(400).json({
        success: false,
        message: "Due date cannot be earlier than borrowed date"
      });
    }

    if (returnDate && new Date(returnDate) < new Date(borrowedDate)) {
      return res.status(400).json({
        success: false,
        message: "Return date cannot be earlier than borrowed date"
      });
    }

    const updatedBorrowal = {
      ...updatedData,
      bookId,
      borrowedDate,
      dueDate,
      ...(returnDate && { returnDate }),
      status: returnDate ? 'returned' : 'borrowed',
    };

    const borrowal = await Borrowal.findByIdAndUpdate(borrowalId, updatedBorrowal, { new: true });

    // Update book availability
    if (bookId && bookId !== originalBorrowal.bookId.toString()) {
      // Make the old book available
      await Book.findByIdAndUpdate(originalBorrowal.bookId, { isAvailable: true });
      // Make the new book unavailable
      await Book.findByIdAndUpdate(bookId, { isAvailable: false });
    } else if (updatedBorrowal.status === 'returned') {
      // If just returning the same book
      await Book.findByIdAndUpdate(originalBorrowal.bookId, { isAvailable: true });
    }

    return res.status(200).json({
      success: true,
      updatedBorrowal: borrowal
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

// Deletes a borrowal and updates book availability
const deleteBorrowal = async (req, res) => {
  const { id: borrowalId } = req.params;

  try {
    const borrowal = await Borrowal.findByIdAndDelete(borrowalId);
    if (!borrowal) {
      return res.status(404).json({ success: false, message: "Borrowal not found" });
    }

    // Update book availability
    await Book.findByIdAndUpdate(borrowal.bookId, { isAvailable: true });

    return res.status(200).json({
      success: true,
      deletedBorrowal: borrowal
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export {
  getBorrowal,
  getAllBorrowals,
  addBorrowal,
  updateBorrowal,
  deleteBorrowal
};
