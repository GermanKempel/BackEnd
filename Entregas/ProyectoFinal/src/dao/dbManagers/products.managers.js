import { productsModel } from '../models/products.model.js';

export default class ProductsManager {
    constructor() {
        console.log('Working Products with DB');
    }

    getProducts = async () => {
        const products = await productsModel.find();
        return products.map (product => product = product.toObject());
    }

    saveProduct = async (product) => {
        const newProduct = new productsModel(product);
        await newProduct.save();
    }
}
