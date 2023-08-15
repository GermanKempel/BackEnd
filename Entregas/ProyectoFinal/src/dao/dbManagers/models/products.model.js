import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
        validate: {
            validator: async function (userId) {
                const user = await mongoose.model("users").findById(userId);
                return user.role === "premium";
            },
            message: "User must be premium",
        }
    },
});

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;