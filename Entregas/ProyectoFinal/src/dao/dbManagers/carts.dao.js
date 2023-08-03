import { cartsModel } from './models/carts.model.js';

export default class CartsDao {
  constructor() {
    console.log('Working Carts with DB');
  }

  async getAll() {
    return cartsModel.find().populate('products');
  }

  async getById(cartId) {
    return cartsModel.findById(cartId).populate('products');
  }

  async getByUserId(userId) {
    return cartsModel.findOne({ userId }).populate('products');
  }

  async addProduct(cartId, productId) {
    return cartsModel.findByIdAndUpdate(cartId, { $push: { products: productId } });
  }

  async removeProduct(cartId, productId) {
    return cartsModel.findByIdAndUpdate(cartId, { $pull: { products: productId } });
  }

  async removeAllProducts(cartId) {
    return cartsModel.findByIdAndUpdate(cartId, { $set: { products: [] } });
  }

  async updateCart(cartId, products) {
    return cartsModel.findByIdAndUpdate(cartId, { $set: { products } });
  }

  async updateProductQuantity(cartId, productId, quantity) {
    return cartsModel.findOneAndUpdate({ _id: cartId, 'products._id': productId }, { $set: { 'products.$.quantity': quantity } });
  }

  async purchaseCart(cartId) {
    return cartsModel.findByIdAndUpdate(cartId, { $set: { products: [] } });
  }

  async saveCart(cartId) {
    return cartsModel.create(cartId);
  }

  async deleteCart(cartId) {
    return cartsModel.findByIdAndDelete(cartId);
  }
}