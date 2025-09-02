import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, unique: true },
  password: { type: String },
  role: { type: String, default: 'CUSTOMER', enum: ['CUSTOMER', 'PARTNER', 'ADMIN'] },
  status: { type: String, default: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE', 'DELETED'] }
}, { timestamps: true });

export const USER = mongoose.model('User', userSchema);
