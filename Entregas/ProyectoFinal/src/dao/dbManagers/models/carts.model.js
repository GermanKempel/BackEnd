import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: { type: Number, required: true }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;