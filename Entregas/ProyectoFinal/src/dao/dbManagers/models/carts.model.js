import mongoose from 'mongoose';

const cartsCollection = 'cartsModel';

const cartsSchema = new mongoose.Schema({
    id: Number,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productsModel' }],
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);