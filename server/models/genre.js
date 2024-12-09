// Import mongoose ODM for MongoDB interaction
import mongoose from 'mongoose';

// Define the schema for Genre collection
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensures no duplicate genre names can be created
  },
  description: {
    type: String,
    required: false // Optional field for genre description
  }
});

// Create an index on the name field for optimized query performance
// The '1' indicates an ascending index
genreSchema.index({ name: 1 });

// Create and export the Genre model using the schema
// 'Genre' will be the collection name in MongoDB (automatically pluralized to 'genres')
export default mongoose.model('Genre', genreSchema);
