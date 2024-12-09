import mongoose from 'mongoose';

// Define the schema for Author documents in MongoDB
const authorSchema = new mongoose.Schema({
  // Author's name - required field
  name: {
    type: String,
    required: true
  },
  // Optional biography or description of the author
  description: {
    type: String,
    required: false  // explicitly marked as optional
  },
  // Optional URL to author's profile photo/avatar
  photoUrl: {
    type: String,
    required: false  // explicitly marked as optional
  }
});

// Create and export the Author model using the schema
export default mongoose.model('Author', authorSchema);
