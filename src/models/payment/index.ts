import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    _bookingId: {
        type: String
    },
    _customer: {
        type: String
    },
    amount: {
        type: Number
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
    },
    transactionId: {
        type: String,
    },
    method: {
        type: String,
        default: 'CARD',
        enum: ['CARD', 'UPI', 'WALLET']
    }
}, {timestamps: true})

export const PAYMENT = mongoose.model('PAYMENT', paymentSchema);