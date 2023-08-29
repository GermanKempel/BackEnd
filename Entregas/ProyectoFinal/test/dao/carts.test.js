import mongoose from 'mongoose';
import CartsDao from '../../src/dao/dbManagers/carts.dao.js';
import ProductsDao from '../../src/dao/dbManagers/products.dao.js';
import UsersDao from '../../src/dao/dbManagers/users.dao.js';
import chai from 'chai';

const expect = chai.expect;

await mongoose.connect('mongodb+srv://GermanKempel:GcsLTjZBjYXUT5Ht@cluster0.tnbfe67.mongodb.net/testing?retryWrites=true&w=majority');

let cartsDao
let productsDao
let usersDao

describe('CartsDao', () => {
  before(async () => {

    try {
      await mongoose.connection.collections.users.drop();
      await mongoose.connection.collections.products.drop();
      await mongoose.connection.collections.carts.drop();
    }
    catch (err) {
      console.log(err);
    }

    cartsDao = new CartsDao();
    productsDao = new ProductsDao();
    usersDao = new UsersDao();

    const user = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@user.com',
      age: 25,
      password: '1234'
    };

    await usersDao.save(user);

    const product = {
      title: 'Test Product',
      description: 'Test Description',
      price: 100,
      thumbnail: 'Test Thumbnail',
      code: 'Test Code',
      stock: 10,
      category: 'Test Category'
    };

    await productsDao.addProduct(product);
  });

  it('debe devolver todos los carritos', async () => {
    const carts = await cartsDao.getAll();
    expect(carts).to.be.an('array');
  });

  it('debe agregar un carrito', async () => {
    const user = await usersDao.getByEmail('test@user.com');

    const cart = {
      timestamp: new Date(),
      products: [],
      userId: user._id
    };

    const newCart = await cartsDao.addCart(cart);
    expect(newCart).to.have.property('_id');
    expect(newCart.products).to.be.an('array');
    expect(newCart.userId).to.be.eql(cart.userId);
  });

  it('debe obtener un carrito por su id', async () => {
    const user = await usersDao.getByEmail('test@user.com');

    const cart = {
      timestamp: new Date(),
      products: [],
      userId: user._id
    };

    const newCart = await cartsDao.addCart(cart);
    const cartToGet = await cartsDao.getById(newCart._id);
    expect(cartToGet).to.have.property('_id');
    expect(cartToGet.products).to.be.an('array');
    expect(cartToGet.userId).to.be.eql(cart.userId);
  });

  it('debe obtener un carrito por el id de su usuario', async () => {
    const user = await usersDao.getByEmail('test@user.com');

    const cart = {
      timestamp: new Date(),
      products: [],
      userId: user._id
    };

    const newCart = await cartsDao.addCart(cart);
    const cartToGet = await cartsDao.getByUserId(newCart.userId);
    expect(cartToGet).to.have.property('_id');
    expect(cartToGet.products).to.be.an('array');
    expect(cartToGet.userId).to.be.eql(cart.userId);
  });

  it('debe agregar un producto a un carrito', async () => {
    const user = await usersDao.getByEmail('test@user.com');

    const cart = {
      timestamp: new Date(),
      products: [],
      userId: user._id
    };

    const newCart = await cartsDao.addCart(cart);
    const product = await productsDao.getAll();

    await cartsDao.addProduct(newCart._id, product[0]._id);

    const updatedCart = await cartsDao.getById(newCart._id);

    expect(updatedCart).to.have.property('_id');
    expect(updatedCart.products).to.be.an('array');
    expect(updatedCart.products.length).to.be.equal(1);

  });
});