import mongoose from 'mongoose';

// Borrowal Schema represents a book lending transaction in the library system
const borrowalSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Links to the specific book being borrowed
    required: true
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links to the library member who is borrowing
    required: true
  },
  borrowedDate: {
    type: Date,
    default: Date.now // Automatically set when borrowal record is created
  },
  dueDate: {
    type: Date,
    required: false // When the book needs to be returned by
  },
  returnDate: {
    type: Date,
    required: false // Will be set when the book is actually returned
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned', 'overdue'], // Tracks the current state of the borrowal
    required: false // Should probably be required with a default value of 'borrowed'
  }
});

// Creates and exports the Borrowal model using the schema defined above
export default mongoose.model('Borrowal', borrowalSchema);
