import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    kycDocument: {
        type: String
    },
    serviceOffered: {
        type: String,
    },
    experienceYears: {
        type: Number
    },
    rating: {
        type: Number
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "approved", "blocked"]
    }

}, { timestamps: true });

export const PARTNER = mongoose.model('PARTNER', partnerSchema); 