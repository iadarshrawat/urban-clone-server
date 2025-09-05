import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({

    _bookingId: {
        type: String
    },
    _customerId: {
        type: String
    },
    _partnerId: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    }
}, {timestamps: true});

export const REVIEWS = mongoose.model('REVIEWS', reviewSchema);
