import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: String, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    role: { type: String, enum: ['user', 'admin', 'premium'], default: 'user' },
    documents: [{ type: String, reference: String }],
    last_connection: { type: Date, default: Date.now }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;