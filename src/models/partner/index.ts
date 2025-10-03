import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    service_area: {
      type: String,
      required: true,
    },
    certifications: [String],
    qualifications: [String],
    availability_schedule: Object,
    commission_rate: Number,
    performance_metrics: Object,
    status: {
      type: String,
      enum: ["pending", "approved", "blocked"],
      default: "pending",
    },
    joined_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const PARTNER = mongoose.model("PARTNER", PartnerSchema);
