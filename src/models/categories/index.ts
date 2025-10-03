import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  },
  description: {
    type: String,
    required: true
  },
  _createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  }
}, {timestamps: true});

export const CATEGORIES = mongoose.model('Categories', CategorySchema);