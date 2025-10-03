import mongoose, { Types } from "mongoose";

const ServiceSchema = new mongoose.Schema({
  _categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    requried: true,
  },
  duration_minutes: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "ACTIVE",
    enum: ["ACTIVE", "INACTIVE", "DELETED"],
  },
  created_by_admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const SERVICES = mongoose.model("SERVICES", ServiceSchema);
