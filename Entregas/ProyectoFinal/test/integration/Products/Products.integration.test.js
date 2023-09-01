import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import UsersDao from '../../../src/dao/dbManagers/users.dao.js';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing de productos', () => {

  let usersDao;

  before(async () => {

    await mongoose.connect('mongodb+srv://GermanKempel:GcsLTjZBjYXUT5Ht@cluster0.tnbfe67.mongodb.net/testing?retryWrites=true&w=majority');

    usersDao = new UsersDao();

    await usersDao.deleteAll();

    const newUser = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@user.com',
      age: '25',
      password: '1234',
      role: 'admin'
    }

    await usersDao.save(newUser);

  });


  it('GET de /products debe devolver todos los productos', async () => {

    const response = await requester.get('/products');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('products');
    expect(response.body.products).to.be.an('array');
  }

  );

  it('POST /products debe crear un producto', async () => {

    const product = {
      title: 'Test',
      description: 'Test',
      price: 100,
      thumbnail: 'Test',
      code: 'Test'
    };

    const response = await requester.post('/products')
      .send(product);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.have.property('product');
    expect(response.body.product).to.be.an('object');
  }
  );

  it('PUT /products/:pid debe actualizar un producto', async () => {

    const product = {
      title: 'Test',
      description: 'Test',
      price: 100,
      thumbnail: 'Test',
      code: 'Test'
    };

    const newProduct = await usersDao.addProduct(product);

    const response = await requester.put(`/products/${newProduct._id}`)
      .send(product);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('product');
    expect(response.body.product).to.be.an('object');
  }
  );
})