import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    _user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    _partner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner",
    },
    _service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    _payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    booking_time: Date,
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    address: String,
    special_instructions: String,
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const BOOKING = mongoose.model("BOOKING", BookingSchema);
