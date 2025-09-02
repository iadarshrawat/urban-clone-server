import mongoose from "mongoose";

const serviceCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    icon: {
        type: String,
    }
}, {timestamps: true});

export const SERVICECATEGORY = mongoose.model("SERVICECATEGORY", serviceCategorySchema)