import mongoose from 'mongoose';

const serviceCategorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    icon: {
        type: String
    },
    status: {
        type: String,
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE', 'DELETED']
    }
}, {timestamps: true});

export const SERVICECATEGORY = mongoose.model('SERVICECATEGORY', serviceCategorySchema);
