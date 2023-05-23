import { cartsModel } from '../../models/carts.model.js';

export default class CartsManager {
    constructor() {
        console.log('Working Carts with DB');
    }

    getCart = async () => {
        const cart = await cartsModel.find().lean();
        return cart;
    }

    saveCart = async (cart) => {
        const newCart = new cartsModel(cart);
        await newCart.save();
    }

    updateCart = async (cart) => {
        await cartsModel.updateOne({id: cart.id}, cart);
    }
}