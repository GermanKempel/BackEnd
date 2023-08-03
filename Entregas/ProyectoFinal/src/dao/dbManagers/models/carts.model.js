import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    id: Number,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);