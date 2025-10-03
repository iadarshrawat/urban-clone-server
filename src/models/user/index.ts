import mongoose from 'mongoose';

const UserSchema = new  mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: {
    type: String, 
    unique: true, 
    required: true 
  },
  password_hash: { 
    type: String, 
    required: true 
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
  },
}, {timestamps: true});

export const USER = mongoose.model('User', UserSchema);
