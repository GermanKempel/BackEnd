import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';


const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing de productos', async () => {

  await mongoose.connect('mongodb+srv://GermanKempel:GcsLTjZBjYXUT5Ht@cluster0.tnbfe67.mongodb.net/testing?retryWrites=true&w=majority');

  let token;

  before(async () => {

    const credentialsMock = {
      email: 'gk@mail.com',
      password: '1234'
    }

    const { header } = await requester.post('/api/sessions/login').send(credentialsMock);
    token = header.authorization.split(' ')[1];
  });


  it('GET de /products debe devolver todos los productos', async () => {
    const { statusCode, _body } = await requester.get('/api/products');

    expect(statusCode).to.be.equal(200);
    expect(_body).to.have.property('products');
  });

  it('POST de /products debe crear un producto correctamente', async () => {

    const productMock = {
      title: 'Producto de prueba',
      description: 'Producto de prueba',
      code: '1234',
      price: 100,
      stock: 10,
      category: 'Producto de prueba',
      thumbnail: 'img.png'
    };

    const { _body } = await requester
      .post('/api/products')
      .send(productMock)
      .set('Authorization', `Bearer ${token}`);


    expect(_body).to.have.property('product');
  });
});