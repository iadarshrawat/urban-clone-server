import mongoose, { model, Schema } from 'mongoose';

const tokenSchema = new Schema({
  uuid: { type: String, required: true },
  token: { type: String, required: true },
  userId: { type: String, required: true },
  deviceInfo: { type: String },
  expiredAt: { type: Date }
});

export const TOKEN = model('Token', tokenSchema);
