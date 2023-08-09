import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    code: String,
    price: Number,
    status: String,
    stock: Number,
    category: String,
    thumbnail: String,
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

export const productsModel = mongoose.model(productsCollection, productsSchema);