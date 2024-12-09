import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true  // Book name is mandatory
  },
  isbn: {
    type: String,
    required: true  // ISBN is mandatory for book identification
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',  // Creates a relationship with Author model
    required: false // Author can be added later
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',   // Creates a relationship with Genre model
    required: false // Genre can be added later
  },
  isAvailable: {
    type: Boolean,
    required: true  // Availability status is mandatory
  },
  summary: {
    type: String,
    required: false // Optional book description
  },
  photoUrl: {
    type: String,
    required: false // Optional book cover image URL
  }
});

export default mongoose.model('Book', bookSchema);
