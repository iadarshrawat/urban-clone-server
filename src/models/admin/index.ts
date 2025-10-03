import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password_hash: {
      type: String,
    },
    role: {
      type: String,
      enum: ["superadmin", "moderator"],
      default: "moderator",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const ADMIN = mongoose.model("Admin", AdminSchema);
