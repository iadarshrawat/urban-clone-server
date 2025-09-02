import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    address: {
        type: String
    },
    walletBalance: {
        type: Number
    }
}, {timestamps: true})

export const CUSTOMER = mongoose.model('CUSTOMER', customerSchema);