import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String},
  status: { type: String, default: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE', 'DELETED'] }
}, {timestamps: true});

export const USER = mongoose.model('User', userSchema);
