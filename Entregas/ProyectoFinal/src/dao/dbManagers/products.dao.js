import { parse } from 'dotenv';
import productsModel from './models/products.model.js';
export default class ProductsDao {
    constructor() {
        console.log('Working Products with DB');
    }

    async getAll() {
        return await productsModel.find();
    }

    async addProduct(product) {
        return await productsModel.create(product);
    }

    async getProductById(productId) {
        return await productsModel.findById(productId);
    }

    async updateProduct(id, title, description, price, thumbnail, code, stock, category) {

        const productToUpdate = await productsModel.findById(id);

        productToUpdate.title = title;
        productToUpdate.description = description;
        productToUpdate.price = price;
        productToUpdate.thumbnail = thumbnail;
        productToUpdate.code = code;
        productToUpdate.stock = stock;
        productToUpdate.category = category;

        return await productToUpdate.save();
    }

    async deleteProduct(productId) {
        return await productsModel.findByIdAndDelete(productId);
    }

    async getPaginatedProducts(page, limit) {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        };
        return await productsModel.paginate({}, options);
    }
}