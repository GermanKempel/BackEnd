import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String },
    description: { type: String },
    code: { type: String },
    price: { type: Number },
    status: { type: String  },
    stock: { type: Number  },
    category: { type: String },
    thumbnail: { type: String },
});

export const products = mongoose.model(productsCollection, productsSchema);