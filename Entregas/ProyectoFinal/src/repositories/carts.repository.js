import { Carts } from "../dao/factory.js";

export default class CartsRepository {
  constructor() {
    this.cartsDao = new Carts();
  }

  getAll = async () => {
    const carts = await this.cartsDao.getAll();
    return carts;
  }

  getById = async (cartId) => {
    const cart = await this.cartsDao.getById(cartId);
    return cart;
  }

  getByUserId = async (userId) => {
    const cart = await this.cartsDao.getByUserId(userId);
    return cart;
  }

  addProduct = async (cartId, productId, quantity) => {
    const result = await this.cartsDao.addProduct(cartId, productId, quantity);
    return result;
  }

  removeProduct = async (cartId, productId) => {
    const result = await this.cartsDao.removeProduct(cartId, productId);
    return result;
  }

  removeAllProducts = async (cartId) => {
    const result = await this.cartsDao.removeAllProducts(cartId);
    return result;
  }

  updateCart = async (cart) => {
    const result = await this.cartsDao.updateCart(cart);
    return result;
  }

  updateProductQuantity = async (cartId, productId, quantity) => {
    const result = await this.cartsDao.updateProductQuantity(cartId, productId, quantity);
    return result;
  }

  purchaseCart = async (cartId) => {
    const result = await this.cartsDao.purchaseCart(cartId);
    return result;
  }

  saveCart = async (cart) => {
    const result = await this.cartsDao.saveCart(cart);
    return result;
  }

  deleteCart = async (cartId) => {
    const result = await this.cartsDao.deleteCart(cartId);
    return result;
  }
}