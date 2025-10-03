import mongoose from 'mongoose'

const PartnerServiceSchema = new mongoose.Schema({
  _partner_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Partner" 
},
  _service_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Service" 
},
  custom_price: Number,
  availability_schedule: Object,
  status: { 
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'], 
    default: 'ACTIVE' 
},
}, {timestamps: true});

export const PARTNER_SERVICE = mongoose.model('PartnerService', PartnerServiceSchema);