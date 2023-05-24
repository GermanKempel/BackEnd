import mongoose from "mongoose";

const productsCollection = "productsModel";

const productsSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    code: String,
    price: Number,
    status: String,
    stock: Number ,
    category: String,
    thumbnail: String,
});

export const productsModel = mongoose.model(productsCollection, productsSchema);