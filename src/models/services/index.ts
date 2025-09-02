import { boolean } from "joi/lib";
import mongoose from "mongoose";

const services = new mongoose.Schema({
    _categoryId: {
        type: String,
        ref: ['service']
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    },
    duration: {
        type: Number,
    },
    isActive: {
        type: Boolean,
        default: true,
        enum: ["true", "false"]
    }
}, {timestamps: true})

const SERVICES = mongoose.model('SERVICES', services);