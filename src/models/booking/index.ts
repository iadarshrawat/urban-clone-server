import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({

    _customerId: {
        type: String
    },
    _partnerId: {
        type: String
    },
    scheduledAt: {
        type: Date
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled']
    },
    paymentStatus: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'PAID', 'REFUNDED']
    },
    address: {
        type: String
    },
    totalAmount: {
        type: Number
    }
}, {timestamps: true});

export const BOOKING = mongoose.model('BOOKING', bookingSchema);
