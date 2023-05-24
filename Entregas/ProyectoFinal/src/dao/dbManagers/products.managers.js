import productsModel from '../models/products.model.js';
import cartsModel from '../models/carts.models.js';

export default class ProductsManager {
    constructor() {
        console.log('Working Products with DB');
    }

async getAll() {
    return await productsModel.find();
}

async addProduct(title, description, price, thumbnail, code, stock, category) {
    const newProduct = new productsModel({ title, description, price, thumbnail, code, stock, category });
    return await newProduct.save();
}

async getProductById(id) {
    return await productsModel.findById(id);
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

async deleteProduct(id) {
    return await productsModel.findByIdAndDelete(id);
}

async query(options) {
    return await productsModel.find(options);
}

async getPaginatedProducts(filter, options){
    return await productsModel.paginate(filter, options);
}

async getProductsInCart(cartId) {
    const cart = await cartsModel.findById(cartId);
    return cart.products;
}

async addProductToCart(cartId, productId) {
    const cart = await cartsModel.findById(cartId);
    cart.products.push(productId);
    return await cart.save();
}
}