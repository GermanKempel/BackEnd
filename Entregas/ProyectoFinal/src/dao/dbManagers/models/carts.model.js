import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
        },
        quantity: { type: Number }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0
    }
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;