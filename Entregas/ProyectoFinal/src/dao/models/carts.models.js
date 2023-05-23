import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    id: { type: Number },
    products: { type: Array },
});

export const carts = mongoose.model(cartsCollection, cartsSchema);