import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    _user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    _partner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner",
    },
    _booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review_text: String,
    is_visible: {
      type: Boolean,
      default: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    moderated_by_admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

export const REVIEWS = mongoose.model("REVIEWS", ReviewSchema);
