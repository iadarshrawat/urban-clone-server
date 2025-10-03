import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  _user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
},
  _partner_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Partner" 
},
  _booking_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Booking" 
},
  amount: Number,
  commission_amount: Number,
  payment_method: String,
  payment_status: {
    type: String, 
    enum: ["pending", "paid", "failed"], 
    default: "pending" 
},
  transaction_date: { 
    type: Date, 
    default: Date.now 
},
}, {timestamps: true});

export const PAYMENT = mongoose.model('PAYMENT', PaymentSchema);
