export default class CartManager {

  constructor() {
    this.carts = []
  }

  async save(cart) {
    if (this.carts.length === 0) {
      cart.cid = 1;
    } else {
      cart.cid = this.carts[this.carts.length - 1].cid + 1;
    }
    this.carts.push(cart);
    return cart;
  }

  async getCartById(cid) {
    return this.carts.find(cart => cart.cid === cid);
  }
}